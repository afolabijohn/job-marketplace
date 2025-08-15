
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  Filter,
  TrendingUp,
  Building,
  Users
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import JobFilters from "../components/jobs/JobFilters";
import JobCard from "../components/jobs/JobCard";
import CareerInsightsBanner from "../components/jobs/CareerInsightsBanner";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    jobType: "",
    experienceLevel: "",
    salaryMin: "",
    skills: []
  });

  useEffect(() => {
    loadJobs();
    
    // Get search query from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, []);

  useEffect(() => {
    applyFilters();
  }, [jobs, searchQuery, filters]);

  const loadJobs = async () => {
    setIsLoading(true);
    try {
      // Mock data for now
      const mockJobs = [
        {
          id: 1,
          title: "Senior Frontend Developer",
          company: "TechCorp",
          location: "San Francisco, CA",
          salary_min: 120000,
          salary_max: 150000,
          job_type: "full-time",
          experience_level: "senior-level",
          is_remote: true,
          is_featured: true,
          skills: ["React", "TypeScript", "Node.js"],
          description: "We're looking for a Senior Frontend Developer to join our team."
        },
        {
          id: 2,
          title: "Full Stack Developer",
          company: "InnovateLab",
          location: "Remote",
          salary_min: 100000,
          salary_max: 130000,
          job_type: "full-time",
          experience_level: "mid-level",
          is_remote: true,
          is_featured: true,
          skills: ["React", "Node.js", "MongoDB"],
          description: "Join our growing team as a Full Stack Developer."
        },
        {
          id: 3,
          title: "UI/UX Designer",
          company: "DesignCo",
          location: "New York, NY",
          salary_min: 90000,
          salary_max: 120000,
          job_type: "full-time",
          experience_level: "mid-level",
          is_remote: false,
          is_featured: false,
          skills: ["Figma", "Sketch", "Adobe Creative Suite"],
          description: "Create beautiful and intuitive user experiences."
        }
      ];
      setJobs(mockJobs);
    } catch (error) {
      console.error("Error loading jobs:", error);
    }
    setIsLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...jobs];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.skills?.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(job => 
        job.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        (filters.location === "remote" && job.is_remote)
      );
    }

    // Job type filter
    if (filters.jobType) {
      filtered = filtered.filter(job => job.job_type === filters.jobType);
    }

    // Experience level filter
    if (filters.experienceLevel) {
      filtered = filtered.filter(job => job.experience_level === filters.experienceLevel);
    }

    // Salary filter
    if (filters.salaryMin) {
      const minSalary = parseInt(filters.salaryMin);
      filtered = filtered.filter(job => 
        job.salary_min && job.salary_min >= minSalary
      );
    }

    setFilteredJobs(filtered);
  };

  const handleSearch = () => {
    applyFilters();
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <div className="h-96 bg-slate-200 rounded-xl"></div>
              </div>
              <div className="lg:col-span-3 space-y-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="h-48 bg-slate-200 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Find Your Next Opportunity
              </h1>
              <p className="text-slate-600">
                {filteredJobs.length} jobs • Updated daily with career predictions
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="Search jobs, companies, skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-12 h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="h-12 px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CareerInsightsBanner />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <JobFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
              jobCount={filteredJobs.length}
            />
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            {filteredJobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">No jobs found</h3>
                    <p className="text-slate-600 mb-6">
                      Try adjusting your search criteria or filters to find more opportunities.
                    </p>
                    <Button 
                      onClick={() => {
                        setSearchQuery("");
                        setFilters({
                          location: "",
                          jobType: "",
                          experienceLevel: "",
                          salaryMin: "",
                          skills: []
                        });
                      }}
                      variant="outline"
                    >
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
