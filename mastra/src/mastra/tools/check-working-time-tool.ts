import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const checkWorkingTimeTool = createTool({
  id: 'check-working-time',
  description: 'Check current working time and attendance for an employee',
  inputSchema: z.object({
    employeeId: z.string().describe('Employee ID'),
    date: z.string().optional().describe('Date to check (YYYY-MM-DD), defaults to today'),
  }),
  outputSchema: z.object({
    employeeId: z.string(),
    employeeName: z.string(),
    date: z.string(),
    clockIn: z.string().optional(),
    clockOut: z.string().optional(),
    totalHours: z.number(),
    status: z.string(),
    breaks: z.array(z.object({
      start: z.string(),
      end: z.string(),
      duration: z.number(),
    })),
    weeklyHours: z.number(),
    overtimeHours: z.number(),
  }),
  execute: async ({ context }) => {
    // Simulate fetching working time data
    const date = context.date || new Date().toISOString().split('T')[0];
    const now = new Date();
    const clockInTime = new Date(now);
    clockInTime.setHours(9, 0, 0, 0);
    
    const hoursWorked = Math.floor(Math.random() * 4) + 6; // 6-10 hours
    const clockOutTime = new Date(clockInTime);
    clockOutTime.setHours(clockInTime.getHours() + hoursWorked);
    
    const isCurrentlyWorking = now.getHours() >= 9 && now.getHours() < 18;
    
    return {
      employeeId: context.employeeId,
      employeeName: 'John Doe',
      date,
      clockIn: clockInTime.toISOString(),
      clockOut: isCurrentlyWorking ? undefined : clockOutTime.toISOString(),
      totalHours: isCurrentlyWorking ? Math.floor((now.getTime() - clockInTime.getTime()) / (1000 * 60 * 60) * 10) / 10 : hoursWorked,
      status: isCurrentlyWorking ? 'working' : 'completed',
      breaks: [
        {
          start: new Date(clockInTime.getTime() + 4 * 60 * 60 * 1000).toISOString(),
          end: new Date(clockInTime.getTime() + 4.5 * 60 * 60 * 1000).toISOString(),
          duration: 0.5,
        },
      ],
      weeklyHours: 38.5,
      overtimeHours: 2.5,
    };
  },
});

