import { FiTarget } from 'react-icons/fi';
import { RiUserSearchLine } from 'react-icons/ri';

interface TargetsTabProps {
    targetCompanies: string[];
    setTargetCompanies: (val: string[]) => void;
    targetRoles: string[];
    setTargetRoles: (val: string[]) => void;
    newCompany: string;
    setNewCompany: (val: string) => void;
    newRole: string;
    setNewRole: (val: string) => void;
    onAddTarget: (val: string, setVal: any, type: 'Co' | 'Ro') => void;
}

export const TargetsTab = ({
    targetCompanies, setTargetCompanies,
    targetRoles, setTargetRoles,
    newCompany, setNewCompany,
    newRole, setNewRole,
    onAddTarget
}: TargetsTabProps) => {
    return (
        <div className="flex flex-col gap-5 animate-slide-up">
            <div className="bg-[#0d0d12] border border-white/10 rounded-[32px] p-6">
                <h4 className="flex items-center gap-2.5 text-[1.1rem] font-bold mb-4 text-white">
                    <FiTarget className="text-[#6366f1]" /> Tracking Companies
                </h4>
                <div className="flex bg-white/5 rounded-[20px] border border-white/5 mb-5 p-1.5 focus-within:border-[#6366f1] transition-all">
                    <input
                        placeholder="Add (e.g. Amazon)"
                        className="flex-1 bg-transparent border-none text-white px-4 py-2 outline-none text-sm"
                        value={newCompany}
                        onChange={e => setNewCompany(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && onAddTarget(newCompany, setNewCompany, 'Co')}
                    />
                    <button
                        onClick={() => onAddTarget(newCompany, setNewCompany, 'Co')}
                        className="bg-[#6366f1] text-white rounded-[16px] px-5 font-bold text-sm h-10 hover:opacity-90 active:scale-95 transition-all"
                    >
                        Track
                    </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                    {targetCompanies.map(c => (
                        <div key={c} className="bg-[#6366f114] border border-[#6366f133] px-3.5 py-1.5 rounded-[14px] text-[0.8rem] font-bold text-white flex items-center gap-2">
                            {c}
                            <button
                                className="text-[#ef4444] text-[1.1rem] leading-none ml-1"
                                onClick={() => setTargetCompanies(targetCompanies.filter(x => x !== c))}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[#0d0d12] border border-white/10 rounded-[32px] p-6">
                <h4 className="flex items-center gap-2.5 text-[1.1rem] font-bold mb-4 text-white">
                    <RiUserSearchLine className="text-[#6366f1]" /> Target Roles
                </h4>
                <div className="flex bg-white/5 rounded-[20px] border border-white/5 mb-5 p-1.5 focus-within:border-[#6366f1] transition-all">
                    <input
                        placeholder="Add (e.g. SDE II)"
                        className="flex-1 bg-transparent border-none text-white px-4 py-2 outline-none text-sm"
                        value={newRole}
                        onChange={e => setNewRole(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && onAddTarget(newRole, setNewRole, 'Ro')}
                    />
                    <button
                        onClick={() => onAddTarget(newRole, setNewRole, 'Ro')}
                        className="bg-[#6366f1] text-white rounded-[16px] px-5 font-bold text-sm h-10 hover:opacity-90 active:scale-95 transition-all"
                    >
                        Watch
                    </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                    {targetRoles.map(r => (
                        <div key={r} className="bg-[#6366f114] border border-[#6366f133] px-3.5 py-1.5 rounded-[14px] text-[0.8rem] font-bold text-white flex items-center gap-2">
                            {r}
                            <button
                                className="text-[#ef4444] text-[1.1rem] leading-none ml-1"
                                onClick={() => setTargetRoles(targetRoles.filter(x => x !== r))}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
