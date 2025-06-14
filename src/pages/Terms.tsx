
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, Users, Lock, Mail, AlertCircle } from "lucide-react";

const Terms = () => {
  const sections = [
    {
      icon: <FileText className="w-6 h-6 text-civora-teal" />,
      title: "1. Acceptance of Terms",
      content: "By accessing and using the Civora Nexus website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
    },
    {
      icon: <Shield className="w-6 h-6 text-civora-teal" />,
      title: "2. Use License",
      content: "Permission is granted to temporarily download one copy of the materials on Civora Nexus's website for personal, non-commercial transitory viewing only.",
      list: [
        "modify or copy the materials",
        "use the materials for any commercial purpose or for any public display",
        "attempt to reverse engineer any software contained on the website",
        "remove any copyright or other proprietary notations from the materials"
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-civora-teal" />,
      title: "3. Disclaimer",
      content: "The materials on Civora Nexus's website are provided on an 'as is' basis. Civora Nexus makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
    },
    {
      icon: <Lock className="w-6 h-6 text-civora-teal" />,
      title: "4. Limitations",
      content: "In no event shall Civora Nexus or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Civora Nexus's website, even if Civora Nexus or a Civora Nexus authorized representative has been notified orally or in writing of the possibility of such damage."
    },
    {
      icon: <Users className="w-6 h-6 text-civora-teal" />,
      title: "5. Privacy Policy",
      content: "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using our service, you agree to the collection and use of information in accordance with our Privacy Policy."
    },
    {
      icon: <Mail className="w-6 h-6 text-civora-teal" />,
      title: "6. Contact Information",
      content: "If you have any questions about these Terms of Service, please contact us at",
      contactEmail: "civoranexus@gmail.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-civora-navy via-civora-navy/95 to-civora-navy/90 text-white py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-civora-teal/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-civora-teal/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-civora-teal/20 rounded-full backdrop-blur-sm border border-civora-teal/30">
              <FileText className="w-8 h-8 text-civora-teal" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-civora-teal to-cyan-400">Service</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully before using our services. 
            Your trust and transparency are fundamental to our relationship.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-civora-teal">
            <div className="w-2 h-2 bg-civora-teal rounded-full"></div>
            <span>Last updated: December 2024</span>
            <div className="w-2 h-2 bg-civora-teal rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction Card */}
          <div className="mb-12 p-8 bg-gradient-to-r from-civora-teal/5 to-cyan-50 rounded-2xl border border-civora-teal/20">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-civora-teal/20 rounded-lg">
                <Shield className="w-6 h-6 text-civora-teal" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-civora-navy mb-2">Important Notice</h3>
                <p className="text-gray-600 leading-relaxed">
                  These Terms of Service constitute a legally binding agreement between you and Civora Nexus Pvt. Ltd. 
                  By using our platform, you acknowledge that you have read, understood, and agree to be bound by these terms.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-white to-gray-50/50 border-b border-gray-100">
                  <CardTitle className="flex items-center gap-4 text-civora-navy">
                    <div className="p-2 bg-civora-teal/10 rounded-lg">
                      {section.icon}
                    </div>
                    <span className="text-xl lg:text-2xl">{section.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 lg:p-8">
                  <div className="text-gray-600 leading-relaxed space-y-4">
                    <p className="text-base lg:text-lg">{section.content}</p>
                    
                    {section.list && (
                      <div className="mt-4">
                        <p className="font-medium text-civora-navy mb-3">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                        <ul className="space-y-2 ml-4">
                          {section.list.map((item, listIndex) => (
                            <li key={listIndex} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-civora-teal rounded-full mt-2 flex-shrink-0"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {section.contactEmail && (
                      <div className="mt-4 p-4 bg-civora-teal/5 rounded-lg border border-civora-teal/20">
                        <a 
                          href={`mailto:${section.contactEmail}`} 
                          className="inline-flex items-center gap-2 text-civora-teal hover:text-civora-navy transition-colors font-medium"
                        >
                          <Mail className="w-4 h-4" />
                          {section.contactEmail}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 text-center p-8 bg-gradient-to-r from-civora-navy/5 to-civora-teal/5 rounded-2xl border border-civora-teal/20">
            <h3 className="text-2xl font-bold text-civora-navy mb-4">Questions about our Terms?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              We're here to help clarify any questions you may have about our terms of service. 
              Don't hesitate to reach out to our legal team.
            </p>
            <a 
              href="mailto:civoranexus@gmail.com" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-civora-teal to-cyan-500 hover:from-civora-teal/90 hover:to-cyan-500/90 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              Contact Legal Team
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
