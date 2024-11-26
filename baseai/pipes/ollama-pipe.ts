import { PipeI } from "@baseai/core";

const pipeOllamaPipe = () => ({
  prod: false,
  pipe: {
    name: "ollama-pipe",
    status: "public",
    model: "llama3.2:latest",
    top_p: 1,
    max_tokens: 2000,
    temperature: 0.7,
    stream: true,
    messages: [{ role: "system", content: "You are a helpful AI assistant." }],
  },
  request: {
    config: {
      baseUrl: "http://localhost:11434",
    },
  },
});

export default pipeOllamaPipe;
