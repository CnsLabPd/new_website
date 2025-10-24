import Link from "next/link"

const ContactPage = () => {
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex space-x-4">
              <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Home
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
              {/* rest of code here */}
            </div>
          </div>
        </div>
      </nav>
      <main className="bg-white">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          {/* rest of code here */}
        </div>
      </main>
    </div>
  )
}

export default ContactPage
