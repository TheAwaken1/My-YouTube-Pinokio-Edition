# My-YouTube (Pinokio EditioN)

A clean and minimal YouTube frontend, without all the ads and whistles. This is a Pinokio-optimized fork of [christian-fei/my-yt](https://github.com/christian-fei/my-yt), enhanced with seamless integration for Pinokio Computer, including automatic Ollama setup for AI video summarization. Everything runs locally and privately, with no need for external APIs unless you choose to configure them.

## Features
- **Ad-Free Experience**: Subscribe to channels, view chronological feeds, search videos, and download for offline playback.
- **AI Summarization**: Automatically summarize video content using Ollama (local LLM) or compatible remote APIs like OpenAI.
- **Pinokio Integration**: One-click install/start in Pinokio, with dynamic menus for model downloads and Ollama handling.
- **Local-First**: Uses your running Ollama instance for summarization—no separate terminal needed if Ollama is already backgrounded.
- **Customizable**: Easily switch models or use API keys via `.env`.

## Installation
This app is designed for [Pinokio Computer](https://pinokio.computer), a 1-click launcher for open-source AI tools.

1. **Install Pinokio**: Download and set up Pinokio from [pinokio.computer](https://pinokio.computer).
2. **Add the App**:
   - Use the one-click URI: `pinokio://https://github.com/TheAwaken1/my-yt-pinokio.git` (click in Pinokio or browser).
   - Or manually: Clone this repo into your Pinokio `api` folder (e.g., `~/.pinokio/api/my-yt-pinokio`), then restart Pinokio.
3. **Prerequisites**:
   - **Ollama**: If not installed, Pinokio will prompt you during setup. Download from [ollama.com/download](https://ollama.com/download) and run it in the background (e.g., via `ollama serve` or system tray).
   - **ffmpeg**: Auto-installed during setup (or prompted if manual needed).
4. In Pinokio: Click "Install" for deps, then "Start". Access at `http://localhost:3000`.

## Configuration
The app uses a `.env` file (included) for AI settings. Edit it in your app folder (e.g., `~/.pinokio/api/my-yt-pinokio/app/.env`) and restart for changes.

### Changing the AI Model
- Default: `AI_MODEL=deepseek-r1:14b` (local Ollama).
- To change: Open `.env` and update `AI_MODEL` to your preferred model (e.g., `llama3`).
- Restart the app in Pinokio.
- Download models via the Pinokio menu ("Download Models" > select from list like deepseek options).
- Note: Summarization auto-uses the model if Ollama is running in the background. No separate terminal needed—the app connects directly.

### Using Remote APIs (Optional)
If you prefer OpenAI/Anthropic over local Ollama:
- Edit `.env`:
  ```
  AI_HOST=https://api.openai.com  # Or https://api.anthropic.com
  AI_ENDPOINT=/v1/chat/completions  # Adjust for provider
  AI_MODEL=gpt-4o-mini  # Provider-specific model
  AI_TEMPERATURE=0
  AI_APIKEY=your-api-key-here  # Required for remote
  ```
- Restart the app. Costs apply for remote usage.

## Usage
- **Add Channels**: In the UI, go to Settings > paste YouTube channel URL.
- **Summarize Videos**: View a video > click "Summarize" (uses your configured model).
- **Download/Stream**: Built-in via yt-dlp; works offline for saved videos.
- **Add Channels**: Click on settings > copy @YoutubeChannelName > click Add Channel.
- **Pinokio Menu**: Download models, view terminal logs, or start Ollama if needed.
- **GPU Acceleration**: If you have NVIDIA, edit code for FFmpeg GPU flags (see original repo docs).

## Troubleshooting
- **Ollama Not Detected**: Ensure it's running (`ollama serve`). Use menu > "Start Ollama Interactive" to launch with a model.
- **Model Not Found**: Download via menu first.
- **Errors**: Check Pinokio terminal logs. For help, open an issue here.
- **Updates**: Pull from this repo 

## Credits
- Forked from [christian-fei/my-yt](https://github.com/christian-fei/my-yt) (original clean YouTube frontend).
- Enhanced for Pinokio by [TheAwaken1](https://github.com/TheAwaken1).
- Uses Ollama for local AI, yt-dlp for downloads.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


[![GitHub Repo](https://img.shields.io/badge/GitHub-Repo-green?style=flat-square&logo=github&logoColor=white)](https://github.com/TheAwaken1/my-yt-pinokio)

