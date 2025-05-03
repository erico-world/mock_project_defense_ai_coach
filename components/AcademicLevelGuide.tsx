"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AcademicLevelGuideProps {
  currentLevel?: string;
}

const AcademicLevelGuide = ({ currentLevel }: AcademicLevelGuideProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mb-6">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="flex items-center gap-2 text-primary-200 hover:text-primary-200/80"
      >
        <GraduationCap size={18} />
        <span>
          {isOpen ? "Hide Academic Level Guide" : "View Academic Level Guide"}
        </span>
      </Button>

      {isOpen && (
        <div className="mt-4 p-6 border border-primary-200/30 rounded-lg animate-fadeIn dark-gradient">
          <h3 className="text-xl font-semibold mb-4">
            Academic Level Expectations
          </h3>

          <div className="space-y-6">
            <div
              className={
                currentLevel === "Undergraduate"
                  ? "p-3 border border-primary-200 rounded-lg"
                  : ""
              }
            >
              <h4 className="font-bold mb-2">Undergraduate Level</h4>
              <p className="mb-2">At this level, evaluators focus on:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Basic understanding of fundamental concepts</li>
                <li>Clear explanation of project implementation</li>
                <li>Ability to communicate ideas effectively</li>
                <li>Understanding of core technologies used</li>
                <li>Basic problem-solving approaches</li>
              </ul>
            </div>

            <div
              className={
                currentLevel === "Junior"
                  ? "p-3 border border-primary-200 rounded-lg"
                  : ""
              }
            >
              <h4 className="font-bold mb-2">Junior Level</h4>
              <p className="mb-2">At this level, evaluators expect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Solid technical knowledge of project components</li>
                <li>Good problem-solving skills with clear reasoning</li>
                <li>
                  Ability to explain design choices and alternatives considered
                </li>
                <li>Structured presentation with logical flow</li>
                <li>Understanding of project limitations</li>
              </ul>
            </div>

            <div
              className={
                currentLevel === "Senior"
                  ? "p-3 border border-primary-200 rounded-lg"
                  : ""
              }
            >
              <h4 className="font-bold mb-2">Senior Level</h4>
              <p className="mb-2">At this level, evaluators demand:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Deep technical expertise in project domain</li>
                <li>Sophisticated problem-solving approaches</li>
                <li>Research rigor and methodology</li>
                <li>Professional presentation skills</li>
                <li>Ability to handle challenging questions</li>
                <li>Critical evaluation of own work</li>
              </ul>
            </div>

            <div
              className={
                currentLevel === "Graduate"
                  ? "p-3 border border-primary-200 rounded-lg"
                  : ""
              }
            >
              <h4 className="font-bold mb-2">Graduate Level</h4>
              <p className="mb-2">At this level, evaluators require:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Advanced theoretical knowledge</li>
                <li>Innovative approaches to problem-solving</li>
                <li>Research excellence with proper methodology</li>
                <li>Expert-level articulation of complex concepts</li>
                <li>Ability to connect project to broader field</li>
                <li>Thorough understanding of alternatives and tradeoffs</li>
              </ul>
            </div>

            <div
              className={
                currentLevel === "PhD"
                  ? "p-3 border border-primary-200 rounded-lg"
                  : ""
              }
            >
              <h4 className="font-bold mb-2">PhD Level</h4>
              <p className="mb-2">At this level, evaluators expect:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Exceptional mastery of subject matter</li>
                <li>Original contributions to the field</li>
                <li>Rigorous research methodology</li>
                <li>Publication-quality presentation</li>
                <li>Ability to defend against expert criticism</li>
                <li>Deep understanding of theoretical foundations</li>
                <li>Clear articulation of research significance</li>
              </ul>
            </div>
          </div>

          {currentLevel && (
            <div className="mt-6 p-4 bg-dark-300 rounded-lg">
              <h4 className="font-bold mb-2">
                Your Current Level:{" "}
                <span className="text-primary-200">{currentLevel}</span>
              </h4>
              <p>
                Your defense will be evaluated according to the standards
                appropriate for this academic level.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AcademicLevelGuide;
