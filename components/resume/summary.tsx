import type { RESUME_DATA } from "@/data/resume-data";

import { Section } from "../../components/resume/ui/section";

interface AboutProps {
  summary: typeof RESUME_DATA.summary;
  className?: string;
}

/**
 * Summary section component
 * Displays a summary of professional experience and goals
 */
export function Summary({ summary, className }: AboutProps) {
  return (
    <Section className={className}>
      <h2 className="font-bold text-xl" id="about-section">
        About
      </h2>
      <div className="text-pretty font-mono text-foreground/80 text-sm print:text-[12px]">{summary}</div>
    </Section>
  );
}
