import { FaTruck, FaSeedling } from "react-icons/fa";
import { MdVerified } from "react-icons/md";

export default function HomeHighlightedFeaturesSection() {
  return (
    <section className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex flex-col items-center text-center">
        <FaTruck style={{color: "var(--primary-green)"}} className="text-4xl mb-2" />
        <span className="font-bold mb-1" style={{color: "var(--primary-dark)"}}>Same Day Delivery</span>
        <span className="text-gray-600 text-sm">Harvested in the morning, on your table by evening. Freshness guaranteed.</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <FaSeedling style={{color: "var(--primary-green)"}} className="text-4xl mb-2" />
        <span className="font-bold mb-1" style={{color: "var(--primary-dark)"}}>Expert Farming Tools</span>
        <span className="text-gray-600 text-sm">Professional grade equipment curated by actual farmers for your home garden.</span>
      </div>
      <div className="flex flex-col items-center text-center">
        <MdVerified style={{color: "var(--primary-green)"}} className="text-4xl mb-2" />
        <span className="font-bold mb-1" style={{color: "var(--primary-dark)"}}>100% Organic Certified</span>
        <span className="text-gray-600 text-sm">Every vendor is vetted for sustainable and organic farming practices.</span>
      </div>
    </section>
  );
}
