import Image from "next/image";
import { FaCartPlus } from "react-icons/fa6";
import { MdOutlineStarBorder } from "react-icons/md";

export default function HomeBestSellerSection() {
  return (
    <section style={{backgroundColor: "var(--primary-green-bg, #EAFBEF)"}} className="w-full py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6" style={{color: "var(--primary-dark)"}}>Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* Card 1: Apples */}
          <div className="bg-white rounded-xl shadow flex flex-col overflow-hidden" style={{width: 250}}>
            <div style={{position: "relative", width: "100%", height: 140}}>
              <Image
                src="/apple3.png"
                alt="Apples"
                fill
                className="object-cover"
                style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}}
              />
              {/* Example discount badge */}
              <span style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: '#fff',
                color: '#222',
                fontWeight: 600,
                borderRadius: 6,
                padding: '2px 8px',
                fontSize: 14,
                boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
              }}>-10%</span>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg" style={{color: "var(--primary-dark)"}}>Apples</span>
                {/* Example rating */}
                <span className="flex items-center gap-1 text-green-700 font-semibold text-sm bg-gray-100 px-2 py-1 rounded">
                  <MdOutlineStarBorder />
                  4.9
                </span>
              </div>
              <span className="text-gray-500 text-sm">By Green Leaf Farms</span>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-xl" style={{color: "var(--primary-green)"}}>$8.50</span>
                <span className="text-gray-400 line-through ml-2">$9.45</span>
                {/* Example cart button */}
                <button className="ml-auto bg-green-100 text-green-700 rounded p-2">
                  <FaCartPlus />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: carrots */}
          <div className="bg-white rounded-xl shadow flex flex-col overflow-hidden" style={{width: 250}}>
            <div style={{position: "relative", width: "100%", height: 140}}>
              <Image
                src="/carrot.png"
                alt="Root Veggie Box"
                fill
                className="object-cover"
                style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}}
              />
              {/* Example discount badge */}
              <span style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: '#fff',
                color: '#222',
                fontWeight: 600,
                borderRadius: 6,
                padding: '2px 8px',
                fontSize: 14,
                boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
              }}>-5%</span>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg" style={{color: "var(--primary-dark)"}}>Root Veggie Box</span>
                <span className="flex items-center gap-1 text-green-700 font-semibold text-sm bg-gray-100 px-2 py-1 rounded">
                  <MdOutlineStarBorder />
                  4.7
                </span>
              </div>
              <span className="text-gray-500 text-sm">By Organic Harvest</span>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-xl" style={{color: "var(--primary-green)"}}>$24.99</span>
                <span className="text-gray-400 line-through ml-2">$26.50</span>
                <button className="ml-auto bg-green-100 text-green-700 rounded p-2">
                  <FaCartPlus />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Root Veggie Box */}
          <div className="bg-white rounded-xl shadow flex flex-col overflow-hidden" style={{width: 250}}>
            <div style={{position: "relative", width: "100%", height: 140}}>
              <Image
                src="/orange.png"
                alt="Root Veggie Box"
                fill
                className="object-cover"
                style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}}
              />
              {/* Example discount badge */}
              <span style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: '#fff',
                color: '#222',
                fontWeight: 600,
                borderRadius: 6,
                padding: '2px 8px',
                fontSize: 14,
                boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
              }}>-5%</span>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg" style={{color: "var(--primary-dark)"}}>Orange</span>
                <span className="flex items-center gap-1 text-green-700 font-semibold text-sm bg-gray-100 px-2 py-1 rounded">
                  <MdOutlineStarBorder />
                  4.7
                </span>
              </div>
              <span className="text-gray-500 text-sm">By Organic Harvest</span>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-xl" style={{color: "var(--primary-green)"}}>$24.99</span>
                <span className="text-gray-400 line-through ml-2">$26.50</span>
                <button className="ml-auto bg-green-100 text-green-700 rounded p-2">
                  <FaCartPlus />
                </button>
              </div>
            </div>
          </div>

          {/* Card 4: Root Veggie Box */}
          <div className="bg-white rounded-xl shadow flex flex-col overflow-hidden" style={{width: 250}}>
            <div style={{position: "relative", width: "100%", height: 140}}>
              <Image
                src="/cauliflower.png"
                alt="Root Veggie Box"
                fill
                className="object-cover"
                style={{borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}}
              />
              {/* Example discount badge */}
              <span style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: '#fff',
                color: '#222',
                fontWeight: 600,
                borderRadius: 6,
                padding: '2px 8px',
                fontSize: 14,
                boxShadow: '0 1px 4px rgba(0,0,0,0.07)'
              }}>-5%</span>
            </div>
            <div className="p-4 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg" style={{color: "var(--primary-dark)"}}>Cauliflower</span>
                <span className="flex items-center gap-1 text-green-700 font-semibold text-sm bg-gray-100 px-2 py-1 rounded">
                  <MdOutlineStarBorder />
                  4.7
                </span>
              </div>
              <span className="text-gray-500 text-sm">By Organic Harvest</span>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-xl" style={{color: "var(--primary-green)"}}>$24.99</span>
                <span className="text-gray-400 line-through ml-2">$26.50</span>
                <button className="ml-auto bg-green-100 text-green-700 rounded p-2">
                  <FaCartPlus />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
