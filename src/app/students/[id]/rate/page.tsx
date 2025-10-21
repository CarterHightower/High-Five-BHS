"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { getTeacherBySlug, submitReview } from "@/lib/firestore";

type Props = { params: Promise<{ id: string }> };

export default async function RateTeacherPage({ params }: Props) {
  const { id } = await params;
  
  // Fetch teacher data
  const teacher = await getTeacherBySlug(id);
  if (!teacher) {
    return <div>Teacher not found</div>;
  }

  return <RateTeacherForm teacher={teacher} />;
}

function RateTeacherForm({ teacher }: { teacher: { id: string; name: string; slug: string } }) {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [course, setCourse] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [period, setPeriod] = useState("");
  const [grade, setGrade] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { user } = useAuth();
  const router = useRouter();

  const availableTags = [
    'Good Teaching Ability',
    'Eager to help',
    'No Homework',
    'Never Absent',
    'Clear Grading',
    'Engaging',
    'Tough Grader',
    'Lots Of Reading',
    'Talkative',
    'Easy To Be Friends With',
    'Resonds To Messages Fast',
    'Open To Help At Any Time',
    'Chill',
    'Quiet',
    'Lectures',
    'No Lectures',
    'Teaches Bell-To-Bell',
    'Strict On IDs',
    'Strict On Rules',
    'Lots Of Homework',
    'Good Extra Credit Oppurtunities',
    'No Extra Credit',
    'Funny',
    'Energentic',
    'Respected',
    'Forgetable',
    'I Want To Hang Out With Them After School',
    'Invited To My Grad Party',
    'Monotone',
    'Gamer',
    'NFL Fan',
    'MLB Fan',
    'NBA Fan',
    'College Football Fan',
    'Someone I Trust Opening Up To About Problems Outside Of School',
    'No Opinion',
    'Biased Twords A Certain Gender',
    'Hated By Literally Everyone',
    'Worth It To Suck Up To',
    'NPC',
    'Very Good Speaker',
    'Loud',
    'Quiet',
    'Trash Fits',
    'Fire Fits',
    'Nothing Good, Nothing Bad',
    'Only Work On Their Class During The Period',
    'Doesnt Know What They Are Talking About',
    'Knows What They Are Talking About',
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError("You must be logged in to submit a review");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await submitReview({
        teacherId: teacher.id,
        userId: user.uid,
        userName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        rating,
        course,
        gradeLevel,
        period,
        grade,
        body,
        tags: selectedTags,
      });

      router.push(`/students/${teacher.slug}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 bg-white min-h-[calc(100vh-56px)]">
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Rate {teacher.name}</h1>
        <p className="text-sm text-foreground/70 mt-1">Share your experience. Be honest and constructive.</p>

        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Rating Card */}
        <form onSubmit={handleSubmit} className="mt-8 rounded-xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/30 p-6">
          {/* Score selector */}
          <div>
            <label className="block text-sm font-medium">Overall Rating</label>
            <div className="mt-3 grid grid-cols-5 gap-3">
              {[1,2,3,4,5].map((n) => (
                <button 
                  key={n} 
                  type="button"
                  onClick={() => setRating(n)}
                  className={`rounded-md border px-4 py-2 transition-colors ${
                    rating === n 
                      ? 'border-[color:var(--brand-green)] bg-[color:var(--brand-green)] text-white' 
                      : 'border-[color:var(--brand-green)] text-[color:var(--brand-green)] hover:bg-[color:var(--brand-green)] hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Quick tags */}
          <div className="mt-6">
            <label className="block text-sm font-medium">Select Tags</label>
            <div className="mt-3 flex flex-wrap gap-3">
              {availableTags.map((tag) => (
                <button 
                  key={tag} 
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full border-2 px-4 py-1.5 text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'border-[color:var(--brand-green)] bg-[color:var(--brand-green)] text-white'
                      : 'border-[color:var(--brand-green)] text-[color:var(--brand-green)] bg-white hover:bg-[color:var(--brand-green)] hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-1">Course</label>
              <input 
                className="w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2" 
                placeholder="Course name" 
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Grade Level</label>
              <input 
                className="w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2" 
                placeholder="e.g. 10th" 
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Period</label>
              <input 
                className="w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2" 
                placeholder="e.g. 3" 
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm mb-1">Grade Received</label>
            <input 
              className="w-full rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2" 
              placeholder="e.g. A, B+, In Progress" 
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm mb-1">Your Review</label>
            <textarea 
              className="w-full min-h-32 rounded-md border border-black/10 dark:border-white/15 bg-transparent px-3 py-2" 
              placeholder="Write your thoughts..." 
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <div className="mt-6 flex items-center justify-end">
            <button 
              type="submit"
              disabled={loading || !user}
              className="rounded-full bg-[color:var(--brand-green)] text-white px-6 py-2.5 text-sm font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Rating'}
            </button>
          </div>

          {!user && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
              <p className="text-sm">You must be logged in to submit a review. <a href="/login" className="underline">Log in here</a></p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}