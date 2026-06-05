"use client";

import { useState } from "react";

interface Post {
  day: number;
  platform: string;
  contentType: string;
  caption: string;
  hashtags: string[];
  postingTime: string;
  notes: string;
}

const PLATFORMS = ["Instagram", "LinkedIn", "Twitter/X", "Facebook", "YouTube"] as const;
type Platform = (typeof PLATFORMS)[number];

const TONES = ["Professional", "Casual", "Humorous", "Inspirational", "Educational"] as const;
type Tone = (typeof TONES)[number];

const DURATIONS = [7, 14, 30] as const;
type Duration = (typeof DURATIONS)[number];

const PLATFORM_STYLES: Record<Platform, string> = {
  Instagram: "bg-pink-50 text-pink-700 border-pink-200",
  LinkedIn: "bg-[#F0F4FF] text-[#0F2447] border-[#C8D4F0]",
  "Twitter/X": "bg-slate-50 text-slate-700 border-slate-200",
  Facebook: "bg-indigo-50 text-indigo-700 border-indigo-200",
  YouTube: "bg-red-50 text-red-700 border-red-200",
};

const CONTENT_TYPE_STYLES: Record<string, string> = {
  educational: "bg-emerald-50 text-emerald-700",
  promotional: "bg-[#FFF5EE] text-[#E8500A]",
  engagement: "bg-violet-50 text-violet-700",
  story: "bg-fuchsia-50 text-fuchsia-700",
  reel: "bg-rose-50 text-rose-700",
  carousel: "bg-sky-50 text-sky-700",
  poll: "bg-[#FFF8F2] text-[#E8500A]",
  quote: "bg-teal-50 text-teal-700",
};

function getContentTypeStyle(type: string) {
  const key = type.toLowerCase();
  for (const [k, v] of Object.entries(CONTENT_TYPE_STYLES)) {
    if (key.includes(k)) return v;
  }
  return "bg-[#F0E4D4] text-[#7A6048]";
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-8 w-8 bg-[#F0E4D4] rounded-xl" />
        <div className="h-5 bg-[#F0E4D4] rounded-lg w-24" />
        <div className="h-5 bg-[#F0E4D4] rounded-full w-20 ml-auto" />
      </div>
      <div className="h-4 bg-[#FBF5EE] rounded w-full mb-2" />
      <div className="h-4 bg-[#FBF5EE] rounded w-4/5 mb-4" />
      <div className="flex gap-2 flex-wrap">
        <div className="h-6 bg-[#FBF5EE] rounded-full w-16" />
        <div className="h-6 bg-[#FBF5EE] rounded-full w-20" />
        <div className="h-6 bg-[#FBF5EE] rounded-full w-14" />
      </div>
    </div>
  );
}

