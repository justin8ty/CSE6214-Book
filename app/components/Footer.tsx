import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-teal-100">
              SecondhandBooks is your go-to platform for buying and selling used books online.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/search" className="hover:text-teal-200 transition-colors">Search Books</Link></li>
              <li><Link href="/sell" className="hover:text-teal-200 transition-colors">Sell Books</Link></li>
              <li><Link href="/faq" className="hover:text-teal-200 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-teal-200 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-teal-200 transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-teal-200 transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-teal-200 transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-teal-400 text-center text-sm text-teal-100">
          <p>&copy; 2023 SecondhandBooks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

