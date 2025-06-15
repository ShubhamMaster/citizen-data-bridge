
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const HelpCenter = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <Header />
    <main className="flex-1 max-w-3xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardContent className="py-8">
          <CardTitle className="mb-4">Help Center</CardTitle>
          <div className="text-lg text-gray-700 space-y-4">
            <p>
              Welcome to the Civora Nexus Help Center. Here you can find frequently asked questions, documentation, and resources to troubleshoot common issues.
            </p>
            <p>
              Need further assistance? Contact our support team directly, or browse our documentation for more information.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
    <Footer />
  </div>
);

export default HelpCenter;
