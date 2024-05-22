import Navbar from "@/components/shared/Navbar";
import HomePage from "./home/page";
import Container from "@/components/shared/Container";
import Header from "@/components/shared/Header";
import TopCategoriesCard from "@/components/ui/TopCategoriesCard";
import Products from "./products/page";
import Footer from "@/components/shared/Footer";
import HomeFlashSale from "@/components/homeFlashSale/HomeFlashSale";
import HomeProducts from "@/components/homeProducts/HomeProducts";

const Home = () => {
  return (
    <>
      <Container>
        {/* <Navbar /> */}
        <Header />
        <HomeFlashSale />
        {/* <HomePage /> */}
        <TopCategoriesCard />
        {/* <Products /> */}
        <HomeProducts />
        <Footer />
      </Container>
    </>
  );
};

export default Home;
