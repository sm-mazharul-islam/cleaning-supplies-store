"use client";
import Footer from "@/components/shared/Footer";
import NavbarTwo from "@/components/shared/NavbarTwo";
import Image from "next/image";
import React from "react";
import {
  FaLeaf,
  FaMagic,
  FaShieldAlt,
  FaHandSparkles,
  FaRocket,
  FaFlask,
  FaGlobe,
} from "react-icons/fa";

const AboutPage = () => {
  return (
    <>
      <NavbarTwo />
      <div className="bg-white overflow-hidden">
        {/* 1. HERO SECTION */}
        <section className="relative py-20 lg:py-32 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-in slide-in-from-left duration-1000">
              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                Est. 2024
              </span>
              <h1 className="text-5xl lg:text-8xl font-black text-slate-900 mt-6 leading-[1.1]">
                Redefining <br />
                <span className="text-blue-600 italic">Freshness.</span>
              </h1>
              <p className="text-slate-500 text-lg mt-8 max-w-lg leading-relaxed font-medium">
                We started in a small lab in Dhaka with one goal: to create
                cleaning supplies that don&apos;t smell like chemicals, but like
                a breath of fresh air.
              </p>
              <div className="mt-10 flex gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden"
                    >
                      <Image
                        src={`https://i.pravatar.cc/150?u=${i + 10}`}
                        alt="user"
                        height={500}
                        width={500}
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm font-bold text-slate-900">
                  Joined by <span className="text-blue-600">12,000+</span>{" "}
                  <br />
                  Clean-home enthusiasts
                </div>
              </div>
            </div>

            <div className="relative animate-in zoom-in duration-1000">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <Image
                src="https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=1000&auto=format&fit=crop"
                alt="Lab testing"
                className="rounded-[4rem] shadow-2xl object-cover h-[500px] w-full transform hover:rotate-2 transition-transform duration-500"
                height={500}
                width={500}
              />
            </div>
          </div>
        </section>

        {/* 2. CORE VALUES GRID */}
        <section className="py-24 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaLeaf />,
                title: "Eco-Friendly",
                desc: "Plant-based surfactants that dissolve naturally.",
              },
              {
                icon: <FaMagic />,
                title: "Stain Magic",
                desc: "Proprietary formulas that lift stains in seconds.",
              },
              {
                icon: <FaShieldAlt />,
                title: "Family Safe",
                desc: "pH neutral and dermatologically tested.",
              },
              {
                icon: <FaHandSparkles />,
                title: "Ultra Concentrated",
                desc: "Less water, more power, smaller carbon footprint.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-xl hover:shadow-blue-100 transition-all group"
              >
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-3">
                  {feature.title}
                </h4>
                <p className="text-slate-500 text-sm font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. FUTURE PRODUCTS (Upcoming) */}
        <section className="py-24 bg-blue-600 text-white rounded-[4rem] mx-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl lg:text-6xl font-black italic tracking-tighter">
                  The Future of <br /> Cleaning is Liquid.
                </h2>
                <p className="text-blue-100 mt-6 font-medium text-lg">
                  We are currently in the lab developing the next generation of
                  Lizel supplies.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <p className="text-xs font-black uppercase tracking-widest">
                  Q4 2026 Roadmap
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <FaFlask />,
                  title: "Enzyme X",
                  desc: "A bacteria-eating spray that cleans while you sleep.",
                },
                {
                  icon: <FaRocket />,
                  title: "Auto-Mist",
                  desc: "Smart diffusers that neutralize odors in real-time.",
                },
                {
                  icon: <FaGlobe />,
                  title: "Ocean-Plastic Bot",
                  desc: "100% bottles made from recycled ocean waste.",
                },
              ].map((prod, i) => (
                <div
                  key={i}
                  className="p-8 bg-white/10 border border-white/20 rounded-3xl backdrop-blur-sm hover:bg-white/20 transition-all"
                >
                  <div className="text-3xl mb-4">{prod.icon}</div>
                  <h5 className="text-xl font-bold mb-2">{prod.title}</h5>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    {prod.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. MEET THE LEADERSHIP (Member Pictures) */}
        <section className="py-32 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900">
              The Minds Behind the Sparkle
            </h2>
            <p className="text-slate-500 mt-4 font-medium">
              Expert chemists and designers dedicated to hygiene.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                name: "S M Mazharul",
                role: "Chief Formulator",
                img: "https://i.pravatar.cc/300?u=maz",
              },
              {
                name: "Sarah Alom",
                role: "Sustainability Lead",
                img: "https://i.pravatar.cc/300?u=sarah",
              },
              {
                name: "Tanvir Hasan",
                role: "Product Designer",
                img: "https://i.pravatar.cc/300?u=tan",
              },
            ].map((member, i) => (
              <div key={i} className="group text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-6 group-hover:rotate-0 transition-transform duration-500"></div>
                  <Image
                    src={member.img}
                    alt={member.name}
                    className="relative w-64 h-80 object-cover rounded-[3rem] shadow-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                    height={500}
                    width={500}
                  />
                </div>
                <h4 className="text-2xl font-black text-slate-900 mt-8">
                  {member.name}
                </h4>
                <p className="text-blue-600 font-bold uppercase tracking-widest text-[10px] mt-1">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. BRAND MISSION BAR */}
        <section className="py-20 rounded-t-[5rem] ">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full text-blue-400 text-xs font-black uppercase mb-8">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              Join our green mission
            </div>
            <h3 className="text-3xl lg:text-5xl font-black  mb-10 leading-tight text-black">
              Protecting your home. <br /> Protecting our planet.
            </h3>
            <button className="btn bg-white hover:bg-blue-600 hover:text-white text-slate-900 border-none rounded-2xl px-12 h-16 font-black uppercase tracking-widest transition-all shadow-2xl">
              Get Started
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
