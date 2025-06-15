
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const GDPRCCPA = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <Header />
    <main className="flex-1 max-w-3xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardContent className="py-8">
          <CardTitle className="mb-4">GDPR / CCPA Compliance</CardTitle>
          <div className="text-lg text-gray-700 space-y-4">
            <p>
              Civora Nexus Pvt Ltd is committed to protecting your privacy and complying with global data privacy regulations such as the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
            </p>
            <p>
              If you have questions about your rights, requests for information access, or deletion, please contact us.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
    <Footer />
  </div>
);

export default GDPRCCPA;
