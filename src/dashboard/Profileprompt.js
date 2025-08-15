import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { User, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function ProfilePrompt({ user }) {
    const calculateProfileCompletion = () => {
        let score = 0;
        if(user.full_name) score += 10;
        if(user.bio) score += 20;
        if(user.skills && user.skills.length > 0) score += 20;
        if(user.experience_years) score += 10;
        if(user.location) score += 10;
        if(user.linkedin_url) score += 10;
        if(user.portfolio_url) score += 10;
        if(user.resume_url) score += 10;
        return Math.min(score, 100);
    }
    
    const completion = calculateProfileCompletion();

    return (
        <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
                 <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <User className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800">Profile Completion</h3>
                <p className="text-sm text-slate-500 mb-4">A complete profile gets you noticed.</p>

                <div className="w-full text-left mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-blue-700">Progress</span>
                        <span className="text-xs font-medium text-blue-700">{completion}%</span>
                    </div>
                    <Progress value={completion} className="h-2" />
                </div>

                <Button asChild className="w-full">
                    <Link to={createPageUrl("Profile")}>
                        {completion < 100 ? 'Complete Your Profile' : 'Update Profile'}
                        <ArrowRight className="w-4 h-4 ml-2"/>
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}