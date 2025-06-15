
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const SalesInquiry = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <Header />
    <main className="flex-1 max-w-3xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardContent className="py-8">
          <CardTitle className="mb-4">Sales Inquiry</CardTitle>
          <div className="text-lg text-gray-700 space-y-4">
            <p>
              Interested in our products or solutions? Tell us what you’re looking for and our team will contact you shortly.
            </p>
            <p>
              Please send your business inquiry using the contact form or email us at <a href="mailto:sales@civoranexus.com" className="text-civora-teal font-semibold underline">sales@civoranexus.com</a>.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
    <Footer />
  </div>
);

export default SalesInquiry;
