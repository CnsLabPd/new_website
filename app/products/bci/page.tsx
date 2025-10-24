import Link from "next/link"

export default function Page() {
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4">
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
          </div>
        </div>
      </nav>
      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="px-4 py-6 sm:px-0">
              <h1 className="text-4xl font-bold text-gray-900">BCI Products</h1>
              <p className="mt-4 text-lg text-gray-500">Welcome to our Brain-Computer Interface products page.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
