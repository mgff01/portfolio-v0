import Image from "next/image";
import type { Experience } from "@/types/portfolio";

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <article className="group grid gap-4 rounded-2xl border border-border/75 bg-card/75 p-5 transition-all hover:border-primary/35 hover:bg-card sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6">
      <div className="grid size-14 place-items-center overflow-hidden rounded-2xl border border-border bg-background/50 p-0">
        <Image
          src={experience.icon || "/images/Ibmec Logo.svg"}
          alt=""
          width={56}
          height={56}
          className="size-full rounded-[0.95rem] object-cover"
        />
      </div>

      <div className="min-w-0">
        <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary">
            {experience.title}
          </h3>
          {experience.company && (
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {experience.company}
            </span>
          )}
        </div>
        <p className="text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
          {experience.description}
        </p>
      </div>

      {experience.period && (
        <span className="whitespace-nowrap rounded-full border border-border px-3 py-1.5 font-mono text-[10px] text-muted-foreground">
          {experience.period}
        </span>
      )}
    </article>
  );
}
