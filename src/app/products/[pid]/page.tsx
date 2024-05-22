import Container from "@/components/shared/Container";
import Footer from "@/components/shared/Footer";
import NavbarTwo from "@/components/shared/NavbarTwo";
import DetailCard from "@/components/ui/DetailCard";

interface PId {
  params: {
    pid: string;
  };
}

const DetailPage = async ({ params }: PId) => {
  const res = await fetch(
    `https://cleaning-supplies-store-server.vercel.app/products/${params.pid}`,
    {
      cache: "no-store",
    }
  );
  const item = await res.json();
  console.log(item);
  return (
    <div>
      <Container>
        <NavbarTwo />
        <DetailCard key={item._id} item={item} />
        <Footer />
      </Container>
    </div>
  );
};

export default DetailPage;
