import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart, Handshake, Lightbulb, Globe } from "lucide-react";

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

  const goals = [
    {
      icon: <Lightbulb className="h-8 w-8 text-civora-teal" />,
      title: "Smart Governance Solutions",
      description: "Developing digital platforms that enhance transparency and efficiency in government operations."
    },
    {
      icon: <Heart className="h-8 w-8 text-civora-teal" />,
      title: "Healthcare Innovation",
      description: "Creating accessible healthcare technologies that bridge gaps in medical service delivery."
    },
    {
      icon: <Globe className="h-8 w-8 text-civora-teal" />,
      title: "Community Engagement",
      description: "Building tools that strengthen citizen participation in democratic processes and community development."
    }
  ];

  const initiatives = [
    "Digital India Initiative Alignment",
    "Smart City Mission Support",
    "Public Health Technology Solutions",
    "Educational Technology Platforms",
    "Civic Engagement Applications"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-civora-navy to-civora-navy/90 text-white py-28 md:py-36 flex items-center justify-center overflow-hidden">
        {/* Decorative Blob/Graphic */}
        <div
          className="absolute left-[-110px] top-[-120px] md:left-[-200px] md:top-[-120px] pointer-events-none select-none animate-blob"
          aria-hidden="true"
        >
          <svg width="480" height="480" viewBox="0 0 480 480" fill="none">
            <ellipse cx="240" cy="240" rx="230" ry="190" fill="#2EA6AA" fillOpacity="0.23" />
          </svg>
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="font-extrabold text-4xl md:text-6xl leading-tight tracking-tight mb-5 text-white drop-shadow-lg">
              About <span className="text-civora-teal">Civora Nexus</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto font-medium text-gray-200/90 md:mb-2">
              A new venture dedicated to empowering communities through innovative civic and healthcare technology solutions.
            </p>
          </div>
        </div>
        {/* Subtle overlay for polish and readability on backgrounds */}
        <div className="absolute inset-0 bg-civora-navy opacity-55 pointer-events-none" aria-hidden="true"></div>
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

      {/* Focus Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-civora-navy mb-4">Our Focus Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key domains where we aim to create transformative impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {goals.map((goal, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent>
                  <div className="flex justify-center mb-4">
                    {goal.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-civora-navy mb-3">{goal.title}</h3>
                  <p className="text-gray-600">{goal.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Initiatives */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-civora-navy mb-4">Strategic Initiatives</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aligning with national and international programs for maximum impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-md transition-shadow">
                <CardContent>
                  <h3 className="text-lg font-semibold text-civora-navy">{initiative}</h3>
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