export function SocialMediaCalendar() {
  const [brand, setBrand] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["Instagram", "LinkedIn"]);
  const [tone, setTone] = useState<Tone>("Professional");
  const [days, setDays] = useState<Duration>(14);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"All" | Platform>("All");
  const [copied, setCopied] = useState(false);

  function togglePlatform(p: Platform) {
    setSelectedPlatforms((prev) =>
      prev.includes(p)
        ? prev.length === 1
          ? prev
          : prev.filter((x) => x !== p)
        : [...prev, p]
    );
  }

  async function handleGenerate() {
    if (!brand.trim() || !niche.trim()) return;
    setLoading(true);
    setError(null);
    setPosts(null);
    setFilter("All");

    try {
      const res = await fetch("/api/social-calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: brand.trim(),
          niche: niche.trim(),
          platforms: selectedPlatforms,
          tone,
          days,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError("You've used your 5 free generations today. Come back tomorrow.");
        } else {
          setError(data.error ?? "Something went wrong. Please try again.");
        }
        return;
      }

      setPosts(data.posts);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopyAll() {
    if (!posts) return;
    const text = posts
      .map(
        (p) =>
          `Day ${p.day} — ${p.platform} (${p.contentType}) @ ${p.postingTime}\n${p.caption}\n${p.hashtags.map((h) => `#${h.replace(/^#/, "")}`).join(" ")}\nNote: ${p.notes}`
      )
      .join("\n\n---\n\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // silent fail
    }
  }

  const filteredPosts =
    posts?.filter((p) => filter === "All" || p.platform === filter) ?? [];

  const canGenerate = brand.trim().length > 0 && niche.trim().length > 0 && !loading;

  return (
    <div className="space-y-6">
      {/* Input card */}
      <div className="bg-white rounded-2xl border border-[#F0E4D4] p-5 sm:p-6 space-y-5">
        {/* Brand + Niche row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="brand" className="block text-sm font-semibold text-[#0F2447] mb-1.5">
              Brand / Business Name <span className="text-[#E8500A]">*</span>
            </label>
            <input
              id="brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              maxLength={100}
              placeholder="e.g. FitFuel India"
              className="w-full border border-[#F0E4D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white text-[#0F2447] placeholder-[#C4A882] transition-colors"
            />
          </div>
          <div>
            <label htmlFor="niche" className="block text-sm font-semibold text-[#0F2447] mb-1.5">
              Niche / Industry <span className="text-[#E8500A]">*</span>
            </label>
            <input
              id="niche"
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              maxLength={100}
              placeholder="e.g. Health & Fitness Supplements"
              className="w-full border border-[#F0E4D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8500A]/20 focus:border-[#E8500A] bg-white text-[#0F2447] placeholder-[#C4A882] transition-colors"
            />
          </div>
        </div>

        {/* Platforms */}
        <div>
          <p className="block text-sm font-semibold text-[#0F2447] mb-2">Platforms</p>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((p) => {
              const active = selectedPlatforms.includes(p);
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  className={`px-4 py-1.5 text-sm rounded-full border transition-colors font-medium ${
                    active
                      ? "bg-[#0F2447] text-white border-[#0F2447]"
                      : "bg-white border-[#F0E4D4] text-[#7A6048] hover:border-[#E8500A] hover:text-[#E8500A]"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tone */}
        <div>
          <p className="block text-sm font-semibold text-[#0F2447] mb-2">Tone</p>
          <div className="flex flex-wrap gap-2">
            {TONES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t)}
                className={`px-4 py-1.5 text-sm rounded-full border transition-colors font-medium ${
                  tone === t
                    ? "bg-[#E8500A] text-white border-[#E8500A]"
                    : "bg-white border-[#F0E4D4] text-[#7A6048] hover:border-[#E8500A] hover:text-[#E8500A]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <p className="block text-sm font-semibold text-[#0F2447] mb-2">Duration</p>
          <div className="flex gap-2">
            {DURATIONS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                className={`px-5 py-2 text-sm rounded-xl border transition-colors font-semibold ${
                  days === d
                    ? "bg-[#0F2447] text-white border-[#0F2447]"
                    : "bg-white border-[#F0E4D4] text-[#7A6048] hover:border-[#E8500A] hover:text-[#E8500A]"
                }`}
              >
                {d} days
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={!canGenerate}
          className="w-full bg-[#E8500A] hover:bg-[#D44A09] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl px-6 py-3 text-base transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Claude is generating your calendar...
            </>
          ) : (
            `Generate ${days}-Day Calendar →`
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-[#FFF5F0] border border-[#F0E4D4] rounded-2xl p-4 text-sm text-[#E8500A] font-medium">
          {error}
        </div>
      )}

      {/* Skeletons */}
      {loading && (
        <div className="space-y-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* Empty state */}
      {!loading && !posts && !error && (
        <div className="flex flex-col items-center justify-center py-14 px-6 bg-white rounded-2xl border border-[#F0E4D4] text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#FBF5EE] flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#E8500A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" />
            </svg>
          </div>
          <h3 className="text-base font-bold text-[#0F2447] mb-1.5">Your calendar will appear here</h3>
          <p className="text-sm text-[#7A6048] max-w-xs">
            Fill in your brand details, pick platforms and tone, then hit Generate.
          </p>
        </div>
      )}

      {/* Results */}
      {posts && !loading && (
        <div className="space-y-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-sm font-semibold text-[#0F2447] shrink-0">
              {posts.length} posts generated
            </p>
            {/* Filter pills */}
            <div className="flex flex-wrap gap-2 flex-1">
              {(["All", ...selectedPlatforms] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFilter(p as typeof filter)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                    filter === p
                      ? "bg-[#0F2447] text-white border-[#0F2447]"
                      : "bg-white border-[#F0E4D4] text-[#7A6048] hover:border-[#E8500A]"
                  }`}
                >
                  {p}
                  {p !== "All" && (
                    <span className="ml-1 opacity-60">
                      ({posts.filter((post) => post.platform === p).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
            {/* Copy all */}
            <button
              type="button"
              onClick={handleCopyAll}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold border border-[#F0E4D4] rounded-xl hover:bg-[#FBF5EE] hover:border-[#E8500A]/30 transition-colors text-[#7A6048] shrink-0"
            >
              {copied ? (
                <>
                  <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy All
                </>
              )}
            </button>
          </div>

          {/* Post cards */}
          {filteredPosts.map((post, idx) => {
            const platformStyle = PLATFORM_STYLES[post.platform as Platform] ?? "bg-slate-50 text-slate-700 border-slate-200";
            const typeStyle = getContentTypeStyle(post.contentType);
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#F0E4D4] p-5 hover:border-[#E8500A]/30 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {/* Day badge */}
                  <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#0F2447] text-white text-xs font-bold shrink-0">
                    {post.day}
                  </span>
                  {/* Platform badge */}
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${platformStyle}`}>
                    {post.platform}
                  </span>
                  {/* Content type */}
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize ${typeStyle}`}>
                    {post.contentType}
                  </span>
                  {/* Posting time */}
                  <span className="ml-auto text-xs text-[#7A6048] font-medium flex items-center gap-1">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {post.postingTime}
                  </span>
                </div>

                {/* Caption */}
                <p className="text-sm text-[#0F2447] leading-relaxed mb-3">{post.caption}</p>

                {/* Hashtags */}
                {post.hashtags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.hashtags.map((tag, i) => (
                      <span key={i} className="text-xs text-[#E8500A] font-medium bg-[#FFF5EE] px-2 py-0.5 rounded-full">
                        #{tag.replace(/^#/, "")}
                      </span>
                    ))}
                  </div>
                )}

                {/* Notes */}
                {post.notes && (
                  <p className="text-xs text-[#7A6048] bg-[#FFFCF8] border border-[#F0E4D4] rounded-xl px-3 py-2 leading-relaxed">
                    <span className="font-semibold text-[#0F2447]">Tip:</span> {post.notes}
                  </p>
                )}
              </div>
            );
          })}

          {filteredPosts.length === 0 && (
            <p className="text-sm text-[#7A6048] text-center py-8">
              No posts for this platform in the calendar.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
