import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { UploadFile } from "@/integrations/Core";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { motion } from "framer-motion";
import { 
  User as UserIcon, 
  Camera, 
  MapPin, 
  Briefcase, 
  Globe, 
  Linkedin, 
  FileText,
  Plus,
  X,
  Save,
  Building,
  Award,
  Target
} from "lucide-react";

import ProfileHeader from "../components/profile/ProfileHeader";
import PersonalInfoForm from "../components/profile/PersonalInfoForm";
import SkillsSection from "../components/profile/SkillsSection";
import ExperienceSection from "../components/profile/ExperienceSection";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [activeTab, setActiveTab] = useState("personal");
    const [profileData, setProfileData] = useState({
        bio: "",
        skills: [],
        experience_years: 0,
        location: "",
        linkedin_url: "",
        portfolio_url: "",
        company_size: "",
        industry: "",
        resume_url: "",
        user_type: "candidate"
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        setIsLoading(true);
        try {
            const currentUser = await User.me();
            setUser(currentUser);
            setProfileData({
                bio: currentUser.bio || "",
                skills: currentUser.skills || [],
                experience_years: currentUser.experience_years || 0,
                location: currentUser.location || "",
                linkedin_url: currentUser.linkedin_url || "",
                portfolio_url: currentUser.portfolio_url || "",
                company_size: currentUser.company_size || "",
                industry: currentUser.industry || "",
                resume_url: currentUser.resume_url || "",
                user_type: currentUser.user_type || "candidate"
            });
        } catch (error) {
            console.error("Error loading profile:", error);
        }
        setIsLoading(false);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await User.updateMyUserData(profileData);
            setUser({ ...user, ...profileData });
            // Show success message (you could add a toast notification here)
        } catch (error) {
            console.error("Error saving profile:", error);
        }
        setIsSaving(false);
    };

    const calculateProfileCompletion = () => {
        let score = 0;
        const fields = [
            { field: 'bio', weight: 20 },
            { field: 'skills', weight: 20, isArray: true },
            { field: 'experience_years', weight: 10 },
            { field: 'location', weight: 10 },
            { field: 'linkedin_url', weight: 10 },
            { field: 'portfolio_url', weight: 10 },
            { field: 'industry', weight: 10 },
            { field: 'resume_url', weight: 10 }
        ];

        fields.forEach(({ field, weight, isArray }) => {
            const value = profileData[field];
            if (isArray && Array.isArray(value) && value.length > 0) {
                score += weight;
            } else if (!isArray && value) {
                score += weight;
            }
        });

        return Math.min(score, 100);
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
            },
        },
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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20 flex items-center justify-center">
                <div className="animate-pulse text-center">
                    <UserIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20 flex items-center justify-center">
                <Card className="border-0 shadow-lg p-8">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">Please log in to view your profile</h2>
                        <Button>Go to Home</Button>
                    </div>
                </Card>
            </div>
        );
    }

    const completion = calculateProfileCompletion();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Profile Header */}
                    <motion.div variants={itemVariants}>
                        <ProfileHeader 
                            user={user} 
                            completion={completion}
                            onSave={handleSave}
                            isSaving={isSaving}
                        />
                    </motion.div>

                    {/* Profile Content */}
                    <motion.div variants={itemVariants} className="mt-8">
                        <Card className="border-0 shadow-lg">
                            <CardContent className="p-0">
                                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                    <div className="border-b border-slate-200">
                                        <TabsList className="h-14 w-full justify-start rounded-none bg-transparent p-0">
                                            <TabsTrigger 
                                                value="personal" 
                                                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none px-6 py-4"
                                            >
                                                <UserIcon className="w-4 h-4 mr-2" />
                                                Personal Info
                                            </TabsTrigger>
                                            <TabsTrigger 
                                                value="skills" 
                                                className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700 data-[state=active]:border-b-2 data-[state=active]:border-orange-600 rounded-none px-6 py-4"
                                            >
                                                <Award className="w-4 h-4 mr-2" />
                                                Skills & Experience
                                            </TabsTrigger>
                                            <TabsTrigger 
                                                value="preferences" 
                                                className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 rounded-none px-6 py-4"
                                            >
                                                <Target className="w-4 h-4 mr-2" />
                                                Preferences
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>

                                    <div className="p-8">
                                        <TabsContent value="personal" className="mt-0">
                                            <PersonalInfoForm 
                                                profileData={profileData}
                                                setProfileData={setProfileData}
                                            />
                                        </TabsContent>

                                        <TabsContent value="skills" className="mt-0">
                                            <div className="space-y-8">
                                                <SkillsSection 
                                                    profileData={profileData}
                                                    setProfileData={setProfileData}
                                                />
                                                <ExperienceSection 
                                                    profileData={profileData}
                                                    setProfileData={setProfileData}
                                                />
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="preferences" className="mt-0">
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Job Preferences</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div>
                                                            <Label htmlFor="user_type">Account Type</Label>
                                                            <Select 
                                                                value={profileData.user_type} 
                                                                onValueChange={(value) => setProfileData({...profileData, user_type: value})}
                                                            >
                                                                <SelectTrigger className="mt-2">
                                                                    <SelectValue placeholder="Select account type" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="candidate">Job Seeker</SelectItem>
                                                                    <SelectItem value="employer">Employer</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        
                                                        {profileData.user_type === "employer" && (
                                                            <div>
                                                                <Label htmlFor="company_size">Company Size</Label>
                                                                <Select 
                                                                    value={profileData.company_size} 
                                                                    onValueChange={(value) => setProfileData({...profileData, company_size: value})}
                                                                >
                                                                    <SelectTrigger className="mt-2">
                                                                        <SelectValue placeholder="Select company size" />
                                                                    </SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="1-10">1-10 employees</SelectItem>
                                                                        <SelectItem value="11-50">11-50 employees</SelectItem>
                                                                        <SelectItem value="51-200">51-200 employees</SelectItem>
                                                                        <SelectItem value="201-1000">201-1000 employees</SelectItem>
                                                                        <SelectItem value="1000+">1000+ employees</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </div>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Save Button */}
                    <motion.div variants={itemVariants} className="mt-8 flex justify-end">
                        <Button 
                            onClick={handleSave}
                            disabled={isSaving}
                            size="lg"
                            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 hover:from-blue-700 hover:via-indigo-700 hover:to-orange-600 text-white shadow-lg px-8"
                        >
                            {isSaving ? (
                                <>
                                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}