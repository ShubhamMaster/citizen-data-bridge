import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function Rnd() {
  return <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto py-16 px-4">
        <h1 className="font-bold text-civora-navy mb-6 text-center text-6xl">R&amp;D</h1>
        <p className="text-lg text-gray-700 mb-5 text-center">
          Explore our ongoing Research &amp; Development initiatives that drive the next generation of civic technology.
        </p>
        <div className="text-gray-600">
          <p className="text-center">More about R&amp;D at Civora Nexus coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>;
}