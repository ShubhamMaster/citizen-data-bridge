
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function HealthBridge() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-civora-teal mb-6">
          HealthBridge
        </h1>
        <p className="text-lg text-gray-700 mb-5">
          Seamless health information exchange and patient engagement system.
        </p>
        <div className="text-gray-600">
          {/* Placeholder for solution highlights, case studies, integrations, etc. */}
          <p>Explore HealthBridge's modules, healthcare insights, and demo videos.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
