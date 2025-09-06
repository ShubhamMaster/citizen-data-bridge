
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UniformHeroSection from '@/components/UniformHeroSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Users, Target, Award, Lightbulb } from 'lucide-react';

const Investors = () => {
  const investmentHighlights = [
    {
      title: "Market Leadership",
      description: "Leading position in AI-driven solutions and SaaS development",
      icon: TrendingUp,
      stats: "300% YoY Growth"
    },
    {
      title: "Revenue Growth",
      description: "Consistent revenue growth with expanding client base",
      icon: DollarSign,
      stats: "$50M+ Revenue"
    },
    {
      title: "Team Excellence",
      description: "World-class team of engineers and researchers",
      icon: Users,
      stats: "200+ Experts"
    },
    {
      title: "Market Opportunity",
      description: "Targeting the $1.2T global software market",
      icon: Target,
      stats: "$1.2T Market"
    }
  ];

  const keyMetrics = [
    { label: "Annual Revenue", value: "$50M+", growth: "+300%" },
    { label: "Active Clients", value: "500+", growth: "+150%" },
    { label: "Team Members", value: "200+", growth: "+80%" },
    { label: "Patent Portfolio", value: "25+", growth: "+200%" }
  ];

  const investmentOpportunities = [
    {
      type: "Series A",
      amount: "$10M - $25M",
      use: "Product Development & Market Expansion",
      timeline: "Q2 2024"
    },
    {
      type: "Strategic Partnership",
      amount: "$5M - $50M",
      use: "Joint Ventures & Technology Integration",
      timeline: "Ongoing"
    },
    {
      type: "Growth Capital",
      amount: "$25M+",
      use: "International Expansion & Acquisitions",
      timeline: "Q4 2024"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <UniformHeroSection
        title="Investment Opportunities"
        subtitle="Partner with Civora Nexus to shape the future of technology. Discover our growth story and investment potential."
        breadcrumb="About Us / Investors"
      />

      {/* Investment Highlights */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Why Invest in Civora Nexus?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We're at the forefront of technological innovation, delivering exceptional returns through cutting-edge solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {investmentHighlights.map((highlight, index) => (
              <Card key={index} className="card-modern">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <highlight.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{highlight.title}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">
                    {highlight.stats}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {highlight.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {keyMetrics.map((metric, index) => (
              <Card key={index} className="card-modern text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
                  <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {metric.growth}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Current Investment Opportunities
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Multiple pathways to partner with us and participate in our growth journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {investmentOpportunities.map((opportunity, index) => (
              <Card key={index} className="card-modern">
                <CardHeader>
                  <CardTitle className="text-xl">{opportunity.type}</CardTitle>
                  <div className="text-2xl font-bold text-primary">{opportunity.amount}</div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Use of Funds</h4>
                      <p className="text-sm">{opportunity.use}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Timeline</h4>
                      <p className="text-sm">{opportunity.timeline}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/investment-inquiry">
              <Button size="lg" className="btn-primary">
                Submit Investment Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Innovation Meets Opportunity
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Proven Innovation Track Record</h3>
                    <p className="text-muted-foreground">
                      25+ patents filed, cutting-edge AI research, and breakthrough solutions that drive industry transformation.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Market Leadership</h3>
                    <p className="text-muted-foreground">
                      Recognized industry leader with award-winning solutions and a growing portfolio of Fortune 500 clients.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Scalable Growth Model</h3>
                    <p className="text-muted-foreground">
                      Proven business model with recurring revenue streams and expanding market opportunities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-muted/30 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-6">Investment Highlights</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>300% year-over-year revenue growth</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>500+ active enterprise clients</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>95% client retention rate</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>25+ patents in AI and automation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Expanding into 15 new markets</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Investors;
