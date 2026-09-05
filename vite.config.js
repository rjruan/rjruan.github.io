const { defineConfig } = require("vite");

module.exports = defineConfig({
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"]
  }
});
