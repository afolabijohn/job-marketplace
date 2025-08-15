import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Plus } from 'lucide-react';
import { Progress } from "@/components/ui/progress";


export default function CareerProgress({ user }) {
    return (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-orange-500 text-white">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white/90">
                    <TrendingUp className="w-6 h-6"/>
                    Career Path Insights
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <p className="text-sm text-blue-100 mb-1">Potential Next Role</p>
                    <p className="text-lg font-bold">Senior Data Analyst</p>
                </div>
                <div className="mb-4">
                    <p className="text-sm text-blue-100 mb-2">Est. Salary Growth</p>
                    <div className="flex items-center gap-2">
                        <Progress value={35} className="bg-white/20 [&>*]:bg-gradient-to-r [&>*]:from-orange-400 [&>*]:to-amber-400" />
                        <span className="font-semibold text-orange-300">+35%</span>
                    </div>
                </div>
                <div>
                     <p className="text-sm text-blue-100 mb-1">Key Skill to Develop</p>
                    <p className="font-semibold bg-white/20 px-2 py-1 rounded-md inline-block text-sm">Machine Learning</p>
                </div>
            </CardContent>
        </Card>
    );
}