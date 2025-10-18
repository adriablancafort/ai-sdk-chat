import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { createEmployeeTool } from '../tools/create-employee-tool';
import { createContractTool } from '../tools/create-contract-tool';
import { checkWorkingTimeTool } from '../tools/check-working-time-tool';

export const hrAgent = new Agent({
  name: 'HR Assistant',
  instructions: `You are a helpful HR assistant that helps manage employees, contracts, and working time.
  
When users want to:
- Create an employee: use the create-employee tool
- Create a contract: use the create-contract tool
- Check working time: use the check-working-time tool

Always provide brief, professional responses. The data will be displayed visually in cards.`,
  model: openai('gpt-4o-mini'),
  tools: { 
    createEmployeeTool,
    createContractTool,
    checkWorkingTimeTool,
  },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db',
    }),
  }),
});
