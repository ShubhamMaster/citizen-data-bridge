
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CivicOne() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-civora-teal mb-6">
          CivicOne Portal
        </h1>
        <p className="text-lg text-gray-700 mb-5">
          A unified portal bringing together city services for citizens and administrators.
        </p>
        <div className="text-gray-600">
          {/* Placeholder for product overview, testimonials, etc. */}
          <p>More about CivicOne's capabilities, technology stack, and live deployments will appear here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
