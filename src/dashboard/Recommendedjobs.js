import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Briefcase, MapPin, Building } from 'lucide-react';

export default function RecommendedJobs({ jobs }) {
    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-orange-500"/>
                        Recommended For You
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                {jobs.length > 0 ? (
                    <div className="space-y-4">
                        {jobs.map(job => (
                            <Link to={createPageUrl(`JobDetail?id=${job.id}`)} key={job.id} className="block p-4 rounded-xl bg-slate-50/70 hover:bg-white border border-transparent hover:border-slate-200 transition-all duration-300 group">
                                <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{job.title}</p>
                                <div className="flex items-center text-sm text-slate-500 mt-1">
                                    <Building className="w-4 h-4 mr-2"/>
                                    <span>{job.company}</span>
                                    <span className="mx-2">·</span>
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span>{job.location}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-6">
                        <p className="text-slate-500">No recommendations right now.</p>
                        <p className="text-xs text-slate-400">Complete your profile for better matches!</p>
                    </div>
                )}
                 <Button variant="ghost" size="sm" asChild className="w-full mt-4">
                    <Link to={createPageUrl("Jobs")}>
                        Browse All Jobs <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}