import { TProduct } from "@/types";
import Image from "next/image";

const DetailCard = ({ item }: { item: TProduct }) => {
  const {
    _id,
    title,
    description,
    image,
    originalPrice,
    salePrice,
    rating,
    brand,
    longDescription,
  } = item;
  console.log(item);

  return (
    <div>
      <div>
        <div className="hero  bg-base-100 ">
          <div className="hero-content flex-col lg:flex-row">
            <div>
              <div>
                <Image
                  src={image}
                  width={500}
                  height={500}
                  style={{ width: "488px", height: "565px" }}
                  alt=""
                />
              </div>
            </div>
            {/* <div className="rating">
              <input
                type="radio"
                value={rating}
                name="rating-2"
                className="mask mask-star-2 bg-orange-400"
              />
            </div> */}

            <div className="m-9">
              <h1 className="text-5xl font-bold">{title}</h1>
              <p className="py-2">Write your comment</p>
              <div className="card-actions  justify-start text-center">
                <del className="text-xl font-bold">${originalPrice}</del>
                <p className="px-4 text-xl font-bold">${salePrice}</p>
              </div>
              <p className="py-4 text-xl">{description}</p>
              <h1 className="text-orange-500">{brand}*</h1>
              <p className="py-2 ">
                {" "}
                Quantity:
                <button className="btn btn-outline p-3 border-2 m-2 ">+</button>
                <span className="p-3 border-2">1</span>
                <button className="btn btn-outline p-3 border-2 m-2">-</button>
              </p>

              <button className="btn btn-outline  my-2">Add To Cart</button>
              <br />
              <button className="btn btn-outline  my-2">Add To Wishlist</button>
              <br />
              <button className="btn btn-outline  my-2">Ask a Question</button>
            </div>
          </div>
        </div>
      </div>
      <h1 className="p-2 card shadow bg-base-100 m-10">{longDescription}</h1>
    </div>
  );
};

export default DetailCard;
