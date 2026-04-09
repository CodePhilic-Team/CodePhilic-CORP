module.exports = {
  apps: [
    {
      name: "frontend",
      script: "npm",
      args: "start",
      instances: "max",
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
    },
  ],
};
