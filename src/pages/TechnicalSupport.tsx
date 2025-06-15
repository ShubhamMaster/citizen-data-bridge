
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const TechnicalSupport = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <Header />
    <main className="flex-1 max-w-3xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardContent className="py-8">
          <CardTitle className="mb-4">Technical Support</CardTitle>
          <div className="text-lg text-gray-700 space-y-4">
            <p>
              Experiencing technical issues or need product support? Our team is here to help.
            </p>
            <p>
              Reach out to us describing your issue and a support engineer will assist you soon.
            </p>
            <p>
              For urgent queries, email <a href="mailto:support@civoranexus.com" className="text-civora-teal font-semibold underline">support@civoranexus.com</a>.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
    <Footer />
  </div>
);

export default TechnicalSupport;
