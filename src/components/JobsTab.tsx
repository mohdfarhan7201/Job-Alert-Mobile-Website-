import { FiSearch } from 'react-icons/fi';
import { JobCard } from './JobCard';

interface JobsTabProps {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    filterType: string;
    setFilterType: (val: string) => void;
    displayedJobs: any[];
}

export const JobsTab = ({
    searchQuery, setSearchQuery,
    filterType, setFilterType,
    displayedJobs
}: JobsTabProps) => {
    return (
        <div className="flex flex-col animate-slide-up px-1">
            <div className="bg-[#0d0d12] border border-white/10 p-4 rounded-[24px] mb-5 flex items-center gap-3">
                <FiSearch className="text-[#6366f1] text-[1.1rem]" />
                <input
                    placeholder="Search company or role..."
                    className="flex-1 bg-transparent border-none text-white outline-none text-[0.95rem]"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                {['All', 'Best Fits', 'Remote'].map(t => (
                    <button
                        key={t}
                        className={`px-[18px] py-2 rounded-full text-[0.75rem] font-bold whitespace-nowrap transition-all border
              ${filterType === t
                                ? 'bg-[#6366f1] text-white border-[#6366f1]'
                                : 'bg-[#0d0d12] text-[#94a3b8] border-white/10'}`}
                        onClick={() => setFilterType(t)}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="flex flex-col">
                {displayedJobs.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    );
};
