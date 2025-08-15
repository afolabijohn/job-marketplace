import React from 'react';
import { Card, CardContent } from '../../components/ui/card';

export default function StatCard({ title, value, icon: Icon, trend, className = '' }) {
  return (
    <Card className={`border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            {trend && (
              <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? '+' : ''}{trend}% from last month
              </p>
            )}
          </div>
          {Icon && (
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6 text-white" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 