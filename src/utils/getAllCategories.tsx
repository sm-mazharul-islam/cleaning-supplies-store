export const getAllCategories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/flash-sale`);

  return res.json();
};
