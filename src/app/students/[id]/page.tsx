import { getTeacherBySlug, getReviewsForTeacher } from "@/lib/firestore";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function StudentReviewDetailPage({ params }: Props) {
  const { id } = await params;
  
  // Fetch teacher data from Firestore
  const teacher = await getTeacherBySlug(id);
  if (!teacher) {
    notFound();
  }

  // Fetch reviews for this teacher
  const reviews = await getReviewsForTeacher(teacher.id);

  // Calculate average rating and total reviews
  const averageRating = teacher.averageRating || 0;
  const totalReviews = teacher.totalReviews || 0;

  // Get top tags from reviews
  const allTags = reviews.flatMap(review => review.tags);
  const tagCounts = allTags.reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topTags = Object.entries(tagCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 4)
    .map(([tag]) => tag);

  return (
    <section className="px-4 bg-white min-h-[calc(100vh-56px)]">
      <div className="max-w-6xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
        {/* Left: Main content to mirror TeacherRating.jpeg */}
        <div>
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="text-[56px] leading-none font-semibold text-foreground">{averageRating}</span>
                <span className="text-2xl text-foreground/80">/5</span>
              </div>
              <p className="text-sm text-foreground/70 mt-1">Based on {totalReviews} ratings</p>

              <h1 className="mt-6 text-5xl font-semibold tracking-tight">{teacher.name}</h1>
              <a href={`mailto:${teacher.email}`} className="inline-block mt-3 text-[15px] text-blue-700 underline decoration-1 underline-offset-2">
                {teacher.email}
              </a>

              <div className="mt-6 flex items-center gap-4">
                <a href={`/students/${id}/rate`} className="inline-flex items-center gap-3 rounded-full bg-[color:var(--brand-green)] text-white px-6 py-3 text-lg font-medium shadow-sm hover:opacity-90">
                  Rate
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold">{teacher.name.split(" ")[0]}&apos;s Top Tags</h2>
            <div className="mt-6 flex flex-wrap gap-4">
              {topTags.length > 0 ? topTags.map((tag) => (
                <button key={tag} className="rounded-full border-2 border-[color:var(--brand-green)] text-[color:var(--brand-green)] px-4 py-1.5 text-sm bg-white dark:bg-transparent hover:bg-[color:var(--brand-green)] hover:text-white transition-colors" type="button">
                  {tag}
                </button>
              )) : (
                <p className="text-gray-500">No tags yet</p>
              )}
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-black/10 dark:border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">{totalReviews} Student Ratings</h3>
              <span className="rounded-full bg-[color:var(--brand-green)] text-white px-5 py-1.5 text-sm font-medium">Most Recent</span>
            </div>

            <div className="mt-6 space-y-6">
              {reviews.length > 0 ? reviews.map((review, idx) => (
                <div key={idx} className="rounded-xl border border-black/10 dark:border-white/10 overflow-hidden">
                  <div className="grid grid-cols-[112px_1fr]">
                    {/* Left score panel */}
                    <div className="bg-[color:var(--brand-green)] text-white flex flex-col items-center justify-center">
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl leading-none font-semibold">{review.rating}</span>
                        <span className="text-lg">/5</span>
                      </div>
                    </div>

                    {/* Right content */}
                    <div className="bg-black/5 dark:bg-white/5 p-5">
                      <div className="flex items-start justify-between">
                        <h4 className="text-lg font-medium">{review.course}</h4>
                        <span className="text-sm text-foreground/80 whitespace-nowrap">
                          {new Date(review.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>

                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div>
                          <span className="font-medium">Grade Level:</span> {review.gradeLevel}
                        </div>
                        <div>
                          <span className="font-medium">Period:</span> {review.period}
                        </div>
                        <div>
                          <span className="font-medium">Grade:</span> {review.grade}
                        </div>
                      </div>

                      <p className="mt-4 text-[15px] leading-7 text-foreground/90">{review.body}</p>

                      <div className="mt-5 flex flex-wrap gap-4">
                        {review.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-block rounded-full bg-[color:var(--brand-green)] text-white px-5 py-2 text-sm shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex justify-end">
                        <a href="#" className="text-sm text-foreground/80 hover:underline">
                          Show More →
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No reviews yet. Be the first to rate this teacher!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/30 p-6">
            <h3 className="text-xl font-semibold text-[color:var(--brand-green)]">Rating Distribution</h3>
            <div className="mt-6 h-64 bg-black/5 dark:bg-white/5 rounded-md p-5 flex items-end justify-between">
              {[{label:'2',value:40},{label:'1',value:22},{label:'1',value:22},{label:'5',value:100},{label:'3',value:68}].map((b, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-16 bg-[color:var(--brand-green)] rounded" style={{ height: `${Math.max(8,b.value)}%` }} aria-hidden />
                  <span className="text-sm text-foreground/80">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/30 p-6">
            <h3 className="text-xl font-semibold">Similar Teachers</h3>
            <div className="mt-4 space-y-3">
              {['Rayvan Watson','William Veenstra'].map((t) => (
                <a key={t} href="#" className="block text-center rounded-full bg-[color:var(--brand-green)] text-white px-4 py-2 text-sm font-medium hover:opacity-90">
                  {t}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}




