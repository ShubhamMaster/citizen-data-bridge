
import React from 'react';
import ModernHeader from '@/components/ModernHeader';
import Footer from '@/components/Footer';
import SaveHereSection from '@/components/SaveHereSection';
import { Users, Target, Heart, Handshake, Lightbulb, Globe, Award, Zap } from "lucide-react";

const ValueCard = ({ icon: Icon, title, description, color }: {
  icon: any;
  title: string;
  description: string;
  color: string;
}) => (
  <div className="card-modern text-center group hover:shadow-large transition-all duration-300">
    <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Community First",
      description: "We prioritize community needs and citizen welfare in every solution we build, ensuring technology serves humanity.",
      color: "bg-gradient-to-br from-blue-500 to-indigo-600"
    },
    {
      icon: Target,
      title: "Innovation Focus",
      description: "Leveraging cutting-edge technology to solve real-world challenges and create meaningful impact.",
      color: "bg-gradient-to-br from-purple-500 to-pink-600"
    },
    {
      icon: Heart,
      title: "Social Impact",
      description: "Committed to creating positive change that improves lives and strengthens communities worldwide.",
      color: "bg-gradient-to-br from-red-500 to-rose-600"
    },
    {
      icon: Handshake,
      title: "Collaborative Approach",
      description: "Building partnerships with governments, organizations, and communities for sustainable solutions.",
      color: "bg-gradient-to-br from-green-500 to-emerald-600"
    },
    {
      icon: Lightbulb,
      title: "Creative Excellence",
      description: "Pushing boundaries through innovative thinking and creative problem-solving methodologies.",
      color: "bg-gradient-to-br from-amber-500 to-orange-600"
    },
    {
      icon: Globe,
      title: "Global Vision",
      description: "Thinking globally while acting locally to create solutions that scale and make worldwide impact.",
      color: "bg-gradient-to-br from-cyan-500 to-blue-600"
    }
  ];

  const goals = [
    {
      icon: Lightbulb,
      title: "Smart Governance Solutions",
      description: "Developing digital platforms that enhance transparency, efficiency, and citizen engagement in government operations."
    },
    {
      icon: Heart,
      title: "Healthcare Innovation",
      description: "Creating accessible healthcare technologies that bridge gaps in medical service delivery and patient care."
    },
    {
      icon: Globe,
      title: "Community Engagement",
      description: "Building tools that strengthen citizen participation in democratic processes and community development initiatives."
    }
  ];

  const achievements = [
    { number: "50+", label: "Successful Projects" },
    { number: "25+", label: "Happy Clients" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "5+", label: "Years Experience" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="animated-bg">
          <div className="floating-element w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-400 top-20 right-10 animate-float" />
          <div className="floating-element w-64 h-64 bg-gradient-to-tl from-pink-400 to-red-400 bottom-20 left-10 animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="hero-content">
          <div className="animate-fade-in">
            <h1 className="font-heading font-bold text-gray-900 mb-6">
              Our Mission, <span className="text-gradient">Your Future</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Empowering communities through innovative civic and healthcare technology solutions that create lasting positive impact.
            </p>
          </div>
          
          {/* Achievement Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {achievement.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-white">
        <div className="container-modern">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="card-modern text-center animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To bridge the gap between citizens and public services through intelligent innovation, 
                creating scalable technology solutions that enhance governance, healthcare delivery, 
                and community engagement for a better tomorrow.
              </p>
            </div>
            
            <div className="card-modern text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be the leading catalyst for digital transformation in civic and healthcare sectors, 
                enabling transparent, efficient, and citizen-centric public services that empower 
                communities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-modern">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-gradient">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The principles that guide our work and define our commitment to excellence, innovation, and social impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ValueCard {...value} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="section-padding bg-white">
        <div className="container-modern">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-gradient">Focus Areas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Key domains where we aim to create transformative impact through innovative technology solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {goals.map((goal, index) => (
              <div
                key={goal.title}
                className="card-modern text-center animate-fade-in hover:shadow-large transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <goal.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{goal.title}</h3>
                <p className="text-gray-600 leading-relaxed">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-modern">
          <div className="card-gradient gradient-primary text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Be part of our journey to create meaningful change through technology. Explore career opportunities and grow with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/careers" className="bg-white text-accent hover:bg-gray-100 px-8 py-3 rounded-2xl font-semibold transition-colors duration-200">
                View Career Opportunities
              </a>
              <a href="/contact" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-2xl font-semibold transition-colors duration-200">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <SaveHereSection />
      <Footer />
    </div>
  );
};

export default About;
