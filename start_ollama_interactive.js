module.exports = {
  daemon: false,  // Keep terminal open for interactive use
  run: [{
    method: "shell.run",
    params: {
      message: "ollama run deepseek-r1:1.5b"  // Default model; adjust to your AI_MODEL if needed (or make dynamic with params)
    }
  }]
};