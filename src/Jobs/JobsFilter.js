
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Filter, X, MapPin, DollarSign, Briefcase, Star } from "lucide-react";

export default function JobFilters({ filters, onFilterChange, jobCount }) {
  const handleFilterUpdate = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      location: "",
      jobType: "",
      experienceLevel: "",
      salaryMin: "",
      skills: []
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ""
  );

  const locations = [
    "San Francisco, CA",
    "New York, NY", 
    "Austin, TX",
    "Seattle, WA",
    "Remote",
    "Los Angeles, CA",
    "Boston, MA"
  ];

  const jobTypes = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" }
  ];

  const experienceLevels = [
    { value: "entry-level", label: "Entry Level" },
    { value: "mid-level", label: "Mid Level" },
    { value: "senior-level", label: "Senior Level" }
  ];

  const salaryRanges = [
    { value: "40000", label: "$40k+" },
    { value: "60000", label: "$60k+" },
    { value: "80000", label: "$80k+" },
    { value: "100000", label: "$100k+" },
    { value: "120000", label: "$120k+" }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg sticky top-24">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Filter className="w-5 h-5 text-blue-600" />
              Filters
            </CardTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-slate-500 hover:text-slate-700 hover:bg-blue-50"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
          <div className="text-sm text-slate-600">
            <Badge variant="outline" className="mr-2 border-blue-200 text-blue-700">{jobCount}</Badge> 
            jobs match your criteria
          </div>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" defaultValue={['location', 'jobType', 'experienceLevel', 'salary']} className="w-full">
            
            <AccordionItem value="location">
              <AccordionTrigger className="text-sm font-medium hover:text-blue-600">Location</AccordionTrigger>
              <AccordionContent>
                <Select value={filters.location} onValueChange={(value) => handleFilterUpdate("location", value)}>
                  <SelectTrigger className="h-10 focus:border-blue-300 focus:ring-blue-300">
                    <SelectValue placeholder="Any location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>Any location</SelectItem>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location.toLowerCase()}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="jobType">
              <AccordionTrigger className="text-sm font-medium hover:text-indigo-600">Job Type</AccordionTrigger>
              <AccordionContent>
                <Select value={filters.jobType} onValueChange={(value) => handleFilterUpdate("jobType", value)}>
                  <SelectTrigger className="h-10 focus:border-indigo-300 focus:ring-indigo-300">
                    <SelectValue placeholder="Any type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>Any type</SelectItem>
                    {jobTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="experienceLevel">
              <AccordionTrigger className="text-sm font-medium hover:text-orange-600">Experience Level</AccordionTrigger>
              <AccordionContent>
                <Select value={filters.experienceLevel} onValueChange={(value) => handleFilterUpdate("experienceLevel", value)}>
                  <SelectTrigger className="h-10 focus:border-orange-300 focus:ring-orange-300">
                    <SelectValue placeholder="Any level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>Any level</SelectItem>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="salary">
              <AccordionTrigger className="text-sm font-medium hover:text-blue-600">Minimum Salary</AccordionTrigger>
              <AccordionContent>
                <Select value={filters.salaryMin} onValueChange={(value) => handleFilterUpdate("salaryMin", value)}>
                  <SelectTrigger className="h-10 focus:border-blue-300 focus:ring-blue-300">
                    <SelectValue placeholder="Any salary" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={null}>Any salary</SelectItem>
                    {salaryRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}