import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { TrendingUp, Target, Award } from 'lucide-react';

export default function CareerProgress({ user = null }) {
  const progressData = [
    {
      title: "Profile Completion",
      value: user?.profile_completion || 65,
      icon: Target,
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Applications",
      value: user?.total_applications || 8,
      icon: TrendingUp,
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Interviews",
      value: user?.total_interviews || 3,
      icon: Award,
      color: "from-orange-500 to-amber-600"
    }
  ];

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900">Career Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {progressData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center`}>
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.value}</p>
                  </div>
                </div>
                {item.title === "Profile Completion" && (
                  <span className="text-sm font-medium text-slate-600">{item.value}%</span>
                )}
              </div>
              {item.title === "Profile Completion" && (
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 