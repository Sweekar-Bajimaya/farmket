export default function HomeFooterSection() {
  return (
    <footer className="w-full bg-[#0F172A] text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div>
          <h3 className="font-bold text-lg mb-2" style={{color: "var(--primary-green)"}}>Farmket</h3>
          <p className="text-sm text-gray-300">The world's premier digital marketplace for fresh, organic produce and agricultural supplies.</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">MARKETPLACE</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>Shop All Products</li>
            <li>Organic Fruits</li>
            <li>Seasonal Veggies</li>
            <li>Seeds & Starters</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">VENDOR RESOURCES</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>Become a Seller</li>
            <li>Vendor Guidelines</li>
            <li>Logistics Support</li>
            <li>Seller Dashboard</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">NEWSLETTER</h4>
          <p className="text-sm text-gray-300 mb-2">Get weekly recipes and farming tips.</p>
          <input type="email" placeholder="Email address" className="px-3 py-2 rounded-l bg-white text-black" />
          <button style={{backgroundColor: "var(--primary-green)", color: "var(--primary-dark)"}} className="px-4 py-2 rounded-r font-bold">Join</button>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 mt-8 flex justify-between text-xs text-gray-400">
        <span>© 2024 Farmket Technologies Inc. All rights reserved.</span>
        <span>Privacy Policy &nbsp; Terms of Service</span>
      </div>
    </footer>
  );
}
