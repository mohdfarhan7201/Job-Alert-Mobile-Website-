import { FiBell, FiBriefcase, FiUser, FiChevronRight } from 'react-icons/fi';

interface ProfileTabProps {
    processedJobs: any[];
    targetCompanies: string[];
}

export const ProfileTab = ({ processedJobs, targetCompanies }: ProfileTabProps) => {
    return (
        <div className="flex flex-col gap-6 animate-slide-up">
            <div className="bg-profile-gradient p-11 rounded-[40px] text-center border border-white/10 shadow-2xl relative overflow-hidden">
                <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Farhan"
                    className="w-28 h-28 rounded-[32px] border-4 border-white/10 mx-auto shadow-2xl"
                    alt="profile"
                />
                <h2 className="text-3xl font-extrabold mt-5 mb-1">Mohd Farhan</h2>
                <p className="text-indigo-200 font-medium text-base">Fullstack Developer | India</p>

                <div className="grid grid-cols-3 gap-3 mt-8">
                    <div className="bg-white/10 p-3.5 rounded-2xl flex flex-col items-center">
                        <span className="text-[10px] text-indigo-200 uppercase font-bold tracking-widest mb-1">Fits</span>
                        <strong className="text-xl leading-none">{processedJobs.filter(j => j.isMatch).length}</strong>
                    </div>
                    <div className="bg-white/10 p-3.5 rounded-2xl flex flex-col items-center">
                        <span className="text-[10px] text-indigo-200 uppercase font-bold tracking-widest mb-1">Track</span>
                        <strong className="text-xl leading-none">{targetCompanies.length}</strong>
                    </div>
                    <div className="bg-white/10 p-3.5 rounded-2xl flex flex-col items-center">
                        <span className="text-[10px] text-indigo-200 uppercase font-bold tracking-widest mb-1">Score</span>
                        <strong className="text-xl leading-none">98%</strong>
                    </div>
                </div>
            </div>

            <div className="bg-app-surface border border-white/5 rounded-[32px] p-2.5 shadow-xl">
                <div className="flex items-center gap-4 p-4.5 rounded-3xl hover:bg-white/5 transition-all cursor-pointer group">
                    <div className="w-11 h-11 bg-app-accent/10 rounded-2xl flex items-center justify-center text-app-accent text-xl group-hover:bg-app-accent group-hover:text-white transition-all">
                        <FiBell />
                    </div>
                    <div className="flex-1">
                        <strong className="block text-base">Smart Alerts</strong>
                        <span className="text-xs text-app-text-secondary">Get hiring notifications</span>
                    </div>
                    <FiChevronRight className="text-app-text-secondary text-xl" />
                </div>

                <div className="flex items-center gap-4 p-4.5 rounded-3xl hover:bg-white/5 transition-all cursor-pointer group">
                    <div className="w-11 h-11 bg-app-accent/10 rounded-2xl flex items-center justify-center text-app-accent text-xl group-hover:bg-app-accent group-hover:text-white transition-all">
                        <FiBriefcase />
                    </div>
                    <div className="flex-1">
                        <strong className="block text-base">Resume Sync</strong>
                        <span className="text-xs text-app-text-secondary">Active • 2 days ago</span>
                    </div>
                    <FiChevronRight className="text-app-text-secondary text-xl" />
                </div>

                <div className="flex items-center gap-4 p-4.5 rounded-3xl hover:bg-white/5 transition-all cursor-pointer group">
                    <div className="w-11 h-11 bg-app-accent/10 rounded-2xl flex items-center justify-center text-app-accent text-xl group-hover:bg-app-accent group-hover:text-white transition-all">
                        <FiUser />
                    </div>
                    <div className="flex-1">
                        <strong className="block text-base">Privacy Settings</strong>
                        <span className="text-xs text-app-text-secondary">Only verified hiring</span>
                    </div>
                    <FiChevronRight className="text-app-text-secondary text-xl" />
                </div>
            </div>
        </div>
    );
};
