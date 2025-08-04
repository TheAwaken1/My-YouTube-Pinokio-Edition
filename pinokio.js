const path = require('path');
const http = require('http');
const models = require("./models.js");  // Your models.js for deepseek models

async function isOllamaRunning() {
  return new Promise((resolve) => {
    const req = http.get('http://127.0.0.1:11434', (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.end();
  });
}

module.exports = {
  version: "1.0.0",  // Your version for the Pinokio edition
  title: "My-YouTube (Pinokio Edition)",
  description: "Ad-free YouTube frontend with Ollama AI summarization (forked from christian-fei/my-yt)",
  icon: "icon.png",  // Add an icon.png if you have one; otherwise omit or use a placeholder
  pre: [{  // Pre-install prerequisites (similar to Open-WebUI)
    icon: "ollama.png",  // Add ollama.png icon if available
    title: "Ollama",
    description: "Get up and running with large language models for AI summarization.",
    href: "https://ollama.com/download"  // Direct link to Ollama download page
  }],
  menu: async (kernel, info) => {
    let installing = info.running("install.js");  // Check if installing
    let installed = info.exists("app/env");  // Relative to check if virtual env exists (adjust if needed)
    let running = info.running("start.js");  // Check if app is running

    if (installing) {
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Installing",
        href: "install.js",
      }];
    } else if (installed) {
      const ollamaRunning = await isOllamaRunning();  // Check if Ollama server is responding

      if (running) {
        let local = kernel.memory.local[path.resolve(__dirname, "start.js")];
        if (local && local.url) {
          return [{
            popout: true,  // Open in new window
            icon: "fa-solid fa-rocket",
            text: "Open my-yt",
            href: local.url,  // Detected URL from start.js (e.g., http://localhost:3000)
          }, {
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",  // View logs
          }, {
            icon: "fa-solid fa-download",
            text: "Download Models",
            menu: models.map((group) => {  // Dynamic menu from models.js
              return {
                icon: "fa-solid fa-circle-down",
                text: group.name,
                menu: group.models.map((m) => {
                  return {
                    icon: "fa-solid fa-circle-down",
                    text: `${m.id} (${m.size})`,
                    href: "down.js",
                    params: { id: m.id }  // Pass to down.js for ollama pull
                  };
                })
              };
            })
          }];
        } else {
          return [{
            default: true,
            icon: 'fa-solid fa-terminal',
            text: "Terminal",
            href: "start.js",
          }];
        }
      } else {
        // If installed but not running: Check Ollama and prompt if needed
        let menuItems = [{
          default: true,
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.js",
        }, {
          icon: "fa-solid fa-download",
          text: "Download Models",
          menu: models.map((group) => {
            return {
              icon: "fa-solid fa-circle-down",
              text: group.name,
              menu: group.models.map((m) => {
                return {
                  icon: "fa-solid fa-circle-down",
                  text: `${m.id} (${m.size})`,
                  href: "down.js",
                  params: { id: m.id }
                };
              })
            };
          })
        }, {
          icon: "fa-solid fa-plug",
          text: "Reinstall",
          href: "install.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Update",
          href: "update.js",
        }, {
          icon: "fa-solid fa-plug",
          text: "Install",
          href: "install.js",
        }, {
          icon: "fa-regular fa-circle-xmark",
          text: "Reset",
          href: "reset.js",
		  confirm: "Are you sure you wish to reset this app?",
        }];
        
        if (!ollamaRunning) {
          menuItems.unshift({  // Add at the beginning for visibility
            icon: "fa-solid fa-exclamation-triangle",
            text: "Start Ollama Interactive",
            menu: models.map((group) => {  // Submenu for model selection
              return {
                icon: "fa-solid fa-circle-down",
                text: group.name,
                menu: group.models.map((m) => {
                  return {
                    icon: "fa-solid fa-circle-down",
                    text: `${m.id} (${m.size})`,
                    href: "start_ollama_interactive.js",
                    params: { model: m.id }  // Pass model to script
                  };
                })
              };
            })
          });
        }
        
        return menuItems;
        
      }
    } else {
      // Not installed: Show install
      return [{
        default: true,
        icon: "fa-solid fa-plug",
        text: "Install",
        href: "install.js",
      }];
    }
  }
};