import Link from "next/link"

const ResearchPage = () => {
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Products
                  </Link>
                  <Link
                    href="/workshops"
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Workshops
                  </Link>
                  <Link
                    href="/research"
                    className="text-sm font-medium text-cyan-400 hover:text-white transition-colors font-semibold"
                  >
                    Research
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Research</h1>
            <p className="mt-4 text-gray-500">Welcome to our research page.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ResearchPage
