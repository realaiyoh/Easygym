import { Button } from "@/components/ui/button";
import { ArrowRight, DumbbellIcon, CalendarIcon, UsersIcon, ClipboardListIcon } from "lucide-react";
import { Link } from "react-router";
import { routes } from "@/lib/constants";

const Home = () => {
  const scrollToFeatures = () => {
    window.scrollTo({ top: document.getElementById('features')?.offsetTop, behavior: 'smooth' });
  }

  return (
    <div className="flex flex-col gap-16 pb-10">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 pt-12 md:pt-20">
        <div className="bg-primary/10 font-medium px-4 py-1.5 rounded-full mb-2">
          Welcome to <span className="uppercase font-bold">EasyGym</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight">
          Fitness Management <span className="text-accent">Reimagined</span>
        </h1>
        <p className="text-primary max-w-2xl text-lg">
          The complete platform for both fitness enthusiasts and personal trainers to track workouts, monitor progress, and achieve fitness goals together.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <Button size="lg" asChild>
            <Link to={routes.Register}>Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button onClick={scrollToFeatures} size="lg" variant="outline">Learn More</Button>
        </div>
        <div className="relative mt-12 w-full max-w-5xl">
          <div className="aspect-video rounded-xl bg-gradient-to-br from-accent/30 to-secondary/50 overflow-hidden shadow-xl">
            <div className="w-full h-full flex items-center justify-center text-primary">
              {/* Placeholder for app screenshot */}
              <p className="text-xl font-semibold">Dashboard Preview</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Everything you need for your fitness success</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <FeatureCard
            icon={<DumbbellIcon className="h-6 w-6" />}
            title="Workout Tracking"
            description="Log and monitor your exercises, sets, reps, and weights with our intuitive interface."
          />
          <FeatureCard
            icon={<CalendarIcon className="h-6 w-6" />}
            title="Training Programs"
            description="Access professionally designed workout plans or create your own custom programs."
          />
          <FeatureCard
            icon={<UsersIcon className="h-6 w-6" />}
            title="Community Support"
            description="Connect with like-minded fitness enthusiasts and share your journey."
          />
          <FeatureCard
            icon={<ClipboardListIcon className="h-6 w-6" />}
            title="For Personal Trainers"
            description="Manage your clients, create custom programs, and track their progress all in one place."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-sm border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold">Ready to transform your fitness journey?</h3>
            </div>
            <Button size="lg" className="md:self-end" asChild>
              <Link to={routes.Register}>Start Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-xl bg-card border hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Home;
