import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const createEmployeeTool = createTool({
  id: 'create-employee',
  description: 'Create a new employee record in the HR system',
  inputSchema: z.object({
    firstName: z.string().describe('Employee first name'),
    lastName: z.string().describe('Employee last name'),
    email: z.string().email().describe('Employee email address'),
    department: z.string().describe('Department (e.g., Engineering, Marketing, HR)'),
    position: z.string().describe('Job position/title'),
    startDate: z.string().describe('Start date (YYYY-MM-DD format)'),
    salary: z.number().describe('Annual salary'),
  }),
  outputSchema: z.object({
    employeeId: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    department: z.string(),
    position: z.string(),
    startDate: z.string(),
    salary: z.number(),
    status: z.string(),
    createdAt: z.string(),
  }),
  execute: async ({ context }) => {
    // Simulate creating employee in database
    const employeeId = `EMP-${Date.now().toString().slice(-6)}`;
    
    return {
      employeeId,
      firstName: context.firstName,
      lastName: context.lastName,
      email: context.email,
      department: context.department,
      position: context.position,
      startDate: context.startDate,
      salary: context.salary,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
  },
});

