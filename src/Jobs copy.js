
import React, { useState, useEffect } from "react";
import { Job } from "@/entities/Job";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/select";

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
      const jobsList = await Job.filter({ status: "active" }, "-created_date");
      setJobs(jobsList);
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
 