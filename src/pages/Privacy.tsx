import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const Privacy = () => {
  return <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-civora-navy to-civora-navy/90 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-gray-950">Privacy Policy</h1>
            <p className="text-xl max-w-3xl mx-auto text-gray-600">
              Your privacy is important to us. Learn how we protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-civora-navy">Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>We collect information you provide directly to us, such as when you:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create an account or profile</li>
                  <li>Submit job applications</li>
                  <li>Contact us through our website</li>
                  <li>Subscribe to our newsletters</li>
                  <li>Participate in surveys or feedback forms</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-civora-navy">How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process job applications and communicate with candidates</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Analyze usage patterns to improve our website</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-civora-navy">Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted partners who assist us in operating our website and conducting our business.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-civora-navy">Data Security</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-civora-navy">Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your personal information</li>
                  <li>Object to processing of your information</li>
                  <li>Data portability</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-civora-navy">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600">
                <p>
                  If you have any questions about this Privacy Policy, please contact us at{' '}
                  <a href="mailto:civoranexus@gmail.com" className="text-civora-teal hover:underline">
                    civoranexus@gmail.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Privacy;