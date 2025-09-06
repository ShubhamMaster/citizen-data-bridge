
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import UniformHeroSection from "@/components/UniformHeroSection";
import JoinInnovationLabForm from "@/components/JoinInnovationLabForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const JoinInnovationLab = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSuccess = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <UniformHeroSection 
          title="Join Our Innovation Lab"
          subtitle="Collaborate on cutting-edge projects and bring your innovative ideas to life"
        />
        
        <div className="container mx-auto px-4 py-16">
          {isSubmitted ? (
            <div className="max-w-2xl mx-auto text-center">
              <Card>
                <CardContent className="pt-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-4">Application Submitted Successfully!</h2>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your interest in joining our Innovation Lab. We've received your application 
                    and will review it within 48 hours. You'll receive a confirmation email shortly with next steps.
                  </p>
                  <Button onClick={handleReset} variant="outline">
                    Submit Another Application
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-3 gap-8 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Collaborative Environment</CardTitle>
                    <CardDescription>Work with like-minded innovators on groundbreaking projects</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Cutting-Edge Technology</CardTitle>
                    <CardDescription>Access to the latest tools and technologies in AI, ML, and more</CardDescription>
                  </CardHeader>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Real-World Impact</CardTitle>
                    <CardDescription>Create solutions that make a difference in people's lives</CardDescription>
                  </CardHeader>
                </Card>
              </div>
              
              <JoinInnovationLabForm onSuccess={handleSuccess} />
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default JoinInnovationLab;
