"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ExternalLink, Github, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "./i18n-provider";
import type { Project } from "@/types/portfolio";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const {
    data: { ui },
  } = useI18n();

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        {project && (
          <Dialog.Content className="fixed left-1/2 top-1/2 z-[101] max-h-[92vh] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl shadow-black/60 focus:outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
            <Dialog.Close asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute right-4 top-4 z-10 rounded-full border-white/15 bg-black/50 text-white backdrop-blur-md hover:border-primary/60 hover:bg-primary hover:text-primary-foreground"
                aria-label={ui.close}
              >
                <X />
              </Button>
            </Dialog.Close>

            <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl bg-muted">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={`Screenshot of ${project.title}`}
                fill
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-card to-transparent" />
            </div>

            <div className="relative -mt-7 p-6 pt-0 sm:p-8 sm:pt-0">
              <div className="mb-4 flex items-start justify-between gap-4 pr-14">
                <Dialog.Title className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {project.title}
                </Dialog.Title>
                {project.date && (
                  <span className="mt-1 shrink-0 rounded-full border border-border bg-background/80 px-3 py-1 font-mono text-[10px] text-muted-foreground">
                    {project.date}
                  </span>
                )}
              </div>

              <p className="mb-3 text-base font-medium leading-7 text-primary">
                {project.description}
              </p>
              <Dialog.Description className="mb-6 text-sm leading-6 text-muted-foreground">
                {project.fullDescription || project.description}
              </Dialog.Description>

              {project.tags && project.tags.length > 0 && (
                <div className="mb-8 flex flex-wrap gap-2" aria-label="Technologies">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-primary/20 bg-primary/10 px-2.5 py-1.5 font-mono text-[10px] text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                {project.repoUrl && (
                  <Button asChild variant="outline" size="lg" className="flex-1 rounded-xl bg-transparent">
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github />
                      {ui.sourceCode}
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button asChild size="lg" className="flex-1 rounded-xl">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink />
                      {ui.viewLive}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </Dialog.Content>
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
