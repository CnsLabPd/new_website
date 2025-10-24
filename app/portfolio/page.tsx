import Link from "next/link"

const PortfolioPage = () => {
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
        <Link href="/research" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
          Research
        </Link>
      </nav>
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-4">Portfolio</h1>
        <p className="text-lg">
          Welcome to our portfolio page. Here you can find information about our products, workshops, and research
          initiatives.
        </p>
        {/* rest of code here */}
      </main>
    </div>
  )
}

export default PortfolioPage
