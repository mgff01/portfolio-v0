import Image from "next/image";
import { Award } from "lucide-react";
import type { Certification } from "@/types/portfolio";

export default function CertificationCard({ certification }: { certification: Certification }) {
  return (
    <article className="group flex h-full gap-4 rounded-2xl border border-border/75 bg-card/75 p-5 transition-all hover:border-primary/35 hover:bg-card">
      <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-2xl border border-border bg-background/50 p-0">
        {certification.icon ? (
          <Image
            src={certification.icon}
            alt=""
            width={56}
            height={56}
            className="size-full rounded-[0.95rem] object-cover"
          />
        ) : (
          <Award className="size-6 text-primary" aria-hidden="true" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary">
            {certification.title}
          </h3>
          {certification.date && (
            <span className="font-mono text-[10px] text-muted-foreground">{certification.date}</span>
          )}
        </div>
        {certification.issuer && (
          <p className="line-clamp-3 text-xs leading-5 text-muted-foreground">
            {certification.issuer}
          </p>
        )}
      </div>
    </article>
  );
}
