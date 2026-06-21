interface JobCardProps {
    job: {
        id: string;
        company: string;
        role: string;
        location: string;
        applyUrl: string;
        platform?: string;
        isMatch?: boolean;
    };
}

export const JobCard = ({ job }: JobCardProps) => {
    return (
        <div
            className={`pulse-card flex items-center gap-4 p-4 rounded-[24px] mb-3 border transition-all cursor-pointer 
        ${job.isMatch
                    ? 'bg-[#6366f111] border-[#6366f1]'
                    : 'bg-[#0d0d12] border-white/5 hover:border-[#6366f155] hover:-translate-y-1'}`}
            onClick={() => window.open(job.applyUrl, '_blank')}
        >
            <div className="w-11 h-11 flex-shrink-0 bg-[#6366f1] rounded-[12px] flex items-center justify-center font-black text-xl text-white">
                {job.company[0]}
            </div>
            <div className="flex-1">
                <strong className="block text-[0.95rem] mb-0.5 text-white">{job.role}</strong>
                <span className="text-[0.75rem] text-[#94a3b8]">{job.company} • {job.location}</span>
            </div>
            <div className="flex flex-col items-end gap-1">
                {job.isMatch ? (
                    <span className="bg-[#22c55e11] text-[#22c55e] text-[0.65rem] font-extrabold px-2.5 py-1 rounded-full">
                        MATCH
                    </span>
                ) : (
                    <span className="bg-white/5 text-[#94a3b8] text-[0.65rem] px-2 py-1 rounded-md">
                        New
                    </span>
                )}
                <span className="text-[0.6rem] text-[#64748b] opacity-50 uppercase">{job.platform?.split(' ')[0] || 'Web'}</span>
            </div>
        </div>
    );
};
