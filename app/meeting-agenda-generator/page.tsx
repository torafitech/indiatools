import type { Metadata } from "next";
import Link from "next/link";
import { MeetingAgendaGenerator } from "@/components/tools/MeetingAgendaGenerator";
import { AdSlot } from "@/components/layout/AdSlot";

export const metadata: Metadata = {
  title: "AI Meeting Agenda Generator — Free Online Agenda Builder | UtilSpot",
  description:
    "Generate structured meeting agendas with time blocks in seconds. Add topics, set meeting type and duration, and get a complete AI-formatted agenda with action item template.",
  keywords: [
    "meeting agenda generator",
    "meeting agenda template",
    "AI meeting agenda",
    "free meeting agenda builder",
    "online agenda generator",
    "sprint review agenda",
    "meeting planner tool",
    "meeting agenda creator",
    "agenda with time blocks",
    "meeting agenda format",
  ],
  openGraph: {
    title: "AI Meeting Agenda Generator — Free Online Agenda Builder | UtilSpot",
    description:
      "Enter your meeting topics and let AI generate a structured agenda with time blocks, owners, and an action item template. Free.",
    url: "https://www.utilspot.app/meeting-agenda-generator",
    siteName: "UtilSpot",
  },
  alternates: { canonical: "https://www.utilspot.app/meeting-agenda-generator" },
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "AI Meeting Agenda Generator",
  description: "AI-powered meeting agenda generator. Enter topics, meeting type, and duration to get a structured agenda with time blocks, owner assignments, and action item template.",
  url: "https://www.utilspot.app/meeting-agenda-generator",
  applicationCategory: "BusinessApplication",
  operatingSystem: "All",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should every meeting agenda include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Every effective meeting agenda should include: meeting objective (what decision or outcome is needed), timed agenda items with owners assigned to each, pre-read materials or preparation required from attendees, a clear start/end time, and an action item capture section. The agenda should be distributed at least 24 hours in advance. Each agenda item should be a verb phrase (Decide X, Review Y, Update on Z) not a noun phrase — this makes the desired outcome explicit.",
      },
    },
    {
      "@type": "Question",
      name: "How do I run an effective stand-up or status update meeting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Effective status meetings follow a strict format: each person answers only three questions — what did I complete since last meeting, what will I do next, what is blocking me. Keep the total to 15 minutes for teams of up to 8. Stand-up format (everyone standing) enforces brevity. Start on time regardless of who's missing. Use a shared document or Slack thread instead of meeting if the update is purely informational with no blocker resolution needed.",
      },
    },
    {
      "@type": "Question",
      name: "What is a parking lot in a meeting?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A parking lot is a list of topics that come up during a meeting but are out of scope for the current session. Instead of shutting down tangential discussions (which frustrates participants) or letting the meeting run over time, you 'park' the topic for later. After the meeting, the facilitator decides whether to schedule a separate meeting, add it to the next agenda, or handle it async. A good facilitator explicitly names the parking lot at the start of every meeting.",
      },
    },
    {
      "@type": "Question",
      name: "How long should a meeting be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Default to shorter than you think. A 25-minute meeting (not 30) forces focus and leaves time for back-to-back scheduling. Decision meetings for 3-5 people rarely need more than 30 minutes. Brainstorming sessions work well at 45-60 minutes with diminishing returns after that. All-hands and kick-offs are the exception and can run 60-90 minutes if well-structured. Avoid 2-hour meetings — split into two separate sessions instead. Jeff Bezos's rule: no meeting where two pizzas can't feed everyone.",
      },
    },
    {
      "@type": "Question",
      name: "How do I handle meetings with remote and in-person attendees?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Hybrid meetings (some in room, some remote) are notoriously difficult. Best practices: every in-room participant should join the call individually from their own laptop (prevents the 'conference room disadvantage' for remote participants), share your screen whenever showing anything, use a shared doc for real-time note-taking, name a dedicated facilitator who actively calls on remote participants, and end with explicit action items with owners and deadlines read aloud before closing.",
      },
    },
  ],
};

