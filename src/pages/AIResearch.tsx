import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function AIResearch() {
  return <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto py-16 px-4">
        <h1 className="font-bold text-civora-navy mb-6 text-center text-6xl">AI Research</h1>
        <p className="text-lg mb-5 text-center text-gray-600">
          Discover our AI research projects and breakthroughs in civic, urban, and social technology.
        </p>
        <div className="text-gray-600">
          <p className="text-center">AI research highlights coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>;
}