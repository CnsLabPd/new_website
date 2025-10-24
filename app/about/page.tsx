import Link from "next/link"

const AboutPage = () => {
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
        <h1>About Us</h1>
        <p>
          Welcome to our company. We specialize in providing innovative products and conducting cutting-edge research.
        </p>
      </main>
    </div>
  )
}

export default AboutPage
