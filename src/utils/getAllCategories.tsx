export const getAllCategories = async () => {
  const res = await fetch(
    "https://cleaning-supplies-store-server.vercel.app/flash-sale"
  );

  return res.json();
};
