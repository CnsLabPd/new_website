import Link from "next/link"

export default function TherapyPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <nav className="flex space-x-4 mb-8">
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
      </nav>
      {/* rest of code here */}
    </div>
  )
}
