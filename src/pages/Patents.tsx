import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function Patents() {
  return <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto py-16 px-4">
        <h1 className="font-bold text-civora-navy mb-6 text-center text-6xl">Patents</h1>
        <p className="text-lg text-gray-700 mb-5 text-center">
          Browse our portfolio of patents and innovative solutions protecting our civic technology.
        </p>
        <div className="text-gray-600">
          <p className="text-center">Patent listings will be published soon.</p>
        </div>
      </main>
      <Footer />
    </div>;
}