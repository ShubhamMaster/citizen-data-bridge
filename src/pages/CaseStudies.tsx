
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CaseStudies() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-civora-navy mb-6">
          Case Studies
        </h1>
        <p className="text-lg text-gray-700 mb-5">
          Dive into our most impactful client projects and see the results we've achieved together.
        </p>
        <div className="text-gray-600">
          {/* Add featured case studies here */}
          <p>Case study content coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
