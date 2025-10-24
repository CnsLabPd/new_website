import Link from "next/link"

export default function DiagnosticsPage() {
  return (
    <div>
      <nav className="flex space-x-4">
        <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Home
        </Link>
        <Link
          href="/products"
          className="text-sm font-medium text-cyan-400 hover:text-white transition-colors font-semibold"
        >
          Products
        </Link>
        <Link href="/workshops" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Workshops
        </Link>
        <Link href="/research" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Research
        </Link>
        {/* rest of code here */}
      </nav>
      <main className="p-4">
        <h1>Diagnostics</h1>
        <p>Here you can find information about our diagnostics tools and services.</p>
        {/* rest of code here */}
      </main>
    </div>
  )
}
