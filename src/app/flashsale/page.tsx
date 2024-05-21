import Container from "@/components/shared/Container";
import Footer from "@/components/shared/Footer";
import NavbarTwo from "@/components/shared/NavbarTwo";
import FlashSaleCard from "@/components/ui/FlashSaleCard";
import { Product } from "@/types";

import React from "react";

export const metadata = {
  title: "Flash Sale",
};

const FlashSale = async () => {
  const res = await fetch(
    "https://cleaning-supplies-store-server.vercel.app/flash-sale"
  );
  const { data: flashSaleCleaningSupplies } = await res.json();
  console.log(flashSaleCleaningSupplies);
  // const flashSaleCleaningSupplies = [
  //   {
  //     id: 1,
  //     image:
  //       "https://ncdsdental.com/wp-content/uploads/2020/04/A2318-LYSOL-SPRAY.jpg",
  //     title: "Lysol Disinfectant Spray",
  //     originalPrice: 5.99,
  //     salePrice: 3.99,
  //     ratings: 4.8,
  //     brandCategory: "Lysol / Disinfectants",
  //     description:
  //       "Lysol Disinfectant Spray kills 99.9% of viruses and bacteria, providing effective protection for your family. Suitable for hard surfaces, it eliminates germs and helps control the spread of illnesses. The crisp linen scent leaves your home smelling fresh and clean. Ideal for use in kitchens, bathrooms, and other high-touch areas.",
  //   },
  //   {
  //     id: 2,
  //     image:
  //       "https://images.thdstatic.com/productImages/712c8d07-63c8-4668-9063-04f67f94fbc0/svn/clorox-concrete-cleaners-4460032437-64_1000.jpg",
  //     title: "Clorox Bleach",
  //     originalPrice: 3.99,
  //     salePrice: 2.49,
  //     ratings: 4.7,
  //     brandCategory: "Clorox / Bleach",
  //     description:
  //       "Clorox Bleach is a powerful disinfectant and whitening agent that is perfect for laundry and household cleaning. It kills 99.9% of germs, including bacteria and viruses. Use it to remove tough stains, sanitize surfaces, and keep your whites bright. Safe for use on various surfaces including countertops, floors, and bathroom fixtures.",
  //   },
  //   {
  //     id: 3,
  //     image:
  //       "https://images.ctfassets.net/jghi3f9eg66v/5SJjiG6MyTKnz6j5sw1saK/f760d9025d9093628be2201481452d3a/Swiffer-WetJet-Wood-OHB.jpg?fm=webp&q=30",
  //     title: "Swiffer WetJet Mop Starter Kit",
  //     originalPrice: 29.99,
  //     salePrice: 19.99,
  //     ratings: 4.5,
  //     brandCategory: "Swiffer / Floor Cleaners",
  //     description:
  //       "The Swiffer WetJet Mop Starter Kit is an all-in-one mopping system that makes cleaning floors easy and efficient. The dual-nozzle sprayer and absorbent pad lift and trap dirt, ensuring a thorough clean. The kit includes a mop, cleaning solution, and pads, all designed to be safe on finished wood, tile, and laminate floors.",
  //   },
  //   {
  //     id: 4,
  //     image:
  //       "https://i5.walmartimages.com/asr/bdde193e-9d07-407e-92b9-788dbed5244a.67a6c397c2aeb081117569dd2e3b73bd.jpeg",
  //     title: "Mr. Clean Magic Eraser",
  //     originalPrice: 4.49,
  //     salePrice: 2.99,
  //     ratings: 4.6,
  //     brandCategory: "Mr. Clean / Sponges",
  //     description:
  //       "Mr. Clean Magic Eraser removes tough stains and grime with just water, no harsh chemicals needed. Its micro-scrubbers penetrate surface grooves to clean deeply and effectively. Perfect for removing scuff marks, crayon, and dirt from walls, floors, and other surfaces. A must-have for quick and easy household cleaning.",
  //   },
  //   {
  //     id: 5,
  //     image:
  //       "https://m.media-amazon.com/images/I/81uJKaVHOKL._AC_UF350,350_QL80_.jpg",
  //     title: "Dawn Dish Soap",
  //     originalPrice: 2.99,
  //     salePrice: 1.99,
  //     ratings: 4.9,
  //     brandCategory: "Dawn / Dishwashing",
  //     description:
  //       "Dawn Dish Soap is renowned for its grease-fighting power. This concentrated formula cuts through tough grease and grime, leaving your dishes sparkling clean. It's gentle on your hands, making it ideal for daily dishwashing. Also versatile for cleaning other surfaces such as countertops and sinks.",
  //   },
  //   {
  //     id: 6,
  //     image:
  //       "https://mobileimages.lowes.com/productimages/f1652606-cfea-402c-8afa-d495c7ea70f7/63377058.jpg?size=cdp",
  //     title: "Windex Glass Cleaner",
  //     originalPrice: 3.49,
  //     salePrice: 2.29,
  //     ratings: 4.8,
  //     brandCategory: "Windex / Glass Cleaners",
  //     description:
  //       "Windex Glass Cleaner provides a streak-free shine for windows, mirrors, and other glass surfaces. Its ammonia-free formula cuts through grease and grime without leaving any residue. Perfect for use on indoor and outdoor glass, chrome, and stainless steel surfaces. Leaves your home with a fresh, clean scent.",
  //   },
  //   {
  //     id: 7,
  //     image: "https://m.media-amazon.com/images/I/81+MtOCthHL.jpg",
  //     title: "Pledge Furniture Polish",
  //     originalPrice: 5.49,
  //     salePrice: 3.49,
  //     ratings: 4.7,
  //     brandCategory: "Pledge / Furniture Polish",
  //     description:
  //       "Pledge Furniture Polish enhances the beauty of your wood furniture with a protective and nourishing formula. It removes dust and fingerprints while leaving a brilliant shine and a fresh lemon scent. Suitable for use on finished, sealed surfaces, including wood, leather, and stainless steel.",
  //   },
  //   {
  //     id: 8,
  //     image:
  //       "https://online.citysuper.com.hk/cdn/shop/products/301403891-1_bounty_advanced_select-A-paper_towel.jpg?v=1653995555",
  //     imageTwo:
  //       "https://voila.ca/images-v3/2d92d19c-0354-49c0-8a91-5260ed0bf531/ba42f63c-6065-41aa-ac1f-42c5ae4eb32c/500x500.jpg",
  //     imageThree:
  //       "https://i5.walmartimages.com/asr/5de1e62b-0a04-421a-8c64-22d04d59ad32.066e408e3efcea07cdf432b424673955.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
  //     imageFour:
  //       "https://i5.walmartimages.com/seo/Bounty-Full-Sheet-Paper-Towels-White-86-sheets-roll-12-Count_05f7c7df-e183-43c3-8186-6c66e619af76.85f79987bc787294c7a472a9729eb674.jpeg",
  //     title: "Bounty Paper Towels",
  //     originalPrice: 7.99,
  //     salePrice: 5.49,
  //     ratings: 4.8,
  //     brandCategory: "Bounty / Paper Towels",
  //     description:
  //       "Bounty Paper Towels are 2x more absorbent, allowing you to clean up spills quickly and efficiently. Each sheet is designed to handle tough messes with ease. Ideal for kitchen use, household cleaning, and even as a napkin or placemat. Durable and long-lasting, making it a great value for your money.",
  //   },
  //   {
  //     id: 9,
  //     image:
  //       "https://methodhome.com.my/cdn/shop/products/1386676561_3_pic_580x.jpg?v=1678768617",
  //     imageTwo:
  //       "https://images.thdstatic.com/productImages/bc61aed7-abd3-48a7-bc8f-781d040609ba/svn/method-all-purpose-cleaners-317936-66_600.jpg",
  //     imageThree:
  //       "https://www.earthmother.ie/user/products/large/Method-Antibacterial-All-Purpose-Cleaner-Wild-Rhubarb.jpg",
  //     imageFour:
  //       "https://cdn11.bigcommerce.com/s-d7wmc7b75m/images/stencil/1280x1280/products/343/2549/52682_APC_28oz_Clementine_FRONT_317926_Orange__19746__60831.1706652947.jpg?c=2",
  //     title: "Method All-Purpose Cleaner",
  //     originalPrice: 3.99,
  //     salePrice: 2.49,
  //     ratings: 4.6,
  //     brandCategory: "Method / All-Purpose Cleaners",
  //     description:
  //       "Method All-Purpose Cleaner is a non-toxic, plant-based formula that effectively cleans and deodorizes a variety of surfaces. The fresh citrus scent leaves your home smelling clean and invigorating. Safe for use on countertops, tile, stone, wood, and glass. Eco-friendly and biodegradable.",
  //   },
  //   {
  //     id: 10,
  //     image:
  //       "https://www.familyhandyman.com/wp-content/uploads/2023/09/O-Cedar-Spin-Mop_ecomm_via-walmart.com_.jpg?fit=680%2C680",
  //     imageTwo:
  //       "https://images.thdstatic.com/productImages/952925a1-8d36-46b5-987f-be7851438b13/svn/o-cedar-string-mops-148473xb3-64_1000.jpg",
  //     imageThree:
  //       "https://www.ocedar.com/medias/VC-Prod-Sell-Slot-null?context=bWFzdGVyfHJvb3R8NzkxMjN8aW1hZ2UvanBlZ3xhREk1TDJnNE1DODVOVGs0TURZd01EQXpNelU0TDFaRFgxQnliMlJmVTJWc2JGOVRiRzkwWDI1MWJHd3w4M2I3NWUxNTFiMDhlMjY0ODBjZjVjMzMwNWVhZjU1ZGQ1OTg3MzhlODMwYTdmZmY2NjkyNDQ0NGFiOTg3ZWVl",
  //     imageFour:
  //       "https://images-cdn.ubuy.co.in/661099e3b8ecf1271f762254-o-cedar-easywring-rinseclean-spin-mop.jpg",
  //     title: "O-Cedar Spin Mop",
  //     originalPrice: 39.99,
  //     salePrice: 29.99,
  //     ratings: 4.7,
  //     brandCategory: "O-Cedar / Mops",
  //     description:
  //       "The O-Cedar Spin Mop makes floor cleaning a breeze with its hands-free wringing system. The foot pedal allows for easy control of moisture levels. The microfiber mop head is machine washable and effective in removing dirt and grime. Safe for all floor types including hardwood, tile, and laminate.",
  //   },
  //   {
  //     id: 11,
  //     image: "https://m.media-amazon.com/images/I/71oMw12QPwL.jpg",
  //     imageTwo:
  //       "https://images-cdn.ubuy.co.in/65dc4b443d50b65e2b6c257a-scrubbing-bubbles-bathroom-grime-fighter.jpg",
  //     imageThree:
  //       "https://dsom-imager-prod.shipt.com/80874745-27/d2e195ed228adad7cd7ca806aa6ba855.jpeg",
  //     imageFour:
  //       "https://i5.walmartimages.com/seo/Scrubbing-Bubbles-Dissolve-Concentrated-Pod-Bathroom-Cleaner-Starter-K-Each_827e2ab5-5054-4bca-bc51-df9e68593316.da2bbab2b6cd863e10b8ea7f0c5e3faf.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",

  //     title: "Scrubbing Bubbles Bathroom Cleaner",
  //     originalPrice: 4.99,
  //     salePrice: 3.49,
  //     ratings: 4.7,
  //     brandCategory: "Scrubbing Bubbles / Bathroom Cleaners",
  //     description:
  //       "Scrubbing Bubbles Bathroom Cleaner penetrates and lifts dirt to clean thoroughly. It is highly effective on soap scum, mold, and mildew stains. The powerful foaming action clings to surfaces for a deep clean. Safe for use on bathroom tiles, tubs, showers, and sinks.",
  //   },
  //   {
  //     id: 12,
  //     image:
  //       "https://hoover.ca/cdn/shop/files/AH31932CA_ATF_1_Hero.jpg?v=1699995614",
  //     imageTwo: "https://m.media-amazon.com/images/I/61q5DxnexvL.jpg",
  //     imageThree:
  //       "https://hoover.ca/cdn/shop/files/AH31959_ATF_1_Hero.jpg?v=1698086717&width=1946",
  //     imageFour:
  //       "https://i5.walmartimages.ca/images/Enlarge/054/377/6000204054377.jpg",
  //     title: "Hoover Carpet Cleaner Solution",
  //     originalPrice: 19.99,
  //     salePrice: 14.99,
  //     ratings: 4.6,
  //     brandCategory: "Hoover / Carpet Cleaners",
  //     description:
  //       "Hoover Carpet Cleaner Solution deep cleans and deodorizes your carpets, leaving them fresh and free of dirt. Suitable for all carpet cleaning machines, it effectively removes stains and odors. Its powerful formula ensures your carpets look clean and smell pleasant.",
  //   },
  //   {
  //     id: 13,
  //     image:
  //       "https://www.seventhgeneration.ca/sk-eu/content/dam/brands/seventh_generation/global_use/1642394-22704fr-3-seventh-generation-toilet-bowl-cleaner-32oz-r3.jpg.rendition.767.767.jpg",
  //     imageTwo: "https://m.media-amazon.com/images/I/81fvMR16y6L.jpg",
  //     imageThree:
  //       "https://www.sustainablesupply.com/cdn/shop/products/606095_800x.jpg?v=1601591996",
  //     imageFour:
  //       "https://media.nedigital.sg/fairprice/fpol/media/images/product/XL/90118665_XL1_20220113.jpg",
  //     title: "Seventh Generation Toilet Bowl Cleaner",
  //     originalPrice: 3.49,
  //     salePrice: 2.29,
  //     ratings: 4.5,
  //     brandCategory: "Seventh Generation / Toilet Cleaners",
  //     description:
  //       "Seventh Generation Toilet Bowl Cleaner uses a non-toxic, biodegradable formula to clean and deodorize your toilet. It removes tough stains and mineral deposits without harsh chemicals. The botanical scent provides a pleasant cleaning experience. Safe for septic systems.",
  //   },
  //   {
  //     id: 14,
  //     image:
  //       "https://images-cdn.ubuy.ae/64cb1e66fd001133fb20db79-febreze-odor-fighting-air-freshener.jpg",
  //     imageTwo:
  //       "https://images-cdn.ubuy.co.in/65c46b99bd4fb975441fb546-febreze-air-effects-air-freshener.jpg",
  //     imageThree:
  //       "https://static-01.daraz.com.bd/p/20d6a3193b63583c29dff7b0a2a30f6c.jpg",
  //     imageFour: "https://m.media-amazon.com/images/I/61O+uArhtVL.jpg",
  //     title: "Febreze Air Freshener",
  //     originalPrice: 4.99,
  //     salePrice: 3.49,
  //     ratings: 4.8,
  //     brandCategory: "Febreze / Air Fresheners",
  //     description:
  //       "Febreze Air Freshener eliminates odors and freshens the air with a variety of pleasant scents. Perfect for use in any room, it leaves your home smelling clean and inviting. Safe for daily use, it contains no heavy perfumes or harmful chemicals.",
  //   },
  //   {
  //     id: 15,
  //     image:
  //       "https://i5.walmartimages.com/seo/Tide-Plus-Bleach-Alternative-Original-Scent-Liquid-Laundry-Detergent-92-oz-59-loads_3c92a534-41ce-45fd-ad8b-62bce1fd6bcf_1.6f919ab989679cb5dcb4fc456a67a5e9.jpeg",
  //     imageTwo:
  //       "https://images.ctfassets.net/ajjw8wywicb3/7zqaoKxOoCOpqBYMWX1st1/5e81a386d48da502ea683d560ea2f5e6/Tide_Sully_OXI_hero_SP_748x748.jpg?fm=png",
  //     imageThree:
  //       "https://www.ubuy.co.it/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvODFpbE5nSnJyOUwuX1NMMTUwMF8uanBn.jpg",
  //     imageFour:
  //       "https://images.ctfassets.net/snqjgnra1eqk/qXFFyubevlVJ6YlFgzsaz/432e7868b12c91cd8448a4e349caa963/Tide_Free___Gentle_HDL_HE_hero_SP_748x748.jpg?fm=png",
  //     title: "Tide Laundry Detergent",
  //     originalPrice: 11.99,
  //     salePrice: 8.99,
  //     ratings: 4.9,
  //     brandCategory: "Tide / Laundry Detergents",
  //     description:
  //       "Tide Laundry Detergent provides powerful cleaning with advanced stain removal technology. Suitable for all wash cycles, it leaves your clothes clean and smelling fresh. Effective in both cold and hot water. Perfect for everyday laundry and tough stains.",
  //   },
  //   {
  //     id: 16,
  //     image:
  //       "https://i5.walmartimages.com/seo/Scotch-Brite-Heavy-Duty-Scrub-Sponges-3-Scrubbing-Sponges_fe991915-3d90-440d-8cba-4f2280a954eb.1c49bbb2490efa752e9462c6aeb50eaf.jpeg",
  //     imageTwo:
  //       "https://d2t3trus7wwxyy.cloudfront.net/catalog/product/cache/d166c7ea81ddc4172de536322110c911/s/c/scoth-brite-heavy-duty-scrub-sponge-value-pack-3s_2.jpg",
  //     imageThree:
  //       "https://m.media-amazon.com/images/I/71WzaXp+lPL._AC_UF1000,1000_QL80_DpWeblab_.jpg",
  //     imageFour: "https://content.etilize.com/images/900/1059490291.jpg",
  //     title: "Scotch-Brite Heavy Duty Scrub Sponges",
  //     originalPrice: 6.99,
  //     salePrice: 4.99,
  //     ratings: 4.7,
  //     brandCategory: "Scotch-Brite / Sponges",
  //     description:
  //       "Scotch-Brite Heavy Duty Scrub Sponges are ideal for tough, baked-on messes. The durable scrubber side effectively removes grime, while the sponge side wipes surfaces clean. Long-lasting and versatile, perfect for kitchen, bathroom, and outdoor cleaning tasks.",
  //   },
  // ];
  return (
    <Container>
      <NavbarTwo />
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:ml-[150px] lg:mr-[150px] mx-auto">
        {flashSaleCleaningSupplies.map((item: Product) => (
          <FlashSaleCard key={item._id} item={item}></FlashSaleCard>
        ))}
      </div>
      <Footer />
    </Container>
  );
};

export default FlashSale;
