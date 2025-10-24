import Link from "next/link"

export default function TeamPage() {
  return (
    <div className="bg-gray-900 text-white">
      <nav className="flex justify-center p-4">
        <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors mr-4">
          Home
        </Link>
        <Link href="/products" className="text-sm font-medium text-gray-300 hover:text-white transition-colors mr-4">
          Products
        </Link>
        <Link href="/workshops" className="text-sm font-medium text-gray-300 hover:text-white transition-colors mr-4">
          Workshops
        </Link>
        <Link href="/research" className="text-sm font-medium text-gray-300 hover:text-white transition-colors mr-4">
          Research
        </Link>
        <Link href="/team" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Team
        </Link>
      </nav>
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Our Team</h1>
        <p>Meet the people behind the projects.</p>
        {/* rest of code here */}
      </main>
    </div>
  )
}
