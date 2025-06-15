
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const DataSecurity = () => (
  <div className="min-h-screen bg-white flex flex-col">
    <Header />
    <main className="flex-1 max-w-3xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardContent className="py-8">
          <CardTitle className="mb-4">Data Security</CardTitle>
          <div className="text-lg text-gray-700 space-y-4">
            <p>
              Protecting your data is our highest priority. We apply best practices, technical safeguards, and proactive monitoring to keep your data safe.
            </p>
            <p>
              Learn more about our data security protocols, encryption, and compliance measures here.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
    <Footer />
  </div>
);

export default DataSecurity;