export default function MeetingAgendaGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-xs text-gray-400 mb-4">
          <Link href="/" className="hover:text-[#E8500A]">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-600">Meeting Agenda Generator</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F2447] mb-2">
          AI Meeting Agenda Generator — Free Online Agenda Builder
        </h1>
        <p className="text-[#7A6048] mb-6 text-sm sm:text-base max-w-2xl">
          Enter your meeting title, type, duration, and topics. AI generates a complete structured agenda
          with time blocks, owner assignments, parking lot, and action item template. Copy as Markdown.
          Powered by Claude AI. Free, no signup.
        </p>

        <MeetingAgendaGenerator />

        <AdSlot slot="MEETING_AFTER_RESULT" className="my-6" />

        <section className="mt-8 bg-white rounded-xl border border-[#F0E4D4] p-6 space-y-5">
          <h2 className="text-xl font-bold text-[#0F2447]">How to Run Meetings That Don&apos;t Waste Everyone&apos;s Time</h2>
          <p className="text-[#7A6048] leading-relaxed text-sm">
            Unproductive meetings cost Indian businesses an estimated ₹25,000 crore annually in lost
            productivity. The average knowledge worker spends 31 hours per month in unproductive meetings.
            A well-structured agenda is the single most effective tool for reclaiming that time — it sets
            expectations, keeps discussions focused, and ensures the meeting has a clear outcome.
          </p>
          <h3 className="text-base font-bold text-[#0F2447]">Before the Meeting</h3>
          <ul className="list-disc pl-5 space-y-2 text-[#7A6048] text-sm">
            <li><strong className="text-[#0F2447]">Define the desired outcome:</strong> If you can&apos;t state what decision or deliverable the meeting should produce, cancel it and send an email instead.</li>
            <li><strong className="text-[#0F2447]">Invite only decision-makers and contributors:</strong> Every extra person slows decision-making. Jeff Bezos: if more than 10 people are in the room, it&apos;s a broadcast, not a meeting.</li>
            <li><strong className="text-[#0F2447]">Distribute materials 24h before:</strong> &ldquo;Please read before the meeting&rdquo; should replace the habit of reading documents together during the meeting — an enormous waste of shared time.</li>
          </ul>
          <h3 className="text-base font-bold text-[#0F2447]">During the Meeting</h3>
          <ul className="list-disc pl-5 space-y-2 text-[#7A6048] text-sm">
            <li><strong className="text-[#0F2447]">Start with objectives:</strong> The first 2 minutes should restate what the meeting needs to achieve and the agenda order.</li>
            <li><strong className="text-[#0F2447]">Timebox aggressively:</strong> Assign a time limit to each topic and enforce it. Move unfinished discussions to the parking lot.</li>
            <li><strong className="text-[#0F2447]">Capture action items live:</strong> Use a shared doc. For each action: what, who, by when. Never leave a meeting without explicitly reading the action items aloud.</li>
          </ul>
        </section>

        <section className="mt-6 bg-white rounded-xl border border-[#F0E4D4] p-6">
          <h2 className="text-xl font-bold text-[#0F2447] mb-5">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqSchema.mainEntity.map((faq) => (
              <div key={faq.name} className="border-b border-[#F0E4D4] pb-4 last:border-0 last:pb-0">
                <h3 className="font-semibold text-[#0F2447] mb-1 text-sm sm:text-base">{faq.name}</h3>
                <p className="text-[#7A6048] text-sm leading-relaxed">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        <AdSlot slot="MEETING_BELOW_FAQ" className="my-6" />

        <section className="mt-2 mb-4">
          <h2 className="text-base font-semibold text-[#7A6048] mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { href: "/social-media-calendar", label: "Social Media Calendar" },
              { href: "/freelance-rate-calculator", label: "Freelance Rate Calculator" },
              { href: "/word-counter", label: "Word Counter" },
            ].map((t) => (
              <Link key={t.href} href={t.href} className="text-sm px-3 py-1.5 bg-[#FBF5EE] text-[#0F2447] rounded-full hover:bg-[#F0E4D4] transition-colors">
                {t.label} →
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
