
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-civora-navy to-civora-navy/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Ready to transform your community with innovative technology solutions?
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-civora-navy">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-civora-teal focus:border-transparent"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-civora-teal hover:bg-civora-teal/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-civora-navy mb-6">Get in Touch</h2>
                <p className="text-gray-600 text-lg mb-8">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-civora-teal/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-civora-teal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-civora-navy">Email</h3>
                    <p className="text-gray-600">civoranexus@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-civora-teal/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-civora-teal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-civora-navy">Phone</h3>
                    <p className="text-gray-600">+91 XXX XXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-civora-teal/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-civora-teal" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-civora-navy">Office</h3>
                    <p className="text-gray-600">India</p>
                  </div>
                </div>
              </div>

              <Card className="bg-civora-navy text-white p-6">
                <CardContent>
                  <h3 className="text-xl font-semibold mb-3">Ready to Start?</h3>
                  <p className="mb-4">
                    Let's discuss how we can help transform your organization with innovative technology solutions.
                  </p>
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-civora-navy">
                    Schedule a Call
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
