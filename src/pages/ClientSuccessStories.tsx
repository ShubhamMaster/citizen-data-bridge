
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ClientSuccessStories() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-civora-navy mb-6">
          Client Success Stories
        </h1>
        <p className="text-lg text-gray-700 mb-5">
          Real-world outcomes from our clients who have benefited from Civora Nexus solutions.
        </p>
        <div className="text-gray-600">
          {/* Add client stories here */}
          <p>Success stories coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
