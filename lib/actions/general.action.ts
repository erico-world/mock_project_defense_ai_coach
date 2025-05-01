"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { revalidatePath } from "next/cache";

import { db } from "@/firebase/admin";
import { feedbackSchema } from "@/constants";

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript, feedbackId } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `- ${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI examiner analyzing a project defense presentation. Your task is to evaluate the student based on structured categories. Be thorough and detailed in your analysis. Provide constructive feedback that will help the student improve for their actual defense.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Presentation Skills**: Clarity, articulation, structured responses and confidence in presentation.
        - **Project Understanding**: Depth of knowledge about the project topic, technologies used, and implementation details.
        - **Problem-Solving Approach**: Ability to analyze problems encountered during development and explain solutions implemented.
        - **Research Methodology**: Quality of research conducted, sources consulted, and how research informed project decisions.
        - **Confidence & Clarity**: Overall confidence, clear communication, and ability to defend project decisions.
        `,
      system:
        "You are an academic evaluator analyzing a project defense practice session. Your task is to provide helpful feedback to prepare the student for their actual defense",
    });

    const feedback = {
      interviewId: interviewId,
      userId: userId,
      totalScore: object.totalScore,
      categoryScores: object.categoryScores,
      strengths: object.strengths,
      areasForImprovement: object.areasForImprovement,
      finalAssessment: object.finalAssessment,
      createdAt: new Date().toISOString(),
    };

    let feedbackRef;

    if (feedbackId) {
      feedbackRef = db.collection("feedback").doc(feedbackId);
    } else {
      feedbackRef = db.collection("feedback").doc();
    }

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.error("Error saving feedback:", error);
    return { success: false };
  }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  const querySnapshot = await db
    .collection("feedback")
    .where("interviewId", "==", interviewId)
    .where("userId", "==", userId)
    .limit(1)
    .get();

  if (querySnapshot.empty) return null;

  const feedbackDoc = querySnapshot.docs[0];
  return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  const interviews = await db
    .collection("interviews")
    .orderBy("createdAt", "desc")
    .where("finalized", "==", true)
    .where("userId", "!=", userId)
    .limit(limit)
    .get();

  const interviewsData = interviews.docs.map((doc) => {
    const data = doc.data();
    console.log("Latest interview data:", { id: doc.id, ...data });
    return {
      id: doc.id,
      ...data,
    };
  }) as Interview[];

  return interviewsData;
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  const interviewsData = interviews.docs.map((doc) => {
    const data = doc.data();
    console.log("Interview data:", { id: doc.id, ...data });
    return {
      id: doc.id,
      ...data,
    };
  }) as Interview[];

  return interviewsData;
}

export async function deleteInterview(formData: FormData) {
  try {
    const interviewId = formData.get("interviewId") as string;
    const userId = formData.get("userId") as string;

    if (!interviewId) {
      console.error("Interview ID is required");
      return;
    }

    // Delete the interview document
    await db.collection("interviews").doc(interviewId).delete();

    // Also delete any associated feedback
    const feedbackSnapshot = await db
      .collection("feedback")
      .where("interviewId", "==", interviewId)
      .where("userId", "==", userId)
      .get();

    // Delete all found feedback documents
    const deleteFeedbackPromises = feedbackSnapshot.docs.map((doc) =>
      doc.ref.delete()
    );
    await Promise.all(deleteFeedbackPromises);

    // Revalidate the homepage to refresh the interview list
    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting interview:", error);
  }
}
