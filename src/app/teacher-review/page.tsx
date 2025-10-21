export default function TeacherReviewPage() {
  return (
    <section className="px-4 bg-white min-h-[calc(100vh-56px)]">
      <div className="max-w-6xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
        {/* Left: Main content */}
        <div>
          {/* Rating + name header */}
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[56px] leading-none font-semibold text-foreground">4</span>
                <span className="text-2xl text-foreground/80">/5</span>
              </div>
              <p className="text-sm text-foreground/70 mt-1">Based on 9 ratings</p>

              <h1 className="mt-6 text-5xl font-semibold tracking-tight">Alejandro Garcia</h1>
              <a href="mailto:alejandro.garcia@cfisd.net" className="inline-block mt-3 text-[15px] text-blue-700 underline decoration-1 underline-offset-2">
                alejandro.garcia@cfisd.net
              </a>

              <div className="mt-6 flex items-center gap-4">
                <a href="#rate" className="inline-flex items-center gap-3 rounded-full bg-[color:var(--brand-green)] text-white px-6 py-3 text-lg font-medium shadow-sm hover:opacity-90">
                  Rate
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Top Tags */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold">Garcia’s Top Tags</h2>
            <div className="mt-6 flex flex-wrap gap-4">
              {[
                'Lectures',
                'Good Teaching Ability',
                'No Homework',
                'Eager to help',
              ].map((tag) => (
                <button
                  key={tag}
                  className="rounded-full border-2 border-[color:var(--brand-green)] text-[color:var(--brand-green)] px-4 py-1.5 text-sm bg-white dark:bg-transparent hover:bg-[color:var(--brand-green)] hover:text-white transition-colors"
                  type="button"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Ratings list header */}
          <div className="mt-12 pt-6 border-t border-black/10 dark:border-white/10">
            <h3 className="text-xl font-semibold">17 Student Ratings</h3>
          </div>
        </div>

        {/* Right: Sidebar */}
        <aside className="space-y-6">
          {/* Rating Distribution */}
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/30 p-6">
            <h3 className="text-xl font-semibold text-[color:var(--brand-green)]">Rating Distribution</h3>
            <div className="mt-6 h-64 bg-black/5 dark:bg-white/5 rounded-md p-5 flex items-end justify-between">
              {[
                { label: '2', value: 40 },
                { label: '1', value: 22 },
                { label: '1', value: 22 },
                { label: '5', value: 100 },
                { label: '3', value: 68 },
              ].map((b, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div
                    className="w-16 bg-[color:var(--brand-green)] rounded"
                    style={{ height: `${Math.max(8, b.value)}%` }}
                    aria-hidden
                  />
                  <span className="text-sm text-foreground/80">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Teachers */}
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/30 p-6">
            <h3 className="text-xl font-semibold">Similar Teachers</h3>
            <div className="mt-4 space-y-3">
              {['Rayvan Watson', 'William Veenstra'].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="block text-center rounded-full bg-[color:var(--brand-green)] text-white px-4 py-2 text-sm font-medium hover:opacity-90"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}




