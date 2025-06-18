import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
const LifeAtCivora = () => {
  return <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="font-bold text-civora-navy mb-8 text-center text-6xl">
          Life at Civora
        </h1>
        <Card>
          <CardContent className="py-8">
            <CardTitle className="mb-4">A Culture of Innovation and Impact</CardTitle>
            <div className="text-lg text-gray-700 space-y-4">
              <p>
                At Civora Nexus, we foster an open and inclusive culture where every voice matters.
                We believe in collaborative growth and making a difference together.
              </p>
              <p>
                Our team enjoys flexibility, purpose-driven work, and the chance to help shape the company from the ground up.
                If you value autonomy and impact, you’ll thrive here!
              </p>
              <p>
                We regularly host remote team events, tech talks, and company-wide brainstorming sessions to keep creativity flowing.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>;
};
export default LifeAtCivora;