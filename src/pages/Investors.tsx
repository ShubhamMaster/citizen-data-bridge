

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Investors() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-civora-navy mb-4">Our Investors</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Backed by visionary investors who share our commitment to transforming civic and healthcare technology.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-3xl mx-auto py-20 px-4">
        <div className="text-lg text-gray-700 space-y-4">
          <p>
            As a new venture, Civora Nexus is seeking strategic investors who understand the importance of 
            civic technology and healthcare innovation. We are looking for partners who share our vision 
            of creating scalable, impactful solutions for communities.
          </p>
          <p>
            For investment opportunities and partnership inquiries, please contact us through our official channels. 
            We welcome discussions with investors who are passionate about social impact and technology innovation.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

