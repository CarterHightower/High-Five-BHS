"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchTeachers, Teacher } from "@/lib/firestore";

export default function Home() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const results = await searchTeachers(query.trim());
          setSuggestions(results);
        } catch (error) {
          console.error('Error searching teachers:', error);
          setSuggestions([]);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (teacher: Teacher) => {
    setQuery(teacher.name);
    setIsOpen(false);
    router.push(`/students/${teacher.slug}`);
  };

  return (
    <section className="min-h-[calc(100vh-56px)] flex flex-col items-center px-4">
      <h1 className="mt-[30vh] text-[96px] leading-none text-white" style={{ fontFamily: 'var(--font-pacifico)' }}>High Five</h1>
      <div className="w-full max-w-lg mt-12 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            // Defer closing to allow click on suggestion
            setTimeout(() => setIsOpen(false), 120);
          }}
          placeholder="Search for teacher"
          className="w-full px-4 py-3 rounded-lg bg-white/95 text-black placeholder-black/60 text-base border border-[color:var(--brand-grey)] shadow-sm"
        />

        {isOpen && (suggestions.length > 0 || loading) && (
          <ul className="absolute z-10 mt-1 w-full max-h-64 overflow-auto rounded-lg border border-[color:var(--brand-grey)] bg-white text-black shadow-lg">
            {loading ? (
              <li className="px-4 py-2 text-gray-500">Searching...</li>
            ) : (
              suggestions.map((teacher) => (
                <li key={teacher.id}>
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(teacher)}
                    className="w-full text-left px-4 py-2 hover:bg-black/5"
                  >
                    <div className="flex justify-between items-center">
                      <span>{teacher.name}</span>
                      {teacher.totalReviews > 0 && (
                        <span className="text-sm text-gray-500">
                          {teacher.averageRating}/5 ({teacher.totalReviews} reviews)
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </section>
  );
}
