import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { MapPin, DollarSign, Star } from 'lucide-react';

export default function RecommendedJobs({ jobs = [] }) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900">Recommended Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No recommendations yet. Complete your profile for better matches!</p>
          ) : (
            jobs.map((job, index) => (
              <div key={index} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900 mb-1">{job.title}</h4>
                    <p className="text-sm text-slate-600 mb-2">{job.company}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary_min ? `$${(job.salary_min / 1000).toFixed(0)}k+` : 'Competitive'}
                      </div>
                    </div>
                  </div>
                  {job.is_featured && (
                    <Star className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.skills?.slice(0, 3).map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
} 