import { Pipe, getRunner } from "@baseai/core";
import pipeOllamaPipe from "./baseai/pipes/ollama-pipe";

// Instantiate the pipe
const pipe = new Pipe({
  ...pipeOllamaPipe(),
});

const messagesDiv = document.getElementById("messages")!;
const userInput = document.getElementById("user-input") as HTMLInputElement;

async function sendMessage() {
  const userMsg = userInput.value.trim();
  if (!userMsg) return;

  // Add user message to chat
  messagesDiv.innerHTML += `<p><strong>You:</strong> ${userMsg}</p>`;
  userInput.value = "";

  // Create a paragraph for the AI response
  const aiParagraph = document.createElement("p");
  aiParagraph.innerHTML = "<strong>AI:</strong> ";
  const aiResponse = document.createElement("span");
  aiParagraph.appendChild(aiResponse);
  messagesDiv.appendChild(aiParagraph);

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2:latest",
        prompt: userMsg,
        stream: true,
      }),
    });

    const reader = response.body?.getReader();
    if (!reader) throw new Error("Failed to get response reader");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Convert the chunk to text and parse JSON
      const chunk = new TextDecoder().decode(value);
      const lines = chunk.split("\n").filter(Boolean);

      for (const line of lines) {
        try {
          const json = JSON.parse(line);
          aiResponse.textContent += json.response;
        } catch (e) {
          console.error("Failed to parse JSON:", e);
        }
      }
    }
  } catch (error) {
    console.error("Error:", error);
    aiResponse.textContent = "Error occurred while sending message.";
  }

  // Scroll to bottom
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Add event listener for Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Expose sendMessage to window
window.sendMessage = sendMessage;

// Add TypeScript declaration for the global function
declare global {
  interface Window {
    sendMessage: () => Promise<void>;
  }
}
