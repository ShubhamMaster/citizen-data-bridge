import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function BoardOfDirectors() {
  return <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-civora-navy to-civora-navy/90 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-gray-950">Board of Directors</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              Our esteemed Board of Directors ensures strategic direction and oversight for Civora Nexus Pvt Ltd.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-3xl mx-auto py-20 px-4">
        <div className="text-lg text-gray-700 space-y-4">
          <p>
            Our Board of Directors brings together decades of experience in technology, governance, and social impact. 
            They provide strategic guidance and ensure our commitment to ethical practices and sustainable growth.
          </p>
          <p>
            Detailed information about our board members will be updated here as we continue to build our leadership structure.
          </p>
        </div>
      </main>
      <Footer />
    </div>;
}