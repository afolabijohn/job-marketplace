import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { User, ArrowRight } from 'lucide-react';

export default function ProfilePrompt({ user = null }) {
  const profileCompletion = user?.profile_completion || 65;
  
  if (profileCompletion >= 80) {
    return null; // Don't show prompt if profile is mostly complete
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Complete Your Profile
            </h3>
            <p className="text-slate-600 mb-4">
              Your profile is {profileCompletion}% complete. Add more details to get better job matches and increase your chances of being hired.
            </p>
            <div className="flex items-center space-x-2">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                Complete Profile
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <span className="text-sm text-slate-500">
                {100 - profileCompletion}% remaining
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 