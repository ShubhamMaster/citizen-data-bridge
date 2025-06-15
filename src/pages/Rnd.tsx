
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Rnd() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-civora-navy mb-6">R&amp;D</h1>
        <p className="text-lg text-gray-700 mb-5">
          Explore our ongoing Research &amp; Development initiatives that drive the next generation of civic technology.
        </p>
        <div className="text-gray-600">
          <p>More about R&amp;D at Civora Nexus coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
