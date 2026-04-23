import Image from "next/image";
import { FaArrowRight, FaHashtag } from "react-icons/fa";

const TopCategoriesCard = () => {
  const categories = [
    {
      id: "01",
      title: "Surface Degreaser",
      desc: "Industrial strength formula that cuts through grease, grime, and stubborn dirt instantly.",
      image:
        "https://natura-sciences.com/wp-content/uploads/2013/11/produits-d-entretien.jpg",
    },
    {
      id: "02",
      title: "Hospital Grade",
      desc: "Powerful disinfectant and stain remover, highly effective against harmful mold and mildew.",
      image:
        "https://www.cleaningdepotsupply.com/cdn/shop/files/janitorial_400x.jpg?v=1614300137",
    },
    {
      id: "03",
      title: "Polishing Set",
      desc: "High-density absorbent microfiber cloths designed for streak-free polishing on any surface.",
      image:
        "https://www.cleaningdepotsupply.com/cdn/shop/files/equipment_1_400x.jpg?v=1614300137",
    },
    {
      id: "04",
      title: "Eco Floor Care",
      desc: "Gentle yet effective solution that cleans various types of flooring without damaging the finish.",
      image:
        "https://www.cleaningdepotsupply.com/cdn/shop/files/chemicals_400x_614d253b-1a9a-4fa2-be10-68c2944eec13_400x.png?v=1638905874",
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header: Split Design */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <span className="badge badge-primary font-black tracking-[0.3em] py-3 mb-4 rounded-md uppercase text-[10px]">
              Top Categories
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
              High Performance <br />
              <span className=" text-blue-600">Cleaning Supplies</span>
            </h2>
          </div>
          <button className="btn btn-ghost group flex items-center gap-4 hover:bg-transparent">
            <span className="font-black text-sm tracking-widest uppercase">
              View Full Series
            </span>
            <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center group-hover:bg-blue-600 transition-all">
              <FaArrowRight />
            </div>
          </button>
        </div>

        {/* Grid: Sleek List-Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Image with Dynamic Mask */}
              <div className="relative w-full sm:w-48 h-48 flex-shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                />
                {/* ID Badge overlay */}
                <div className="absolute top-2 left-2 w-8 h-8 bg-white/80 backdrop-blur-md rounded-lg flex items-center justify-center text-[10px] font-black">
                  {cat.id}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-0.5 w-6 bg-blue-600"></div>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
                    Premium Quality
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  {cat.desc}
                </p>

                {/* Floating "Explore" Text (since no link) */}
                <div className="mt-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-[-10px] group-hover:translate-x-0">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Inventory Status:{" "}
                  </span>
                  <span className="text-[10px] font-black uppercase text-emerald-500">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Large Background ID Number for "Gorgeous" depth */}
              <div className="absolute -bottom-10 -right-5 text-[120px] font-black text-slate-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none italic">
                {cat.id}
              </div>
            </div>
          ))}
        </div>

        {/* Safety Footer */}
        <div className="mt-16 flex items-center justify-center gap-3 py-4 border-t border-slate-100">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Always wear protective gear while handling industrial chemicals
          </p>
        </div>
      </div>
    </section>
  );
};

export default TopCategoriesCard;
