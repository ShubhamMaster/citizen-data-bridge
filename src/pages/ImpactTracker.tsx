
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ImpactTracker() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-civora-teal mb-6">
          NGO Impact Tracker
        </h1>
        <p className="text-lg text-gray-700 mb-5">
          A suite for NGOs to measure, showcase, and increase their social impact.
        </p>
        <div className="text-gray-600">
          {/* Placeholder for demo videos, analytics, testimonials, etc. */}
          <p>The Impact Tracker page will display NGO stories, dashboards, and sample reports here.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
