import Link from "next/link"

const ModelingPage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-800 p-4">
        <nav className="flex space-x-4">
          <Link href="/" className="text-sm font-medium text-cyan-400 hover:text-white transition-colors font-semibold">
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
      </header>
      <main className="p-8">
        <h1 className="text-2xl font-bold mb-4">Modeling</h1>
        <p>Welcome to the Modeling section of our product page.</p>
        {/* rest of code here */}
      </main>
    </div>
  )
}

export default ModelingPage
