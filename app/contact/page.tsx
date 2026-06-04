import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact UtilSpot",
  description: "Contact the UtilSpot team — report bugs, suggest features, or ask questions.",
  alternates: { canonical: "https://utilspot.app/contact" },
};

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-8">Reach out for bug reports, tool suggestions, or any questions.</p>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Rahul Sharma"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="rahul@example.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <select
            id="subject"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Bug report</option>
            <option>Feature suggestion</option>
            <option>Question about a tool</option>
            <option>Business / partnership</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Describe your issue or suggestion..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          type="button"
          className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Send Message
        </button>

        <p className="text-xs text-gray-400 text-center">
          Or email directly:{" "}
          <a href="mailto:hello@utilspot.app" className="text-blue-600 hover:underline">
            hello@utilspot.app
          </a>
        </p>
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
        <strong>Note:</strong> This is a static contact form — backend not yet connected. Please email us directly at{" "}
        <a href="mailto:hello@utilspot.app" className="underline">hello@utilspot.app</a> for now.
      </div>
    </main>
  );
}
