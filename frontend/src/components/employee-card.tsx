import { UserIcon, MailIcon, BriefcaseIcon, CalendarIcon, DollarSignIcon, CheckCircleIcon } from "lucide-react";

type EmployeeData = {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  position: string;
  startDate: string;
  salary: number;
  status: string;
  createdAt: string;
};

export function EmployeeCard({ employee }: { employee: EmployeeData }) {
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

  return (
    <div className="relative flex w-full flex-col gap-4 rounded-2xl p-6 shadow-lg overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white text-xl font-semibold">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-white/70 text-sm">{employee.employeeId}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
            <CheckCircleIcon className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium capitalize">{employee.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <MailIcon className="w-4 h-4 text-white/70" />
              <span className="text-white/70 text-xs font-medium uppercase">Email</span>
            </div>
            <p className="text-white text-sm">{employee.email}</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <BriefcaseIcon className="w-4 h-4 text-white/70" />
              <span className="text-white/70 text-xs font-medium uppercase">Position</span>
            </div>
            <p className="text-white text-sm font-medium">{employee.position}</p>
            <p className="text-white/70 text-xs">{employee.department}</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className="w-4 h-4 text-white/70" />
              <span className="text-white/70 text-xs font-medium uppercase">Start Date</span>
            </div>
            <p className="text-white text-sm">{formatDate(employee.startDate)}</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <DollarSignIcon className="w-4 h-4 text-white/70" />
              <span className="text-white/70 text-xs font-medium uppercase">Annual Salary</span>
            </div>
            <p className="text-white text-lg font-semibold">{formatSalary(employee.salary)}</p>
          </div>
        </div>

        <div className="mt-4 text-white/60 text-xs text-center">
          Created on {formatDate(employee.createdAt)}
        </div>
      </div>
    </div>
  );
}

