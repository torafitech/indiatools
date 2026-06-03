import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-blue-600 font-bold text-xl">IndiaTools</span>
          <span className="text-xs text-gray-500 hidden sm:inline">.in</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm text-gray-600">
          <Link href="/#finance" className="hover:text-blue-600 hidden sm:inline">Finance</Link>
          <Link href="/#health" className="hover:text-blue-600 hidden sm:inline">Health</Link>
          <Link href="/#business" className="hover:text-blue-600 hidden sm:inline">Business</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
        </nav>
      </div>
    </header>
  );
}
