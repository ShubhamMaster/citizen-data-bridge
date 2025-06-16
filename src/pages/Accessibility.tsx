
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const Accessibility = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <Header />
    
    {/* Hero Section */}
    <section className="bg-gradient-to-br from-civora-navy to-civora-navy/90 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Accessibility</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Committed to digital accessibility for all users through inclusive design and continuous improvement.
          </p>
        </div>
      </div>
    </section>

    <main className="flex-1 max-w-3xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardContent className="py-8">
          <div className="text-lg text-gray-700 space-y-4">
            <p>
              Civora Nexus is committed to digital accessibility for all users. We continually improve our platform to meet accessibility standards and provide an inclusive experience.
            </p>
            <p>
              If you encounter any accessibility barriers, please let us know, so we can improve further.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
    <Footer />
  </div>
);

export default Accessibility;
