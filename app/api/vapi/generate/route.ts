import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  const requestData = await request.json();
  console.log("Received data from VAPI workflow:", requestData);

  // Extract all possible fields where projectTopic might be stored
  const {
    type,
    projectTopic: explicitProjectTopic,
    topic,
    project,
    project_topic,
    degreeLevel,
    techstack,
    amount,
    userid,
    messages, // Sometimes the topic might be in the conversation
  } = requestData;

  // Determine the actual project topic to use, with fallbacks
  let projectTopic = explicitProjectTopic;

  // Try other possible field names if not found
  if (!projectTopic) {
    projectTopic = topic || project || project_topic;
  }

  // If still not found, try to extract from messages as last resort
  if (!projectTopic && Array.isArray(messages)) {
    // Look for patterns in messages that might contain the project topic
    for (const message of messages) {
      if (message.role === "user") {
        const content = message.content;
        const topicMatches =
          content.match(/project topic.*?is\s+(.*?)(?:\.|\?|$)/i) ||
          content.match(/my project is about\s+(.*?)(?:\.|\?|$)/i) ||
          content.match(/working on\s+(.*?)(?:\.|\?|$)/i);

        if (topicMatches && topicMatches[1]) {
          projectTopic = topicMatches[1].trim();
          break;
        }
      }
    }
  }

  // Use a default value if we still don't have a topic
  projectTopic = projectTopic || "Project Defense";

  console.log("Final projectTopic to be used:", projectTopic);

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a project defense examination.
        The project topic is ${projectTopic}.
        The degree level is ${degreeLevel}.
        The tech stack used in the project is: ${techstack}.
        The focus between Theoretical/Behavioral and Technical/Practical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    const interview = {
      projectTopic: projectTopic,
      type: type,
      degreeLevel: degreeLevel,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    console.log("Saving to Firebase:", interview);

    const docRef = await db.collection("interviews").add(interview);
    console.log("Document saved with ID:", docRef.id);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
