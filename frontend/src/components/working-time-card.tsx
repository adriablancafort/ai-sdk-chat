import { cn } from "@/lib/utils";
import { ClockIcon, CalendarIcon, CoffeeIcon, TrendingUpIcon } from "lucide-react";
import { format } from "date-fns";

type WorkingTimeData = {
  employeeId: string;
  employeeName: string;
  date: string;
  clockIn?: string;
  clockOut?: string;
  totalHours: number;
  status: string;
  breaks: Array<{
    start: string;
    end: string;
    duration: number;
  }>;
  weeklyHours: number;
  overtimeHours: number;
};

export function WorkingTimeCard({ workingTime }: { workingTime: WorkingTimeData }) {
  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "h:mm a");
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "EEEE, MMMM d, yyyy");
  };

  const isWorking = workingTime.status === 'working';

  return (
    <div className={cn(
      "relative flex w-full flex-col gap-4 rounded-2xl p-6 shadow-lg overflow-hidden bg-gradient-to-br",
      isWorking 
        ? "from-green-500 via-emerald-500 to-teal-500" 
        : "from-slate-600 via-gray-600 to-zinc-600"
    )}>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white text-xl font-semibold">{workingTime.employeeName}</h3>
              <p className="text-white/70 text-sm">{workingTime.employeeId}</p>
            </div>
          </div>
          <div className={cn(
            "flex items-center gap-2 px-3 py-1 rounded-full",
            isWorking ? "bg-white/20" : "bg-white/10"
          )}>
            <div className={cn(
              "w-2 h-2 rounded-full",
              isWorking ? "bg-white animate-pulse" : "bg-white/50"
            )} />
            <span className="text-white text-sm font-medium capitalize">{workingTime.status}</span>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm mb-4">
          <div className="flex items-center gap-2 mb-2">
            <CalendarIcon className="w-4 h-4 text-white/70" />
            <span className="text-white text-sm">{formatDate(workingTime.date)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <span className="text-white/70 text-xs font-medium uppercase block mb-1">Clock In</span>
            <p className="text-white text-lg font-semibold">
              {workingTime.clockIn ? formatTime(workingTime.clockIn) : '-'}
            </p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <span className="text-white/70 text-xs font-medium uppercase block mb-1">Clock Out</span>
            <p className="text-white text-lg font-semibold">
              {workingTime.clockOut ? formatTime(workingTime.clockOut) : 'Active'}
            </p>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm mb-4">
          <div className="text-center">
            <span className="text-white/70 text-sm font-medium uppercase block mb-2">Total Hours Today</span>
            <p className="text-white text-4xl font-bold">{workingTime.totalHours.toFixed(1)}</p>
            <span className="text-white/70 text-sm">hours</span>
          </div>
        </div>

        {workingTime.breaks.length > 0 && (
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm mb-4">
            <div className="flex items-center gap-2 mb-3">
              <CoffeeIcon className="w-4 h-4 text-white/70" />
              <span className="text-white/70 text-xs font-medium uppercase">Breaks</span>
            </div>
            {workingTime.breaks.map((breakItem, index) => (
              <div key={index} className="flex justify-between items-center text-white text-sm mb-2">
                <span>{formatTime(breakItem.start)} - {formatTime(breakItem.end)}</span>
                <span className="text-white/70">{breakItem.duration}h</span>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <span className="text-white/70 text-xs font-medium uppercase block mb-1">Weekly Hours</span>
            <p className="text-white text-xl font-semibold">{workingTime.weeklyHours}h</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUpIcon className="w-3 h-3 text-white/70" />
              <span className="text-white/70 text-xs font-medium uppercase">Overtime</span>
            </div>
            <p className="text-white text-xl font-semibold">{workingTime.overtimeHours}h</p>
          </div>
        </div>
      </div>
    </div>
  );
}

