export default function StudentsReviewsPage() {
  const items = Array.from({ length: 10 }).map((_, i) => ({ id: i + 1, name: `Student ${i + 1}` }));
  return (
    <section className="px-4">
      <div className="max-w-6xl mx-auto py-10">
        <h1 className="text-2xl font-semibold">Student Reviews</h1>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((s) => (
            <a key={s.id} href={`/students/${s.id}`} className="rounded-xl border border-black/10 dark:border:white/10 p-5 bg-white dark:bg:black/30 block hover:shadow-sm">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-black/5 dark:bg:white/10" />
                <div>
                  <h3 className="font-medium">{s.name}</h3>
                  <p className="text-xs text-black/60 dark:text:white/60">2 reviews</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-black/70 dark:text:white/70 line-clamp-2">Short placeholder text for a student card.</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}




