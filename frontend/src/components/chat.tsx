import { DefaultChatTransport } from "ai"
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
 
export function Chat() {
  const [inputValue, setInputValue] = useState('')
  const { messages, sendMessage} = useChat({
    transport: new DefaultChatTransport({
      api: import.meta.env.VITE_MASTRA_API_URL + '/chat',
    }),
  });
 
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({ text: inputValue });
  };
 
  return (
    <div>
      <pre>{JSON.stringify(messages, null, 2)}</pre>
      <form onSubmit={handleFormSubmit}>
        <input value={inputValue} onChange={e=>setInputValue(e.target.value)} placeholder="Name of city" />
      </form>
    </div>
  );
}

export default Chat;
