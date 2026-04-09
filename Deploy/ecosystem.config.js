module.exports = {
  apps: [
    // --- BACKEND (Express) ---
    // {
    //   name: "codephilic-server",
    //   cwd: "./cpsaa-server",
    //   script: "./dist/server.js",

    //   instances: 1,
    //   exec_mode: "fork",

    //   // 1. HARD LIMIT: Restart if usage > 400MB
    //   max_memory_restart: "400M",

    //   // 2. SOFT LIMIT: Tell V8 Engine to clean up RAM aggressively at 350MB
    //   // This prevents it from ever hitting the hard limit (restarting)
    //   node_args: "--max-old-space-size=350 --optimize_for_size",

    //   env: {
    //     NODE_ENV: "production",
    //     PORT: 5000,
    //   },
    // },

    // --- IMAGE WORKER (BullMQ) ---
    // {
    //   name: "codephilic-image-worker",
    //   cwd: "./cpsaa-server",
    //   script: "./dist/start-worker.js",

    //   instances: 1,
    //   exec_mode: "fork",

    //   // Worker uses Sharp: needs more RAM
    //   max_memory_restart: "500M",
    //   node_args: "--max-old-space-size=450",

    //   env: {
    //     NODE_ENV: "production",
    //   },
    // },

    // --- FRONTEND (Next.js) ---
    {
      name: "codephilic-app",
      cwd: "/home/mbstu/CodePhilic/codephilic-website/frontend",
      script: "npm",
      args: "start",

      instances: 1,
      exec_mode: "fork",

      // 1. HARD LIMIT
      max_memory_restart: "450M",

      // 2. SOFT LIMIT (Aggressive Garbage Collection)
      node_args: "--max-old-space-size=400 --optimize_for_size",

      env: {
        NODE_ENV: "production",
        PORT: 3500,
      },
    },
  ],
};
