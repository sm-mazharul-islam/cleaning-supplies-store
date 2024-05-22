import DetailCard from "@/components/ui/DetailCard";
import { Product } from "@/types";

interface FsId {
  params: {
    fsId: string;
  };
}

const FlashSaleDetail = async ({ params }: FsId) => {
  console.log(params);
  const res = await fetch(
    `https://cleaning-supplies-store-server.vercel.app/flash-sale/${params.fsId}`,
    {
      cache: "no-store",
    }
  );
  const item = await res.json();
  console.log(item);
  return (
    <div>
      <DetailCard key={item._id} item={item} />
    </div>
  );
};

export default FlashSaleDetail;
