
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function SmartVillage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-2xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-civora-teal mb-6">
          Smart Village Platform
        </h1>
        <p className="text-lg text-gray-700 mb-5">
          Empowering rural communities with digital solutions for education, health, and governance.
        </p>
        <div className="text-gray-600">
          {/* Placeholder for feature list, images, case studies, etc. */}
          <p>This page will detail the Smart Village Platform, its features, impact, and client stories.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
