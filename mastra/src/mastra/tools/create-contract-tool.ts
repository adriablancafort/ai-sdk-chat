import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const createContractTool = createTool({
  id: 'create-contract',
  description: 'Create a new employment contract',
  inputSchema: z.object({
    employeeId: z.string().describe('Employee ID'),
    contractType: z.enum(['full-time', 'part-time', 'contractor', 'intern']).describe('Type of contract'),
    startDate: z.string().describe('Contract start date (YYYY-MM-DD)'),
    endDate: z.string().optional().describe('Contract end date (YYYY-MM-DD), optional for permanent contracts'),
    salary: z.number().describe('Salary amount'),
    workingHours: z.number().describe('Weekly working hours'),
  }),
  outputSchema: z.object({
    contractId: z.string(),
    employeeId: z.string(),
    contractType: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    salary: z.number(),
    workingHours: z.number(),
    status: z.string(),
    createdAt: z.string(),
  }),
  execute: async ({ context }) => {
    // Simulate creating contract in database
    const contractId = `CTR-${Date.now().toString().slice(-6)}`;
    
    return {
      contractId,
      employeeId: context.employeeId,
      contractType: context.contractType,
      startDate: context.startDate,
      endDate: context.endDate,
      salary: context.salary,
      workingHours: context.workingHours,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
  },
});

