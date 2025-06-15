
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function BoardOfDirectors() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-3xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-bold text-civora-navy mb-6">Board of Directors</h1>
        <p className="text-xl text-gray-700">Our esteemed Board of Directors ensures strategic direction and oversight for Civora Nexus Pvt Ltd.</p>
      </main>
      <Footer />
    </div>
  );
}
