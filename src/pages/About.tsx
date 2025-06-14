
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart, Handshake } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Users className="h-8 w-8 text-civora-teal" />,
      title: "Community First",
      description: "We prioritize community needs and citizen welfare in every solution we build."
    },
    {
      icon: <Target className="h-8 w-8 text-civora-teal" />,
      title: "Innovation Focus",
      description: "Leveraging cutting-edge technology to solve real-world civic challenges."
    },
    {
      icon: <Heart className="h-8 w-8 text-civora-teal" />,
      title: "Social Impact",
      description: "Committed to creating meaningful change that improves lives and communities."
    },
    {
      icon: <Handshake className="h-8 w-8 text-civora-teal" />,
      title: "Collaborative Approach",
      description: "Building partnerships with governments, NGOs, and communities for lasting solutions."
    }
  ];

  const partnerships = [
    "Swachh Bharat Mission",
    "Ayushman Bharat",
    "Smart City Missions",
    "Digital India Initiative",
    "Various NGOs & Community Organizations"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-civora-navy to-civora-navy/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">About Civora Nexus</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Empowering communities through innovative civic and healthcare technology solutions
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8 shadow-lg">
              <CardContent className="text-center">
                <h2 className="text-3xl font-bold text-civora-navy mb-6">Our Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To bridge the gap between citizens and public services through intelligent innovation, 
                  creating scalable technology solutions that enhance governance, healthcare delivery, 
                  and community engagement.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-8 shadow-lg">
              <CardContent className="text-center">
                <h2 className="text-3xl font-bold text-civora-navy mb-6">Our Vision</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  To be the leading catalyst for digital transformation in civic and healthcare sectors, 
                  enabling transparent, efficient, and citizen-centric public services across communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-civora-navy mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and define our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-civora-navy mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-civora-navy mb-4">Partnerships & Collaborations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Working together with leading organizations to create meaningful impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerships.map((partnership, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-md transition-shadow">
                <CardContent>
                  <h3 className="text-lg font-semibold text-civora-navy">{partnership}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
