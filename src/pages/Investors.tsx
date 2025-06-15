
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Investors() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-3xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-bold text-civora-navy mb-6">Investors</h1>
        <p className="text-xl text-gray-700">Learn about our investors who enable our mission and growth.</p>
      </main>
      <Footer />
    </div>
  );
}
