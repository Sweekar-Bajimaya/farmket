import Image from "next/image";

export default function HomeCategorySection() {
  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6" style={{color: "var(--primary-dark)"}}>Explore Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {/* Example category cards */}
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <Image src="/fruits.png" width={120} height={120} alt="Fruits" />
          <span className="mt-2 font-semibold" style={{color: "var(--primary-dark)"}}>Fruits</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <Image src="/Vegetables-3.png" width={120} height={120} alt="Vegetables" />
          <span className="mt-2 font-semibold" style={{color: "var(--primary-dark)"}}>Vegetables</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <Image src="/cat-organic.jpg" width={80} height={80} alt="Organic Products" />
          <span className="mt-2 font-semibold" style={{color: "var(--primary-dark)"}}>Organic Products</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <Image src="/cat-seeds.jpg" width={80} height={80} alt="Premium Seeds" />
          <span className="mt-2 font-semibold" style={{color: "var(--primary-dark)"}}>Premium Seeds</span>
        </div>
        <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <Image src="/cat-tools.jpg" width={80} height={80} alt="Farming Tools" />
          <span className="mt-2 font-semibold" style={{color: "var(--primary-dark)"}}>Farming Tools</span>
        </div>
      </div>
    </section>
  );
}
