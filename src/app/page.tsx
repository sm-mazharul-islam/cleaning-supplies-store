import {
  Header,
  Container,
  Footer,
  Features,
  HomeFlashSale,
  TopCategoriesCard,
  HomeProducts,
  Testimonials,
  Partners,
  Statistic,
  // HowItWorks,
  BlogPreview,
  Newsletter,
  CTA,
} from "@/components/homeSections";

const Home = () => {
  return (
    <>
      {/* ১. হিরো ব্যানার */}
      <Header />

      {/* ২. পার্টনার লোগো স্লাইডার (হিরোর ঠিক নিচে ভালো দেখায়) */}
      <Partners />

      <Container>
        <div className="space-y-24 py-16">
          {/* ৩. স্টোরের বিশেষত্ব */}
          <Features />

          <Statistic />
          {/* ৪. ক্যাটাগরি গ্রিড */}
          <TopCategoriesCard />

          {/* ৫. অফার সেকশন */}
          <HomeFlashSale />

          {/* ৬. প্রধান পণ্যসমূহ */}
          <HomeProducts />

          {/* ৭. কিভাবে অর্ডার করবেন */}
          {/* <HowItWorks /> */}

          {/* ৮. ক্লায়েন্ট রিভিউ */}
          <Testimonials />

          {/* ৯. ব্লগ বা টিপস */}
          <BlogPreview />
        </div>
      </Container>

      {/* ১০. সাবস্ক্রিপশন বক্স */}
      <Newsletter />

      {/* ১১. কল টু অ্যাকশন */}
      <CTA />

      {/* ১২. ফুটার */}
      <Footer />
    </>
  );
};

export default Home;
