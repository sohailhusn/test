import { Pipe } from "@baseai/core";

const pipe = new Pipe({
  prod: false,
  pipe: {
    name: "test-pipe",
    status: "public",
    model: "ollama:llama3.2:1b",
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

console.log("Pipe configuration:", pipe);
