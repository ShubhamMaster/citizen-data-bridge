
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const Accessibility = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <Header />
    <main className="flex-1 max-w-3xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardContent className="py-8">
          <CardTitle className="mb-4">Accessibility</CardTitle>
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
