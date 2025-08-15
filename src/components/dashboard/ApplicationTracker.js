import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function ApplicationTracker({ applications = [] }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'applied':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'interview':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-slate-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'interview':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'accepted':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900">Application Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.length === 0 ? (
            <p className="text-slate-500 text-center py-8">No applications yet. Start applying to jobs!</p>
          ) : (
            applications.map((app, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(app.status)}
                  <div>
                    <h4 className="font-medium text-slate-900">{app.job?.title || 'Job Title'}</h4>
                    <p className="text-sm text-slate-600">{app.job?.company || 'Company'}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(app.status)}>
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </Badge>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
} 