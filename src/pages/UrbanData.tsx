
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function UrbanData() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-civora-teal mb-6">
          Urban Data Insight
        </h1>
        <p className="text-lg text-gray-700 mb-5">
          Data analytics platform for smarter urban planning and traffic management.
        </p>
        <div className="text-gray-600">
          {/* Placeholder for data visualizations, urban impact, partners, etc. */}
          <p>Urban Data Insight will feature platform analytics, sample reports, and city success stories.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
