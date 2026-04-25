import Container from "@/components/shared/Container";
import Footer from "@/components/shared/Footer";
import NavbarTwo from "@/components/shared/NavbarTwo";
import DetailCard from "@/components/ui/DetailCard";

interface id {
  params: {
    id: string;
  };
}

const DetailPage = async ({ params }: id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`,
    {
      cache: "no-store",
    },
  );
  const item = await res.json();
  // console.log(item);
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
