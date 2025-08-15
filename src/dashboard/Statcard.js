import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export default function StatCard({ icon: Icon, title, value, description, color }) {
    const colors = {
        blue: 'from-blue-500 to-indigo-500',
        orange: 'from-orange-500 to-amber-500',
        indigo: 'from-indigo-500 to-violet-500',
        slate: 'from-slate-500 to-slate-600',
    };
    const iconColors = {
        blue: 'bg-blue-100 text-blue-600',
        orange: 'bg-orange-100 text-orange-600',
        indigo: 'bg-indigo-100 text-indigo-600',
        slate: 'bg-slate-100 text-slate-600',
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div variants={itemVariants} className="h-full">
            <Card className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full bg-white group transform hover:-translate-y-1">
                 <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${colors[color]} rounded-t-lg`}></div>
                <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div>
                        <div className={`w-12 h-12 ${iconColors[color]} rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
                        <p className="text-3xl font-bold text-slate-900">{value}</p>
                    </div>
                    {description && <p className="text-xs text-slate-400 mt-2">{description}</p>}
                </CardContent>
            </Card>
        </motion.div>
    );
}