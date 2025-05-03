"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const ScoringCriteria = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mb-6">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="flex items-center gap-2 text-primary-200 hover:text-primary-200/80"
      >
        <Info size={18} />
        <span>
          {isOpen ? "Hide Scoring Criteria" : "View Scoring Criteria"}
        </span>
      </Button>

      {isOpen && (
        <div className="mt-4 p-6 border border-primary-200/30 rounded-lg animate-fadeIn dark-gradient">
          <h3 className="text-xl font-semibold mb-4">
            Defense Evaluation Criteria
          </h3>

          <div className="space-y-6">
            <div>
              <h4 className="font-bold mb-2">Presentation Skills (0-100)</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">90-100:</span> Exceptional
                  clarity, perfect articulation, highly structured responses,
                  outstanding confidence
                </li>
                <li>
                  <span className="font-medium">70-89:</span> Good clarity,
                  well-articulated, structured responses, confident presentation
                </li>
                <li>
                  <span className="font-medium">50-69:</span> Adequate clarity,
                  somewhat articulated, partially structured, moderate
                  confidence
                </li>
                <li>
                  <span className="font-medium">30-49:</span> Poor clarity,
                  poorly articulated, unstructured responses, low confidence
                </li>
                <li>
                  <span className="font-medium">0-29:</span> Extremely unclear,
                  inarticulate, chaotic responses, no confidence
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">Project Understanding (0-100)</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">90-100:</span> Expert knowledge
                  of project topic, technologies, and implementation details
                </li>
                <li>
                  <span className="font-medium">70-89:</span> Strong knowledge
                  of project topic, technologies, and implementation details
                </li>
                <li>
                  <span className="font-medium">50-69:</span> Basic knowledge of
                  project topic, technologies, and implementation details
                </li>
                <li>
                  <span className="font-medium">30-49:</span> Limited knowledge
                  of project topic, technologies, and implementation details
                </li>
                <li>
                  <span className="font-medium">0-29:</span> Minimal knowledge
                  of project topic, technologies, and implementation details
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">
                Problem-Solving Approach (0-100)
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">90-100:</span> Exceptional
                  ability to analyze problems and explain solutions
                </li>
                <li>
                  <span className="font-medium">70-89:</span> Strong ability to
                  analyze problems and explain solutions
                </li>
                <li>
                  <span className="font-medium">50-69:</span> Adequate ability
                  to analyze problems and explain solutions
                </li>
                <li>
                  <span className="font-medium">30-49:</span> Limited ability to
                  analyze problems and explain solutions
                </li>
                <li>
                  <span className="font-medium">0-29:</span> Poor ability to
                  analyze problems and explain solutions
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">Research Methodology (0-100)</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">90-100:</span> Exceptional
                  research quality, diverse sources, research clearly informed
                  decisions
                </li>
                <li>
                  <span className="font-medium">70-89:</span> Strong research
                  quality, good sources, research informed decisions
                </li>
                <li>
                  <span className="font-medium">50-69:</span> Adequate research
                  quality, some sources, research somewhat informed decisions
                </li>
                <li>
                  <span className="font-medium">30-49:</span> Limited research
                  quality, few sources, research minimally informed decisions
                </li>
                <li>
                  <span className="font-medium">0-29:</span> Poor research
                  quality, minimal sources, research did not inform decisions
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">Confidence & Clarity (0-100)</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">90-100:</span> Exceptional
                  confidence, perfect clarity, outstanding defense of decisions
                </li>
                <li>
                  <span className="font-medium">70-89:</span> Strong confidence,
                  good clarity, solid defense of decisions
                </li>
                <li>
                  <span className="font-medium">50-69:</span> Moderate
                  confidence, adequate clarity, basic defense of decisions
                </li>
                <li>
                  <span className="font-medium">30-49:</span> Low confidence,
                  limited clarity, weak defense of decisions
                </li>
                <li>
                  <span className="font-medium">0-29:</span> No confidence,
                  unclear communication, unable to defend decisions
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">
                Common Defense Mistakes to Avoid
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Vague responses lacking specific technical details</li>
                <li>
                  Inability to explain design decisions or technology choices
                </li>
                <li>
                  Overreliance on team contributions without personal
                  understanding
                </li>
                <li>Lack of critical evaluation of project limitations</li>
                <li>Poor time management in responses</li>
                <li>Defensive reactions to challenging questions</li>
                <li>Inconsistencies in technical explanations</li>
                <li>
                  Failure to connect project to broader academic/industry
                  context
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2">Academic Level Expectations</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium">Undergraduate:</span> Focus on
                  fundamentals, basic implementation, and clear communication
                </li>
                <li>
                  <span className="font-medium">Junior:</span> Solid technical
                  knowledge, good problem-solving, and ability to explain design
                  choices
                </li>
                <li>
                  <span className="font-medium">Senior:</span> Deeper technical
                  expertise, sophisticated problem-solving, research rigor, and
                  professional presentation
                </li>
                <li>
                  <span className="font-medium">Graduate:</span> Advanced
                  theoretical knowledge, innovative approaches, research
                  excellence, and expert-level articulation
                </li>
                <li>
                  <span className="font-medium">PhD:</span> Exceptional mastery,
                  original contributions, rigorous methodology, and
                  publication-quality presentation
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoringCriteria;
