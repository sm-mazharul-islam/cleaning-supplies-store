"use client";

import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Container } from "@/components/homeSections";

const stats = [
  { id: 1, label: "Quality Products", value: 500, suffix: "+" },
  { id: 2, label: "Happy Clients", value: 12, suffix: "k+" },
  { id: 3, label: "Service Points", value: 150, suffix: "+" },
  { id: 4, label: "Years Excellence", value: 10, suffix: "+" },
];

const Statistics = () => {
  return (
    <Container>
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center mb-20">
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="space-y-3"
              >
                <h3 className="text-4xl md:text-6xl font-black text-primary tracking-tighter">
                  <CountUp
                    end={stat.value}
                    duration={3}
                    enableScrollSpy={true}
                    scrollSpyOnce={false}
                  />
                  {stat.suffix}
                </h3>
                <p className="text-[10px] md:text-xs uppercase font-black text-base-content/60 tracking-[0.2em]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Statistics;
