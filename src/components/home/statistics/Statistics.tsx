"use client";
import { motion } from "framer-motion";

const Statistics = () => {
  // বাস্তব প্রজেক্টে এই ডাটাগুলো আপনি আপনার Spring Boot বা Node.js ব্যাকএন্ড থেকে fetch করবেন
  const stats = [
    { id: 1, label: "Quality Products", value: "500+" },
    { id: 2, label: "Happy Clients", value: "12k+" },
    { id: 3, label: "Service Points", value: "150+" },
    { id: 4, label: "Years Excellence", value: "10+" },
  ];

  return (
    <section className="py-20 bg-brand-primary/5 rounded-card border border-brand-primary/10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h3 className="text-4xl font-black text-brand-primary tracking-tighter">
              {stat.value}
            </h3>
            <p className="text-xs uppercase font-bold text-main-muted tracking-widest">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
