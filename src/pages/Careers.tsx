
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Target, Heart, Lightbulb, Coffee, Calendar } from "lucide-react";

const Careers = () => {
  const benefits = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Comprehensive Healthcare",
      description: "Full medical, dental, and vision coverage for you and your family"
    },
    {
      icon: <Coffee className="h-8 w-8 text-amber-500" />,
      title: "Flexible Work Environment",
      description: "Remote work options, flexible hours, and modern office spaces"
    },
    {
      icon: <Target className="h-8 w-8 text-blue-500" />,
      title: "Professional Development",
      description: "Learning opportunities, conference attendance, and skill development programs"
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-500" />,
      title: "Work-Life Balance",
      description: "Generous PTO, sabbatical opportunities, and wellness programs"
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: "Collaborative Culture",
      description: "Work with passionate people who are committed to making a difference"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
      title: "Innovation Focus",
      description: "Opportunity to work on cutting-edge technology and meaningful projects"
    }
  ];

  const careerPaths = [
    {
      title: "Full-Time Positions",
      description: "Join our team as a permanent member and grow your career with us",
      link: "/jobs-opening",
      buttonText: "View Open Positions"
    },
    {
      title: "Internship Program",
      description: "Gain hands-on experience and mentorship in civic technology",
      link: "/internships",
      buttonText: "Apply for Internship"
    },
    {
      title: "Life at Civora",
      description: "Discover our culture, values, and what makes our workplace special",
      link: "/life-at-civora",
      buttonText: "Learn More"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Build Your Career with Purpose"
        subtitle="Join our mission to transform communities through innovative civic technology. We're looking for passionate individuals who want to make a real difference in the world."
        breadcrumb="Careers"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild className="btn-primary" size="lg">
            <Link to="/jobs-opening">View Open Positions</Link>
          </Button>
          <Button asChild variant="outline" className="btn-secondary" size="lg">
            <Link to="/life-at-civora">Life at Civora</Link>
          </Button>
        </div>
      </UniformHeroSection>

      {/* Career Paths */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Career Opportunities</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore different ways to join our team and contribute to meaningful change
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careerPaths.map((path, index) => (
              <div key={index} className="card-modern p-8 text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-2xl font-semibold text-primary mb-4">{path.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {path.description}
                </p>
                <Button asChild className="w-full">
                  <Link to={path.link}>{path.buttonText}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Perks */}
      <section className="section-padding-sm bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Why Choose Civora Nexus?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We believe in taking care of our team so they can do their best work and create meaningful impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="card-modern p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-neon-blue/10 rounded-2xl flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-primary mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="section-padding-sm bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              At Civora Nexus, we're not just building software – we're building bridges between 
              technology and community impact. Every line of code we write, every feature we design, 
              and every solution we deploy has the potential to improve lives and strengthen communities.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">50+</div>
                <div className="text-muted-foreground">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">100K+</div>
                <div className="text-muted-foreground">Citizens Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">25+</div>
                <div className="text-muted-foreground">Team Members</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-gradient-to-br from-accent/5 to-neon-blue/5">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-6">Ready to Make an Impact?</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join our team of passionate professionals who are dedicated to creating technology 
              solutions that make a real difference in communities around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-primary" size="lg">
                <Link to="/careers/jobs">Apply Now</Link>
              </Button>
              <Button asChild variant="outline" className="btn-secondary" size="lg">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
