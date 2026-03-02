import Image from "next/image";

export default function HomeCategorySection() {
  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6" style={{color: "var(--primary-dark)"}}>Explore Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {/* Example category cards */}
        <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
          <div className="relative w-full aspect-square">
            <Image src="/fruits.png" fill alt="Fruits" className="object-cover" />
          </div>
          <span className="py-4 text-center font-semibold" style={{color: "var(--primary-dark)"}}>Fruits</span>
        </div>
        <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
          <div className="relative w-full aspect-square">
            <Image src="/veggies.png" fill alt="Vegetables" className="object-cover" />
          </div>
          <span className="py-4 text-center font-semibold" style={{color: "var(--primary-dark)"}}>Vegetables</span>
        </div>
        {/* <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
          <div className="relative w-full aspect-square">
            <Image src="/cat-organic.jpg" fill alt="Organic Products" className="object-cover" />
          </div>
          <span className="py-4 text-center font-semibold" style={{color: "var(--primary-dark)"}}>Organic Products</span>
        </div>
        <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
          <div className="relative w-full aspect-square">
            <Image src="/cat-seeds.jpg" fill alt="Premium Seeds" className="object-cover" />
          </div>
          <span className="py-4 text-center font-semibold" style={{color: "var(--primary-dark)"}}>Premium Seeds</span>
        </div>
        <div className="bg-white rounded-xl shadow overflow-hidden flex flex-col">
          <div className="relative w-full aspect-square">
            <Image src="/cat-tools.jpg" fill alt="Farming Tools" className="object-cover" />
          </div>
          <span className="py-4 text-center font-semibold" style={{color: "var(--primary-dark)"}}>Farming Tools</span>
        </div> */}
      </div>
    </section>
  );
}
