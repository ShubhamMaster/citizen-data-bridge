
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Internships = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-civora-navy mb-8 text-center">
          Internships at Civora
        </h1>
        <Card>
          <CardContent className="py-8">
            <CardTitle className="mb-4">Kickstart Your Career With Us</CardTitle>
            <div className="text-lg text-gray-700 space-y-4">
              <p>
                We offer hands-on internships for students and recent graduates who want to learn, grow, and contribute to impactful projects in civic technology.
              </p>
              <p>
                Whether you're interested in engineering, design, or business development, we encourage you to reach out! Internship opportunities are posted on our{" "}
                <Link to="/careers/jobs" className="text-civora-teal underline">Job Openings</Link> page when available.
              </p>
              <p>
                Don’t see a relevant role? You can always send a general internship inquiry via our Careers page.
              </p>
              <div className="pt-4">
                <Button asChild className="bg-civora-teal hover:bg-civora-teal/90 w-full">
                  <Link to="/careers">Go to Careers</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Internships;
