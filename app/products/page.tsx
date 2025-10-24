import Link from "next/link"

const ProductsPage = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="flex justify-center space-x-4">
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
      </nav>
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Our Products</h1>
        <p>Here you can find information about our products.</p>
        {/* rest of code here */}
      </main>
    </div>
  )
}

export default ProductsPage
