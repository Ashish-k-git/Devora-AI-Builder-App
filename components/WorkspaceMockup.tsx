import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function WorkspaceMockup() {
  return (
    <div className="relative z-10 mt-20 w-full max-w-6xl text-left">
      <div className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-blue-500/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#08090b] shadow-[0_30px_100px_rgba(0,0,0,0.6)] sm:rounded-3xl">
        <div className="flex h-12 items-center gap-3 border-b border-white/8 bg-[#101114] px-4 sm:h-14 sm:px-5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] sm:h-3 sm:w-3" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] sm:h-3 sm:w-3" />
          </div>
          <div className="mx-auto flex h-7 w-full max-w-md items-center justify-center rounded-lg border border-white/6 bg-black/30 px-3 text-[10px] text-white/30 sm:h-8 sm:text-xs">
            app-builder.dev/workspace
          </div>
          <div className="w-10.5 sm:w-13.5" />
        </div>

        <div className="grid min-h-130 grid-cols-1 lg:grid-cols-2">
          <div className="flex min-h-125 flex-col border-b border-white/8 bg-[#0d0e11] p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <div className="mb-7 flex items-center justify-between">
              <span className="text-xs font-medium tracking-wide text-white/80">Chat</span>
              <span className="rounded-full border border-white/8 px-2 py-1 text-[9px] uppercase tracking-[0.16em] text-white/25">AI builder</span>
            </div>
            <div className="space-y-4 text-xs leading-relaxed sm:text-sm">
              <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-sm bg-blue-500 px-4 py-3 text-white shadow-[0_8px_25px_rgba(59,130,246,0.18)]">
                Build me a task manager app with Kanban board
              </div>
              <div className="max-w-[92%] rounded-2xl rounded-tl-sm border border-white/8 bg-[#17191d] px-4 py-3 text-white/60">
                I&apos;ll create a task manager with a Kanban board. Setting up the project...
              </div>
              <div className="max-w-[92%] rounded-2xl rounded-tl-sm border border-white/8 bg-[#17191d] px-4 py-3 text-white/60">
                Installing dependencies and generating components. This will be ready in a moment.
              </div>
              <div className="flex items-center gap-1 px-2 pt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400/80" />
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400/50" />
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400/25" />
              </div>
            </div>
            <div className="mt-auto flex items-center rounded-xl border border-white/8 bg-[#14161a] px-4 py-3 text-xs text-white/25">
              Type your message...
              <span className="ml-auto rounded-md border border-white/8 px-2 py-1 text-[9px] text-white/20">Enter</span>
            </div>
          </div>

          <div className="bg-[#101114] p-5 sm:p-7">
            <div className="mb-7 flex items-center gap-5 border-b border-white/8">
              <span className="relative pb-3 text-xs font-medium text-white/90 after:absolute after:-bottom-px after:left-0 after:h-px after:w-full after:bg-blue-400">Preview</span>
              <span className="pb-3 text-xs text-white/30">Code</span>
            </div>
            <div className="rounded-xl border border-white/8 bg-[#0b0c0e] p-3 sm:p-4">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white/85">My tasks</p>
                  <p className="mt-1 text-[10px] text-white/30">Keep your work moving forward</p>
                </div>
                <span className="rounded-lg bg-blue-500 px-2.5 py-1.5 text-[10px] font-medium text-white">+ Add task</span>
              </div>
              <div className="overflow-x-auto pb-1">
                <div className="grid min-w-97.5 grid-cols-3 gap-2 sm:min-w-0 sm:gap-3">
                  <KanbanColumn title="Todo" count="2">
                    <TaskCard title="Research competitors" label="Planning" />
                    <TaskCard title="Define project scope" label="Design" />
                  </KanbanColumn>
                  <KanbanColumn title="In Progress" count="1">
                    <TaskCard title="Build dashboard" label="Development" accent />
                  </KanbanColumn>
                  <KanbanColumn title="Done" count="0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ title, count, children }: { title: string; count: string; children?: ReactNode }) {
  return (
    <div className="min-h-57.5 rounded-lg border border-white/7 bg-[#14161a] p-2 sm:p-3">
      <div className="mb-3 flex items-center justify-between gap-1">
        <span className="truncate text-[9px] font-medium text-white/55 sm:text-[10px]">{title}</span>
        <span className="text-[9px] text-white/20">{count}</span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function TaskCard({ title, label, accent = false }: { title: string; label: string; accent?: boolean }) {
  return (
    <div className="rounded-md border border-white/7 bg-[#1c1f24] p-2.5">
      <p className="text-[9px] leading-snug text-white/65 sm:text-[10px]">{title}</p>
      <span className={cn("mt-3 inline-block rounded px-1.5 py-0.5 text-[8px]", accent ? "bg-blue-400/15 text-blue-300" : "bg-white/6 text-white/25")}>
        {label}
      </span>
    </div>
  );
}
