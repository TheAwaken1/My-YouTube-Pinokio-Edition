module.exports = {
   "run": [
    {
      "method": "shell.run",
      "params": {
        "message": "git clone https://github.com/TheAwaken1/my-yt.git app",
      }
    },
    {
      "method": "script.start",
      "params": {
        "uri": "torch.js",
        "params": {
          "venv": "env",
          "path": "app"
        }
      }
    },
    {
      "method": "shell.run",
      "params": {
        "venv": "env",
        "path": "app",
        "message": "npm install"
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",  // Use Pinokio's virtual env (handles Python if needed)
        path: "app",  // Relative to the app folder (my-yt)
        message: [
          "pip install yt-dlp"  // Install yt-dlp for video handling
        ]
      }
    },
    {
      "when": "{{platform === 'darwin'}}",  // macOS
      "method": "shell.run",
      "params": {
        "message": [
          "brew install ffmpeg || conda install ffmpeg -c conda-forge --yes || echo 'ffmpeg installation failed. Please install manually with: brew install ffmpeg'"
        ]
      }
    },
    {
      "when": "{{platform === 'linux'}}",  // Linux
      "method": "shell.run",
      "params": {
        "message": [
          "sudo apt-get update && sudo apt-get install -y ffmpeg || sudo yum install -y ffmpeg || conda install ffmpeg -c conda-forge --yes || echo 'ffmpeg installation failed. Please install manually with: sudo apt-get install ffmpeg or sudo yum install ffmpeg'"
        ]
      }
    },
    {
      "when": "{{platform === 'win32'}}",  // Windows (your OS)
      "method": "shell.run",
      "params": {
        "message": [
          "conda install ffmpeg -c conda-forge --yes || echo 'ffmpeg installation failed. Please install manually from https://ffmpeg.org/download.html and add to PATH.'"
        ]
      }
    },
    // Notify installation complete
    {
      "method": "notify",
      "params": {
        "html": "Installation complete! Click the 'start' tab to launch the app."
      }
    }
  ]
}
