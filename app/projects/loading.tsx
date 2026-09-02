export default function Loading() {
  return (
    <div className="mx-auto min-h-screen max-w-7xl px-5 py-24 sm:px-8">
      <div className="mb-10 h-12 animate-pulse rounded-xl bg-card" />
      <div className="grid gap-5 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="aspect-[16/10] animate-pulse bg-muted" />
            <div className="space-y-3 p-6">
              <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
