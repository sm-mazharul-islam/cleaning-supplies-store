import Container from "@/components/shared/Container";
import Footer from "@/components/shared/Footer";
import NavbarTwo from "@/components/shared/NavbarTwo";
import DetailCard from "@/components/ui/DetailCard";

interface DetailPageProps {
  params: Promise<{ id: string }>;
}

const DetailPage = async ({ params }: DetailPageProps) => {
  // ১. Next.js 15+ এর নিয়ম অনুযায়ী params আনর্যাপ করা
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  // ২. এপিআই ফেচিং (কানেকশন নিশ্চিত করতে লোকাল আইপি ব্যবহার)
  const fetchUrl = `http://localhost:5000/api/v1/products/${productId}`;

  try {
    const res = await fetch(fetchUrl, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Fetch failed");

    const result = await res.json();
    const item = result?.data || result;

    if (!item || !item._id) {
      return (
        <div className="min-h-screen flex flex-col transition-colors duration-500">
          <Container>
            <NavbarTwo />
            <div className="py-24 text-center">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                Product <span className="text-blue-600">Not Found!</span>
              </h2>
            </div>
          </Container>
          <div className="mt-auto">
            <Footer />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen transition-colors duration-500">
        <Container>
          {/* ন্যাভবার */}
          <NavbarTwo />

          <main className="py-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* হেডিং সেকশন (Text color matches layout theme) */}
            <div className="mb-10 px-2">
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-3 block">
                Premium Inventory
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
                {item.title}
              </h1>
              <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full"></div>
            </div>

            {/* প্রোডাক্ট কার্ড (Border & Shadow adjustments for dark mode) */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <DetailCard item={item} />
            </div>
          </main>

          <Footer />
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Connection Error:", error);
    return (
      <div className="min-h-screen flex flex-col">
        <Container>
          <NavbarTwo />
          <div className="py-24 text-center">
            {/* Error UI with minimal background for contrast */}
            <div className="inline-block p-12 bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-[3rem]">
              <h2 className="text-3xl font-black text-red-600 uppercase tracking-tighter italic">
                Sync{" "}
                <span className="text-slate-900 dark:text-white">Error!</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-4 font-medium">
                Unable to establish a secure connection with the server.
              </p>
              <p className="text-[10px] text-red-400 mt-2 font-mono uppercase tracking-widest opacity-50">
                Check Backend @ {fetchUrl}
              </p>
            </div>
          </div>
        </Container>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    );
  }
};

export default DetailPage;
