
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { motion } from "framer-motion";
import { 
  Search, 
  TrendingUp, 
  Users, 
  Briefcase, 
  MapPin, 
  DollarSign,
  ArrowRight,
  Zap,
  Target,
  BarChart3
} from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const featuredJobs = [
    {
      id: 1,
      title: "Junior Data Analyst",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$65k - $85k",
      type: "Full-time",
      skills: ["Python", "SQL", "Tableau"],
      isRemote: true
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "InnovateLab",
      location: "Austin, TX",
      salary: "$70k - $90k",
      type: "Full-time",
      skills: ["React", "TypeScript", "CSS"],
      isRemote: false
    },
    {
      id: 3,
      title: "Marketing Analyst",
      company: "GrowthCo",
      location: "Remote",
      salary: "$55k - $75k",
      type: "Full-time",
      skills: ["Analytics", "Excel", "SQL"],
      isRemote: true
    }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "Career Trajectory Predictor",
      description: "See where your career could go with AI-powered predictions based on real data"
    },
    {
      icon: Target,
      title: "Smart Job Matching",
      description: "Get matched with opportunities that align with your skills and career goals"
    },
    {
      icon: BarChart3,
      title: "Salary Insights",
      description: "Transparent salary data and growth projections for informed decisions"
    }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = createPageUrl(`Jobs?search=${encodeURIComponent(searchQuery)}`);
    } else {
      window.location.href = createPageUrl("Jobs");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-16 pb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-orange-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-orange-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-100/50"
            >
              <Zap className="w-4 h-4 text-orange-600" />
              <span>Powered by AI Career Intelligence</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
            >
              Find Your Next Role,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-600"> Predict Your Future</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
            >
              The only job board that shows you where your career is heading. 
              Discover opportunities with AI-powered trajectory predictions.
            </motion.p>

            {/* Search Bar */}
            <motion.div 
              variants={itemVariants}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-slate-200/50">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Search jobs, companies, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-12 h-12 border-0 text-base focus:ring-0 bg-transparent"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  size="lg" 
                  className="h-12 px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 hover:from-blue-700 hover:via-indigo-700 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-xl"
                >
                  Search Jobs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
            >
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">2,500+</div>
                <div className="text-slate-600">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-orange-500 bg-clip-text text-transparent">85%</div>
                <div className="text-slate-600">Prediction Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">$75k</div>
                <div className="text-slate-600">Average Starting Salary</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why CareerPath is Different
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              We don't just help you find jobs—we help you understand your career potential
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50/50 transform hover:-translate-y-2 group">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${
                      index === 0 ? 'from-blue-600 to-indigo-600' :
                      index === 1 ? 'from-indigo-600 to-orange-500' :
                      'from-orange-500 to-amber-500'
                    } rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Opportunities</h2>
              <p className="text-slate-600">Hand-picked roles with strong career growth potential</p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex border-blue-200 hover:bg-blue-50">
              <Link to={createPageUrl("Jobs")}>
                View All Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {featuredJobs.map((job, index) => (
              <motion.div key={job.id} variants={itemVariants}>
                <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                          {job.title}
                        </h3>
                        <p className="text-slate-600 font-medium">{job.company}</p>
                      </div>
                      {job.isRemote && (
                        <Badge className="bg-gradient-to-r from-blue-50 to-orange-50 text-blue-700 border-blue-200">
                          Remote
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-slate-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">{job.salary}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className={`text-xs ${
                          skillIndex % 3 === 0 ? 'bg-blue-100 text-blue-700' :
                          skillIndex % 3 === 1 ? 'bg-indigo-100 text-indigo-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Button asChild className={`w-full bg-gradient-to-r ${
                      index % 3 === 0 ? 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' :
                      index % 3 === 1 ? 'from-indigo-600 to-orange-500 hover:from-indigo-700 hover:to-orange-600' :
                      'from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
                    } text-white rounded-xl`}>
                      <Link to={createPageUrl("Jobs")}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8 sm:hidden">
            <Button asChild variant="outline">
              <Link to={createPageUrl("Jobs")}>
                View All Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900/20 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Accelerate Your Career?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who've found their dream jobs and predicted their success with CareerPath.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 hover:from-blue-700 hover:via-indigo-700 hover:to-orange-600 text-white shadow-lg rounded-xl">
              <Link to={createPageUrl("Jobs")}>
                <Search className="w-5 h-5 mr-2" />
                Browse Jobs
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl">
              <Link to={createPageUrl("PostJob")}>
                <Briefcase className="w-5 h-5 mr-2" />
                Post a Job
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}