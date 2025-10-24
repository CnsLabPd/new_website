import Link from "next/link"

const CareersPage = () => {
  return (
    <div className="bg-gray-900 text-white">
      <nav className="flex justify-center space-x-4 py-4">
        <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Home
        </Link>
        <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          About
        </Link>
        <Link href="/products" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Products
        </Link>
        <Link href="/workshops" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Workshops
        </Link>
        <Link href="/research" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Research
        </Link>
        <Link
          href="/careers"
          className="text-sm font-medium text-white bg-blue-500 px-3 py-2 rounded transition-colors"
        >
          Careers
        </Link>
      </nav>
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Careers</h1>
        <p>Welcome to our careers page. We are always looking for talented individuals to join our team.</p>
        {/* rest of code here */}
      </main>
    </div>
  )
}

export default CareersPage
