
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Automation() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-bold text-civora-navy mb-6">Automation</h1>
        <p className="text-xl text-gray-700">Streamline workflows and boost productivity with advanced automation tools.</p>
      </main>
      <Footer />
    </div>
  );
}
