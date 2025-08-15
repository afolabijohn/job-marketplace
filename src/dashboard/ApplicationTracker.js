import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Building, Clock, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function ApplicationTracker({ applications }) {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'reviewing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'interview': return 'bg-green-100 text-green-800 border-green-200';
            case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
            case 'hired': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <Card className="border-0 shadow-lg">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="w-6 h-6 text-blue-600"/>
                        Application Tracker
                    </CardTitle>
                    <Button variant="ghost" size="sm" asChild>
                        <Link to="#">
                            View All <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {applications.length > 0 ? (
                    <div className="space-y-4">
                        {applications.map(app => (
                            <div key={app.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-slate-50/70 hover:bg-white border border-transparent hover:border-slate-200 transition-all duration-300">
                                <div className="flex-1 mb-4 sm:mb-0">
                                    <p className="font-bold text-slate-800">{app.job.title}</p>
                                    <div className="flex items-center text-sm text-slate-500 mt-1">
                                        <Building className="w-4 h-4 mr-2"/>
                                        <span>{app.job.company}</span>
                                        <span className="mx-2">·</span>
                                        <Clock className="w-4 h-4 mr-1" />
                                        Applied {formatDistanceToNow(new Date(app.created_date), { addSuffix: true })}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 w-full sm:w-auto">
                                <Badge className={`capitalize border ${getStatusBadge(app.status)}`}>{app.status}</Badge>
                                <Button variant="outline" size="sm" asChild className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800">
                                    <Link to={createPageUrl(`JobDetail?id=${app.job.id}`)}>View Job</Link>
                                </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-slate-500 mb-4">You haven't applied to any jobs yet.</p>
                        <Button asChild className="bg-gradient-to-r from-blue-600 to-orange-500 text-white">
                            <Link to={createPageUrl("Jobs")}>Find Your First Opportunity</Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}