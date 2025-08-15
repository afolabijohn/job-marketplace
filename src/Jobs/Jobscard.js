
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  Building, 
  TrendingUp,
  Bookmark,
  ExternalLink
} from "lucide-react";
import { format } from "date-fns";

export default function JobCard({ job }) {
  const formatSalary = () => {
    if (job.salary_min && job.salary_max) {
      return `$${(job.salary_min / 1000).toFixed(0)}k - $${(job.salary_max / 1000).toFixed(0)}k`;
    } else if (job.salary_min) {
      return `$${(job.salary_min / 1000).toFixed(0)}k+`;
    }
    return "Competitive";
  };

  const getJobTypeColor = (type) => {
    const colors = {
      "full-time": "bg-blue-50 text-blue-700 border-blue-200",
      "part-time": "bg-indigo-50 text-indigo-700 border-indigo-200", 
      "contract": "bg-orange-50 text-orange-700 border-orange-200",
      "internship": "bg-amber-50 text-amber-700 border-amber-200"
    };
    return colors[type] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  const getExperienceColor = (level) => {
    const colors = {
      "entry-level": "bg-emerald-50 text-emerald-700 border-emerald-200",
      "mid-level": "bg-yellow-50 text-yellow-700 border-yellow-200",
      "senior-level": "bg-rose-50 text-rose-700 border-rose-200"
    };
    return colors[level] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer overflow-hidden relative">
        {job.is_featured && (
            <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-orange-500"></div>
        )}
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            {/* Job Info */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:via-indigo-500 group-hover:to-orange-500 transition-all duration-300">
                      <Building className="w-6 h-6 text-slate-500 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-slate-600 font-medium">{job.company}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                      {job.is_remote && <Badge className="ml-2 bg-gradient-to-r from-blue-50 to-orange-50 text-blue-700 text-xs border-blue-200">Remote</Badge>}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {formatSalary()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {format(new Date(job.created_date), "MMM d, yyyy")}
                    </div>
                  </div>

                  <p className="text-slate-600 line-clamp-2 mb-4">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className={`border ${getJobTypeColor(job.job_type)}`}>
                      {job.job_type?.replace('-', ' ')}
                    </Badge>
                    <Badge className={`border ${getExperienceColor(job.experience_level)}`}>
                      {job.experience_level?.replace('-', ' ')}
                    </Badge>
                    {job.skills?.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className={`transition-colors ${
                        index % 3 === 0 ? 'group-hover:bg-blue-100 group-hover:text-blue-700' :
                        index % 3 === 1 ? 'group-hover:bg-indigo-100 group-hover:text-indigo-700' :
                        'group-hover:bg-orange-100 group-hover:text-orange-700'
                      }`}>
                        {skill}
                      </Badge>
                    ))}
                    {job.skills?.length > 3 && (
                      <Badge variant="secondary" className="transition-colors group-hover:bg-slate-200">
                        +{job.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full">
                  <Bookmark className="w-5 h-5" />
                </Button>
              </div>

              {/* Career Trajectory Preview */}
              <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-orange-50 rounded-xl p-4 border border-blue-100 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Career Trajectory Preview</span>
                </div>
                <p className="text-sm text-slate-600 mb-3">
                  Based on similar roles, professionals typically advance to Senior {job.title} within 2-3 years with an average 35% salary increase.
                </p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Next role: Senior {job.title}</span>
                  <span>Avg. time: 2.5 years</span>
                  <span className="text-orange-600 font-medium">+35% salary</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex lg:flex-col gap-3 lg:w-auto w-full pt-2">
              <Button 
                asChild 
                className="flex-1 lg:flex-none bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 hover:from-blue-700 hover:via-indigo-700 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 rounded-xl"
              >
                <Link to={createPageUrl(`JobDetail?id=${job.id}`)}>
                  View Details
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" className="flex-1 lg:flex-none border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-colors rounded-xl">
                Quick Apply
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
