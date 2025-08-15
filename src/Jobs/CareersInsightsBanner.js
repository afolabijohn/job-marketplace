import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, BarChart3, Sparkles } from "lucide-react";

export default function CareerInsightsBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="border-0 bg-white/10 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">AI-Powered Career Insights</h3>
                  <p className="text-blue-100 text-sm">
                    Every job shows predicted career paths, salary growth, and skill recommendations
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-white text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <div>
                    <div className="font-semibold">85%</div>
                    <div className="text-blue-100">Accuracy</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  <div>
                    <div className="font-semibold">2.5x</div>
                    <div className="text-indigo-100">Faster Growth</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  <div>
                    <div className="font-semibold">10k+</div>
                    <div className="text-orange-100">Data Points</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}