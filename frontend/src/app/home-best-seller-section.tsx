import Image from "next/image";

export default function HomeBestSellerSection() {
  return (
    <section style={{backgroundColor: "var(--primary-green-bg, #EAFBEF)"}} className="w-full py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6" style={{color: "var(--primary-dark)"}}>Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Example product cards */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col">
            <Image src="/prod-strawberries.jpg" width={120} height={80} alt="Heirloom Strawberries" className="rounded-lg" />
            <span className="mt-2 font-semibold" style={{color: "var(--primary-dark)"}}>Heirloom Strawberries</span>
            <span className="text-gray-500 text-sm">By Green Leaf Farms</span>
            <span className="font-bold text-lg mt-2" style={{color: "var(--primary-green)"}}>$8.50</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col">
            <Image src="/prod-carrots.jpg" width={120} height={80} alt="Crunchy Honey Carrots" className="rounded-lg" />
            <span className="mt-2 font-semibold" style={{color: "var(--primary-dark)"}}>Crunchy Honey Carrots</span>
            <span className="text-gray-500 text-sm">By Sunny Valley Co.</span>
            <span className="font-bold text-lg mt-2" style={{color: "var(--primary-green)"}}>$3.20</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col">
            <Image src="/prod-rootbox.jpg" width={120} height={80} alt="Root Veggie Box" className="rounded-lg" />
            <span className="mt-2 font-semibold" style={{color: "var(--primary-dark)"}}>Root Veggie Box</span>
            <span className="text-gray-500 text-sm">By Organic Harvest</span>
            <span className="font-bold text-lg mt-2" style={{color: "var(--primary-green)"}}>$24.99</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex flex-col">
            <Image src="/prod-seedpack.jpg" width={120} height={80} alt="Seed Starter Pack" className="rounded-lg" />
            <span className="mt-2 font-semibold" style={{color: "var(--primary-dark)"}}>Seed Starter Pack</span>
            <span className="text-gray-500 text-sm">By Nature's Pulse</span>
            <span className="font-bold text-lg mt-2" style={{color: "var(--primary-green)"}}>$15.00</span>
          </div>
        </div>
      </div>
    </section>
  );
}
