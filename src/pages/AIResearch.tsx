
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AIResearch() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-civora-navy mb-6">AI Research</h1>
        <p className="text-lg text-gray-700 mb-5">
          Discover our AI research projects and breakthroughs in civic, urban, and social technology.
        </p>
        <div className="text-gray-600">
          <p>AI research highlights coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
