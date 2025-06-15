
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const ISO = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <Header />
    <main className="flex-1 max-w-3xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardContent className="py-8">
          <CardTitle className="mb-4">ISO Certifications</CardTitle>
          <div className="text-lg text-gray-700 space-y-4">
            <p>
              Civora Nexus follows international standards for data security, privacy, and quality. Our commitment to ISO certifications underlines our dedication to security and operational excellence.
            </p>
            <p>
              Details about our certifications will be updated here as they become available.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
    <Footer />
  </div>
);

export default ISO;
