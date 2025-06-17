import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SaveHereSection from '@/components/SaveHereSection';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Users, Code, Award, Calendar, ArrowRight, Target, Rocket } from "lucide-react";

const InnovationLab = () => {
  const initiatives = [
    {
      title: "Civic Hackathons",
      description: "48-hour hackathons focused on solving local government and community challenges",
      icon: <Code className="h-8 w-8 text-civora-teal" />,
      features: ["Open to all developers", "Real problem statements", "Mentorship provided", "Cash prizes"]
    },
    {
      title: "Student Internships",
      description: "3-6 month internship programs for students to work on live civic projects",
      icon: <Users className="h-8 w-8 text-civora-teal" />,
      features: ["Hands-on experience", "Industry mentorship", "Certificate programs", "Full-time opportunities"]
    },
    {
      title: "Innovation Challenges",
      description: "Monthly challenges to ideate and prototype solutions for civic problems",
      icon: <Lightbulb className="h-8 w-8 text-civora-teal" />,
      features: ["Monthly themes", "Prototype funding", "Expert evaluation", "Implementation support"]
    },
    {
      title: "Community Projects",
      description: "Collaborative projects with local communities to address specific needs",
      icon: <Award className="h-8 w-8 text-civora-teal" />,
      features: ["Community partnerships", "Impact measurement", "Sustainable solutions", "Local engagement"]
    }
  ];

  const upcomingEvents = [
    {
      title: "Smart City Hackathon 2024",
      date: "March 15-17, 2024",
      type: "Hackathon",
      participants: "200+ expected",
      prize: "₹2 Lakhs total prizes"
    },
    {
      title: "Healthcare Innovation Challenge",
      date: "April 10, 2024",
      type: "Challenge",
      participants: "Open registration",
      prize: "₹50K funding"
    },
    {
      title: "Student Internship Program",
      date: "May 1, 2024",
      type: "Internship",
      participants: "20 positions",
      prize: "Stipend provided"
    }
  ];

  const missionPoints = [
    {
      icon: <Target className="w-8 h-8 text-civora-teal" />,
      title: "Our Mission",
      description: "To create a collaborative ecosystem where innovation meets civic responsibility, fostering solutions that address real community challenges."
    },
    {
      icon: <Rocket className="w-8 h-8 text-civora-teal" />,
      title: "Our Vision",
      description: "To become the leading platform for civic innovation, connecting passionate developers with meaningful projects that transform communities."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-civora-navy to-civora-navy/90 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Innovation Lab</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
              Fostering innovation through hackathons, internships, and community-driven projects
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-civora-teal hover:bg-civora-teal/90">
                Join Our Next Event
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-civora-navy">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {missionPoints.map((point, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <CardContent className="text-center">
                  <div className="flex justify-center mb-6">
                    {point.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-civora-navy mb-4">{point.title}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {point.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Initiatives */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-civora-navy mb-4">Our Innovation Initiatives</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple pathways for developers, students, and innovators to contribute to civic technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    {initiative.icon}
                    <CardTitle className="text-xl text-civora-navy">{initiative.title}</CardTitle>
                  </div>
                  <p className="text-gray-600">{initiative.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {initiative.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4 text-civora-teal" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-civora-navy mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600">Join our next innovation events and challenges</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-civora-teal" />
                    <Badge variant="secondary">{event.type}</Badge>
                  </div>
                  <CardTitle className="text-xl text-civora-navy">{event.title}</CardTitle>
                  <p className="text-civora-teal font-semibold">{event.date}</p>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Participants:</span>
                    <span className="text-sm font-medium">{event.participants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Prize:</span>
                    <span className="text-sm font-medium">{event.prize}</span>
                  </div>
                  <Button className="w-full mt-4 bg-civora-teal hover:bg-civora-teal/90">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-civora-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Innovate?</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Join our community of innovators working to solve real-world problems through technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-civora-teal hover:bg-civora-teal/90">
              Join Innovation Lab
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-civora-navy">
              View Opportunities
            </Button>
          </div>
        </div>
      </section>

      <SaveHereSection />
      <Footer />
    </div>
  );
};

export default InnovationLab;
