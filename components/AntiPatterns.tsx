"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const AntiPatterns = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mb-6">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        className="flex items-center gap-2 text-destructive-100 hover:text-destructive-100/80"
      >
        <AlertTriangle size={18} />
        <span>
          {isOpen
            ? "Hide Common Defense Mistakes"
            : "View Common Defense Mistakes"}
        </span>
      </Button>

      {isOpen && (
        <div className="mt-4 p-6 border border-destructive-100/30 rounded-lg animate-fadeIn dark-gradient">
          <h3 className="text-xl font-semibold mb-4">
            Common Defense Anti-Patterns to Avoid
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-2 text-destructive-100">
                Content Issues
              </h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Vague Responses</span>
                  <p className="text-sm">
                    Lacking specific technical details or concrete examples
                  </p>
                </li>
                <li>
                  <span className="font-medium">
                    Unexplained Design Decisions
                  </span>
                  <p className="text-sm">
                    Inability to justify technology choices or architectural
                    decisions
                  </p>
                </li>
                <li>
                  <span className="font-medium">Missing Technical Depth</span>
                  <p className="text-sm">
                    Surface-level explanations without demonstrating deeper
                    understanding
                  </p>
                </li>
                <li>
                  <span className="font-medium">
                    Lack of Critical Evaluation
                  </span>
                  <p className="text-sm">
                    Not acknowledging project limitations or potential
                    improvements
                  </p>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-2 text-destructive-100">
                Presentation Issues
              </h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Poor Time Management</span>
                  <p className="text-sm">
                    Spending too much time on minor details or rushing important
                    points
                  </p>
                </li>
                <li>
                  <span className="font-medium">Defensive Reactions</span>
                  <p className="text-sm">
                    Responding negatively to challenging questions instead of
                    engaging constructively
                  </p>
                </li>
                <li>
                  <span className="font-medium">Inconsistent Explanations</span>
                  <p className="text-sm">
                    Contradicting yourself or changing technical explanations
                    when pressed
                  </p>
                </li>
                <li>
                  <span className="font-medium">Lack of Context</span>
                  <p className="text-sm">
                    Failing to connect your project to broader academic or
                    industry relevance
                  </p>
                </li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold mb-2 text-destructive-100">
                Ownership Issues
              </h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-medium">Team Overreliance</span>
                  <p className="text-sm">
                    Attributing all work to team without demonstrating personal
                    contributions and understanding
                  </p>
                </li>
                <li>
                  <span className="font-medium">Code Unfamiliarity</span>
                  <p className="text-sm">
                    Inability to explain specific code sections that you claim
                    to have written
                  </p>
                </li>
                <li>
                  <span className="font-medium">Research Gaps</span>
                  <p className="text-sm">
                    Citing research or sources without being able to explain how
                    they influenced your work
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-dark-300 rounded-lg">
            <h4 className="font-bold mb-2">Pro Tip</h4>
            <p>
              Prepare for your defense by having someone ask you challenging
              questions about your project. Practice explaining your design
              decisions, technical implementations, and research methodology
              clearly and concisely.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AntiPatterns;
