

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CorporateResponsibility() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-civora-navy mb-4">Corporate Responsibility</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our dedication to ethical practices and responsible governance in everything we do.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-3xl mx-auto py-20 px-4">
        <div className="text-lg text-gray-700 space-y-4">
          <p>
            At Civora Nexus, corporate responsibility is at the heart of our business model. We are committed 
            to operating with integrity, transparency, and accountability in all our endeavors.
          </p>
          <p>
            Our approach to corporate responsibility encompasses ethical business practices, environmental 
            sustainability, community engagement, and responsible technology development that prioritizes 
            user privacy and data security.
          </p>
          <p>
            We believe that technology should serve humanity and contribute to building a more equitable 
            and sustainable future for all communities.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

