
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Calendar, 
  MessageSquare, 
  Briefcase,
  DollarSign,
  Headphones,
  Activity,
  GraduationCap
} from "lucide-react";

interface DashboardCardsProps {
  stats: any;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ stats }) => {
  const dashboardCards = [
    {
      title: "Interns",
      total: stats?.interns.total || 0,
      pending: stats?.interns.pending || 0,
      icon: <GraduationCap className="h-6 w-6 text-accent" />,
      color: "from-purple-500/10 to-purple-600/10",
      subtitle: `${stats?.interns.thisYear || 0} this year`
    },
    {
      title: "Scheduled Calls",
      total: stats?.scheduledCalls.total || 0,
      pending: stats?.scheduledCalls.pending || 0,
      icon: <Calendar className="h-6 w-6 text-accent" />,
      color: "from-blue-500/10 to-blue-600/10"
    },
    {
      title: "Contact Messages",
      total: stats?.contactMessages.total || 0,
      pending: 0,
      icon: <MessageSquare className="h-6 w-6 text-accent" />,
      color: "from-green-500/10 to-green-600/10"
    },
    {
      title: "Job Listings",
      total: stats?.jobs.total || 0,
      pending: stats?.jobs.active || 0,
      icon: <Briefcase className="h-6 w-6 text-accent" />,
      color: "from-indigo-500/10 to-indigo-600/10"
    },
    {
      title: "Salary Inquiries",
      total: stats?.salaryInquiries.total || 0,
      pending: stats?.salaryInquiries.pending || 0,
      icon: <DollarSign className="h-6 w-6 text-accent" />,
      color: "from-orange-500/10 to-orange-600/10"
    },
    {
      title: "Support Tickets",
      total: stats?.supportTickets.total || 0,
      pending: stats?.supportTickets.pending || 0,
      icon: <Headphones className="h-6 w-6 text-accent" />,
      color: "from-red-500/10 to-red-600/10"
    },
    {
      title: "Website Visits",
      total: stats?.websiteVisits.thisWeek || 0,
      pending: 0,
      icon: <Activity className="h-6 w-6 text-accent" />,
      color: "from-teal-500/10 to-teal-600/10",
      subtitle: "This week"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {dashboardCards.map((card, index) => (
        <Card key={index} className="card-modern hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
              {card.icon}
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">{card.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{card.total}</span>
                {card.pending > 0 && (
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {card.pending} pending
                  </Badge>
                )}
              </div>
              {card.subtitle && (
                <p className="text-sm text-muted-foreground">{card.subtitle}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardCards;
