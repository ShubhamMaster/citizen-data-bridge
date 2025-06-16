
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Partners() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-civora-navy to-civora-navy/90 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">Our Partners</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Building strong partnerships to create meaningful impact in communities and healthcare sectors.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-3xl mx-auto py-20 px-4">
        <div className="text-lg text-gray-700 space-y-4">
          <p>
            At Civora Nexus, we believe in the power of collaboration. Our partnerships with governments, 
            NGOs, healthcare institutions, and technology providers enable us to deliver comprehensive solutions 
            that address real-world challenges.
          </p>
          <p>
            We are actively building relationships with key stakeholders in the civic and healthcare technology space. 
            Information about our strategic partnerships will be updated here as they develop.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
