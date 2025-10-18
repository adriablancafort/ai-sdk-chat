import { cn } from "@/lib/utils";
import { FileTextIcon, CalendarIcon, DollarSignIcon, ClockIcon, CheckCircleIcon } from "lucide-react";

type ContractData = {
  contractId: string;
  employeeId: string;
  contractType: string;
  startDate: string;
  endDate?: string;
  salary: number;
  workingHours: number;
  status: string;
  createdAt: string;
};

export function ContractCard({ contract }: { contract: ContractData }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getContractTypeColor = () => {
    switch (contract.contractType) {
      case 'full-time':
        return 'from-blue-500 via-indigo-500 to-purple-500';
      case 'part-time':
        return 'from-violet-500 via-purple-500 to-fuchsia-500';
      case 'contractor':
        return 'from-orange-500 via-amber-500 to-yellow-500';
      case 'intern':
        return 'from-pink-500 via-rose-500 to-red-500';
      default:
        return 'from-gray-500 via-slate-500 to-zinc-500';
    }
  };

  return (
    <div className={cn(
      "relative flex w-full flex-col gap-4 rounded-2xl p-6 shadow-lg overflow-hidden bg-gradient-to-br",
      getContractTypeColor()
    )}>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <FileTextIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white text-xl font-semibold">Employment Contract</h3>
              <p className="text-white/70 text-sm">{contract.contractId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
            <CheckCircleIcon className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium capitalize">{contract.status}</span>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm mb-4">
          <div className="flex items-center justify-between">
            <span className="text-white/70 text-sm">Contract Type</span>
            <span className="text-white text-lg font-semibold capitalize">
              {contract.contractType.replace('-', ' ')}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className="w-4 h-4 text-white/70" />
              <span className="text-white/70 text-xs font-medium uppercase">Start Date</span>
            </div>
            <p className="text-white text-sm">{formatDate(contract.startDate)}</p>
          </div>

          {contract.endDate && (
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <CalendarIcon className="w-4 h-4 text-white/70" />
                <span className="text-white/70 text-xs font-medium uppercase">End Date</span>
              </div>
              <p className="text-white text-sm">{formatDate(contract.endDate)}</p>
            </div>
          )}

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSignIcon className="w-4 h-4 text-white/70" />
              <span className="text-white/70 text-xs font-medium uppercase">Salary</span>
            </div>
            <p className="text-white text-lg font-semibold">{formatSalary(contract.salary)}</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <ClockIcon className="w-4 h-4 text-white/70" />
              <span className="text-white/70 text-xs font-medium uppercase">Working Hours</span>
            </div>
            <p className="text-white text-lg font-semibold">{contract.workingHours} hrs/week</p>
          </div>
        </div>

        <div className="mt-4 bg-white/10 rounded-xl p-3 backdrop-blur-sm">
          <p className="text-white/70 text-xs">
            <span className="font-medium">Employee ID:</span> {contract.employeeId}
          </p>
        </div>

        <div className="mt-4 text-white/60 text-xs text-center">
          Created on {formatDate(contract.createdAt)}
        </div>
      </div>
    </div>
  );
}

