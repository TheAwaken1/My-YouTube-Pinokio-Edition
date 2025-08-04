module.exports = {
  daemon: true,  // Run as a background process
  run: [
    {
      method: "shell.run",
      params: {
        venv: "env",  // Use the virtual env
        env: {  // Environment variables for Ollama integration (adjust AI_MODEL if needed)
          AI_HOST: "http://127.0.0.1:11434",
          AI_ENDPOINT: "/v1/chat/completions",
          AI_MODEL: "deepseek-r1:14b",  // Or your preferred model, e.g., "llama3.1"
          AI_TEMPERATURE: "0",
          AI_APIKEY: ""  // Empty for local Ollama
        },
        path: "app",  // Relative to the app folder (my-yt)
        message: [
          "npm start"  // Launch the server
        ],
        on: [{
          // Wait for the server to log a URL (e.g., http://localhost:3000)
          "event": "/http:\\/\\/\\S+/",
          "done": true  // Proceed once matched, keep shell alive
        }]
      }
    },
    {
      method: "local.set",
      params: {
        // Set the app URL for Pinokio's "Open WebUI" tab
        url: "{{input.event[0]}}"
      }
    }
  ]
};

