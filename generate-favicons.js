const { favicons } = require("favicons");
const path = require("path");
const fs = require("fs");

const source = path.join(__dirname, "public", "CodePhilic.png");
const destination = path.join(__dirname, "public");

const configuration = {
  path: "/",
  appName: "CodePhilic",
  appDescription: "CodePhilic - Premium Software Development Agency",
  developerName: "CodePhilic Team",
  developerURL: "https://code-philic.com",
  dir: "auto",
  lang: "en-US",
  background: "#ffffff",
  theme_color: "#3B82F6",
  appleStatusBarStyle: "black-translucent",
  display: "standalone",
  orientation: "portrait",
  scope: "/",
  start_url: "/",
  version: "1.0",
  logging: false,
  pixel_art: false,
  loadManifestWithCredentials: false,
  icons: {
    android: true,
    appleIcon: true,
    favicons: true,
    windows: true,
  },
};

favicons(source, configuration)
  .then((response) => {
    // Write images
    response.images.forEach((image) => {
      const filePath = path.join(destination, image.name);
      fs.writeFileSync(filePath, image.contents);
      console.log(`✓ Generated: ${image.name}`);
    });

    // Write files
    response.files.forEach((file) => {
      const filePath = path.join(destination, file.name);
      fs.writeFileSync(filePath, file.contents);
      console.log(`✓ Generated: ${file.name}`);
    });

    console.log("\n✅ All favicons generated successfully!");
  })
  .catch((error) => {
    console.error("❌ Error generating favicons:", error.message);
    process.exit(1);
  });
