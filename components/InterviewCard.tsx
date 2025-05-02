import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";

import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

import { cn, getRandomInterviewCover } from "@/lib/utils";
import {
  deleteInterview,
  getFeedbackByInterviewId,
} from "@/lib/actions/general.action";

const InterviewCard = async ({
  interviewId,
  userId,
  projectTopic,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && interviewId
      ? await getFeedbackByInterviewId({
          interviewId,
          userId,
        })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const badgeColor =
    {
      Behavioral: "bg-[#40E0D0]",
      Mixed: "bg-[#20B2AA]",
      Technical: "bg-[#008B8B]",
    }[normalizedType] || "bg-[#20B2AA]";

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D, YYYY");

  // Display the project topic if available, otherwise display a generic message
  // Using nullish coalescing to ensure empty strings don't use fallback
  const displayTitle =
    projectTopic && projectTopic.trim() !== ""
      ? projectTopic
      : "Project Defense";

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-96">
      <div className="card-interview">
        <div>
          {/* Type Badge */}
          <div
            className={cn(
              "absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg",
              badgeColor
            )}
          >
            <p className="badge-text ">{normalizedType}</p>
          </div>

          {/* Delete Button */}
          <form action={deleteInterview} className="absolute top-3 left-3">
            <input type="hidden" name="interviewId" value={interviewId} />
            <input type="hidden" name="userId" value={userId || ""} />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="rounded-full bg-dark-300 hover:bg-destructive-100/20 cursor-pointer"
              title="Delete Interview"
            >
              <Trash2 className="h-4 w-4 text-destructive-100" />
            </Button>
          </form>

          {/* Cover Image */}
          <Image
            src={getRandomInterviewCover()}
            alt="cover-image"
            width={90}
            height={90}
            className="rounded-full object-fit size-[90px]"
          />

          {/* Project Topic */}
          <h3 className="mt-5 capitalize">{displayTitle}</h3>

          {/* Date & Score */}
          <div className="flex flex-row gap-5 mt-3">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                width={22}
                height={22}
                alt="calendar"
              />
              <p>{formattedDate}</p>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <Image src="/star.svg" width={22} height={22} alt="star" />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>

          {/* Feedback or Placeholder Text */}
          <p className="line-clamp-2 mt-5">
            {feedback?.finalAssessment ||
              "You haven't taken this interview yet. Take it now to improve your skills."}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <DisplayTechIcons techStack={techstack} />

          <Button className="btn-primary">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
