import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Briefcase, Star, UserCheck } from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import ApplicationTracker from "../components/dashboard/ApplicationTracker";
import RecommendedJobs from "../components/dashboard/RecommendedJobs";
import CareerProgress from "../components/dashboard/CareerProgress";
import ProfilePrompt from "../components/dashboard/ProfilePrompt";

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [recommendedJobs, setRecommendedJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Mock data for now
                const mockUser = {
                    id: 1,
                    name: "John Doe",
                    email: "john@example.com",
                    profile_completion: 65,
                    total_applications: 8,
                    total_interviews: 3
                };
                setUser(mockUser);

                const mockApplications = [
                    { id: 1, job_id: 1, status: 'applied', job: { title: 'Frontend Developer', company: 'TechCorp' } },
                    { id: 2, job_id: 2, status: 'interview', job: { title: 'React Developer', company: 'InnovateLab' } },
                    { id: 3, job_id: 3, status: 'applied', job: { title: 'UI/UX Designer', company: 'DesignCo' } }
                ];
                setApplications(mockApplications);
                
                const mockJobs = [
                    { id: 1, title: 'Senior Frontend Developer', company: 'TechCorp', location: 'San Francisco', salary_min: 120000, is_featured: true, skills: ['React', 'TypeScript'] },
                    { id: 2, title: 'Full Stack Developer', company: 'InnovateLab', location: 'Remote', salary_min: 100000, is_featured: true, skills: ['Node.js', 'React'] },
                    { id: 3, title: 'UI/UX Designer', company: 'DesignCo', location: 'New York', salary_min: 90000, is_featured: false, skills: ['Figma', 'Sketch'] }
                ];
                setJobs(mockJobs);
                setRecommendedJobs(mockJobs.filter(job => job.is_featured).slice(0, 3));

            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-pulse text-center">
                    <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Loading your dashboard...</p>
                </div>
            </div>
        );
    }
    
    if (!user) {
         return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center text-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Please log in to view your dashboard</h2>
                    <Button asChild>
                        <Link to={createPageUrl("Home")}>Back to Home</Link>
                    </Button>
                </div>
            </div>
        );
    }
    
    const applicationsWithJobs = applications.map(app => {
        const job = jobs.find(j => j.id === app.job_id);
        return { ...app, job };
    }).filter(app => app.job);

    const interviews = applicationsWithJobs.filter(app => app.status === 'interview').length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Header */}
                    <motion.div variants={containerVariants} className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                            Welcome back, {user.full_name.split(' ')[0]}!
                        </h1>
                        <p className="text-lg text-slate-600">Here's your career snapshot today.</p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <StatCard icon={FileText} title="Applications Sent" value={applications.length} color="blue" />
                        <StatCard icon={UserCheck} title="Interviews" value={interviews} color="orange" />
                        <StatCard icon={Star} title="Saved Jobs" value="12" description="Feature coming soon" color="indigo" />
                        <StatCard icon={Briefcase} title="Career Level" value={user.experience_years ? `${user.experience_years} yrs exp` : 'Entry'} description="Based on your profile" color="slate" />
                    </motion.div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Application Tracker */}
                        <motion.div variants={containerVariants} className="lg:col-span-2">
                            <ApplicationTracker applications={applicationsWithJobs} />
                        </motion.div>

                        {/* Right Column: Recommendations & Insights */}
                        <div className="space-y-8">
                           <motion.div variants={containerVariants}>
                               <RecommendedJobs jobs={recommendedJobs} />
                           </motion.div>
                           <motion.div variants={containerVariants}>
                               <CareerProgress user={user} />
                           </motion.div>
                            <motion.div variants={containerVariants}>
                               <ProfilePrompt user={user} />
                           </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}