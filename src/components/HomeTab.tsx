import { RiBuilding4Line } from 'react-icons/ri';
import { JobCard } from './JobCard';

interface HomeTabProps {
    processedJobs: any[];
    targetCompanies: string[];
    onEditTargets: () => void;
}

export const HomeTab = ({ processedJobs, targetCompanies, onEditTargets }: HomeTabProps) => {
    const matches = processedJobs.filter(j => j.isMatch);

    return (
        <div className="flex flex-col gap-6 animate-slide-up">
            {/* Hero */}
            <section className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81] p-10 rounded-[40px] border border-white/10 text-center">
                <h2 className="text-[1.8rem] font-extrabold mb-1 text-white">Hi, Farhan 👋</h2>
                <p className="text-[#a5b4fc] font-medium text-[0.95rem] mb-6">Fullstack Developer | India</p>
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/10 p-3 rounded-[20px]">
                        <span className="block text-[0.6rem] text-[#c7d2fe] uppercase font-bold mb-1">Fits</span>
                        <strong className="text-[1.2rem] text-white underline decoration-[#6366f1] underline-offset-4">{matches.length}</strong>
                    </div>
                    <div className="bg-white/10 p-3 rounded-[20px]">
                        <span className="block text-[0.6rem] text-[#c7d2fe] uppercase font-bold mb-1">Track</span>
                        <strong className="text-[1.2rem] text-white underline decoration-[#6366f1] underline-offset-4">{targetCompanies.length}</strong>
                    </div>
                    <div className="bg-white/10 p-3 rounded-[20px]">
                        <span className="block text-[0.6rem] text-[#c7d2fe] uppercase font-bold mb-1">Score</span>
                        <strong className="text-[1.2rem] text-white underline decoration-[#6366f1] underline-offset-4">98%</strong>
                    </div>
                </div>
            </section>

            {/* Priority Tracks */}
            <section className="bg-[#0d0d12] p-6 rounded-[32px] border border-white/5">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-[1.1rem] font-extrabold text-white">Priority Tracks</h3>
                    <button onClick={onEditTargets} className="bg-[#6366f111] text-[#6366f1] px-3.5 py-1.5 rounded-xl font-bold text-xs">Edit</button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                    {targetCompanies.slice(0, 4).map(c => (
                        <div key={c} className="bg-white/5 border border-white/5 aspect-square rounded-[22px] flex flex-col items-center justify-center gap-1.5 text-center">
                            <div className="text-[1.4rem] text-[#6366f1]"><RiBuilding4Line /></div>
                            <span className="text-[0.6rem] font-bold text-[#94a3b8] uppercase truncate px-1 w-full">{c}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pulse Feed */}
            <section className="flex flex-col">
                <div className="flex justify-between items-center mb-4 uppercase tracking-widest text-[0.7rem] font-black text-white px-1">
                    <h3>Hiring Pulse</h3>
                    <span className="flex items-center gap-1 text-[#ef4444]">
                        <div className="w-1.5 h-1.5 bg-[#ef4444] rounded-full animate-pulse"></div> LIVE
                    </span>
                </div>
                <div>
                    {processedJobs.slice(0, 6).map(job => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>
            </section>
        </div>
    );
};
