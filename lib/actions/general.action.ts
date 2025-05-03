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

    // Get the interview details to determine academic level for calibration
    const interview = await getInterviewById(interviewId);
    const academicLevel = interview?.degreeLevel || "Undergraduate";

    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI examiner analyzing a project defense presentation. Your task is to evaluate the student based on structured categories. Be thorough and detailed in your analysis. Provide constructive feedback that will help the student improve for their actual defense.
        
        Transcript:
        ${formattedTranscript}

        Academic Level: ${academicLevel}
        
        SCORING CALIBRATION GUIDELINES BY ACADEMIC LEVEL:
        - Undergraduate: Focus on fundamentals, basic implementation, and clear communication. Expect basic understanding of technologies used.
        - Junior: Expect solid technical knowledge, good problem-solving, and ability to explain design choices clearly.
        - Senior: Demand deeper technical expertise, sophisticated problem-solving, research rigor, and professional presentation skills.
        - Graduate: Require advanced theoretical knowledge, innovative approaches, research excellence, and expert-level articulation of complex concepts.
        - PhD: Expect exceptional mastery, original contributions to the field, rigorous methodology, and publication-quality presentation.
        
        COMMON DEFENSE ANTI-PATTERNS TO IDENTIFY AND PENALIZE:
        - Vague responses lacking specific technical details
        - Inability to explain design decisions or technology choices
        - Overreliance on team contributions without personal understanding
        - Lack of critical evaluation of project limitations
        - Poor time management in responses
        - Defensive reactions to challenging questions
        - Inconsistencies in technical explanations
        - Failure to connect project to broader academic/industry context
        
        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided. Be strict and honest in your assessment, avoiding grade inflation:
        
        DETAILED SCORING CRITERIA:
        - **Presentation Skills** (0-100): 
          * 90-100: Exceptional clarity, perfect articulation, highly structured responses, outstanding confidence
          * 70-89: Good clarity, well-articulated, structured responses, confident presentation
          * 50-69: Adequate clarity, somewhat articulated, partially structured, moderate confidence
          * 30-49: Poor clarity, poorly articulated, unstructured responses, low confidence
          * 0-29: Extremely unclear, inarticulate, chaotic responses, no confidence
        
        - **Project Understanding** (0-100): 
          * 90-100: Expert knowledge of project topic, technologies, and implementation details
          * 70-89: Strong knowledge of project topic, technologies, and implementation details
          * 50-69: Basic knowledge of project topic, technologies, and implementation details
          * 30-49: Limited knowledge of project topic, technologies, and implementation details
          * 0-29: Minimal knowledge of project topic, technologies, and implementation details
        
        - **Problem-Solving Approach** (0-100): 
          * 90-100: Exceptional ability to analyze problems and explain solutions
          * 70-89: Strong ability to analyze problems and explain solutions
          * 50-69: Adequate ability to analyze problems and explain solutions
          * 30-49: Limited ability to analyze problems and explain solutions
          * 0-29: Poor ability to analyze problems and explain solutions
        
        - **Research Methodology** (0-100): 
          * 90-100: Exceptional research quality, diverse sources, research clearly informed decisions
          * 70-89: Strong research quality, good sources, research informed decisions
          * 50-69: Adequate research quality, some sources, research somewhat informed decisions
          * 30-49: Limited research quality, few sources, research minimally informed decisions
          * 0-29: Poor research quality, minimal sources, research did not inform decisions
        
        - **Confidence & Clarity** (0-100): 
          * 90-100: Exceptional confidence, perfect clarity, outstanding defense of decisions
          * 70-89: Strong confidence, good clarity, solid defense of decisions
          * 50-69: Moderate confidence, adequate clarity, basic defense of decisions
          * 30-49: Low confidence, limited clarity, weak defense of decisions
          * 0-29: No confidence, unclear communication, unable to defend decisions
        `,
      system:
        "You are a strict academic evaluator analyzing a project defense practice session. Your task is to provide honest, unbiased feedback to prepare the student for their actual defense. Do not show favoritism or pity - evaluate based solely on performance against objective standards for their academic level.",
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

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
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
