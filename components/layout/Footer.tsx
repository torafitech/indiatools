import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
          <div>
            <p className="font-semibold text-gray-800 mb-2">IndiaTools</p>
            <p className="text-sm text-gray-500">Free online tools for India. No signup required.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-2 text-sm">Finance</p>
            <ul className="space-y-1 text-sm text-gray-500">
              <li><Link href="/emi-calculator" className="hover:text-blue-600">EMI Calculator</Link></li>
              <li><Link href="/sip-calculator" className="hover:text-blue-600">SIP Calculator</Link></li>
              <li><Link href="/income-tax-calculator" className="hover:text-blue-600">Tax Calculator</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-2 text-sm">Other Tools</p>
            <ul className="space-y-1 text-sm text-gray-500">
              <li><Link href="/word-counter" className="hover:text-blue-600">Word Counter</Link></li>
              <li><Link href="/tdee-calculator" className="hover:text-blue-600">TDEE Calculator</Link></li>
              <li><Link href="/invoice-generator" className="hover:text-blue-600">Invoice Generator</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-gray-700 mb-2 text-sm">Company</p>
            <ul className="space-y-1 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
          © {currentYear} IndiaTools.in — Free tools for everyone. No ads shown until AdSense approval.
        </div>
      </div>
    </footer>
  );
}
