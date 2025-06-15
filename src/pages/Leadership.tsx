
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";

const leadershipTeam = [
  {
    name: "Ayesha Varma",
    title: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=facearea&w=400&h=400&facepad=2&q=80",
    bio: "A seasoned tech executive with a passion for innovation and impact. Leads the company towards global growth."
  },
  {
    name: "Rahul Menon",
    title: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=facearea&w=400&h=400&facepad=2&q=80",
    bio: "Heads our product and engineering teams with a focus on scalable AI solutions and technical strategy."
  },
  {
    name: "Ishita Ghosh",
    title: "Chief Operating Officer",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=facearea&w=400&h=400&facepad=2&q=80",
    bio: "Ensures operational excellence, driving execution across all functions with efficiency and care."
  },
  {
    name: "Mohit Arora",
    title: "Chief Financial Officer",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=facearea&w=400&h=400&facepad=2&q=80",
    bio: "Steers our fiscal strategy and brings clarity to financial operations."
  }
];

export default function Leadership() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 max-w-6xl mx-auto py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-civora-navy dark:text-white mb-6 text-center">Our Leadership Team</h1>
        <p className="max-w-2xl mx-auto text-lg text-center text-gray-700 dark:text-gray-300 mb-12">
          Meet the visionaries guiding Civora Nexus Pvt Ltd toward innovation, excellence, and impact.
        </p>
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {leadershipTeam.map((leader) => (
            <Card key={leader.name} className="flex flex-col items-center text-center shadow-md hover-scale transition-all duration-200">
              <CardHeader className="flex flex-col items-center">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-civora-teal mb-3 shadow"
                  loading="lazy"
                />
                <CardTitle className="text-xl font-semibold">{leader.name}</CardTitle>
                <span className="text-civora-teal font-medium">{leader.title}</span>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{leader.bio}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

