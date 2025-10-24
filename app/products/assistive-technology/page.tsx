import Link from "next/link"

const AssistiveTechnologyPage = () => {
  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-gray-800">
        <div className="flex space-x-4">
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
        </div>
        {/* rest of code here */}
      </nav>
      <main className="p-4">{/* Content for Assistive Technology Page */}</main>
    </div>
  )
}

export default AssistiveTechnologyPage
