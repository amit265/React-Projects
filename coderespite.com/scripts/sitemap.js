import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { projects, BASE_URL_JS_PROJECT } from "../src/utils/projects.js"; // Adjust the path as needed

const smStream = new SitemapStream({ hostname: "https://coderespite.com" });
const writeStream = createWriteStream("./public/sitemap.xml");
smStream.pipe(writeStream);

// Function to add project URLs to the sitemap
const addProjectsToSitemap = (category, basePath) => {
  projects[category].forEach((project) => {
    const url = `${BASE_URL_JS_PROJECT}${basePath}${project.path}`;
    smStream.write({ url, changefreq: "monthly", priority: 0.8 });
  });
};

// Add React projects
addProjectsToSitemap("react", "react/");

// Add JavaScript projects
addProjectsToSitemap("javascript", "js-projects/");

// Add Responsive projects
addProjectsToSitemap("responsive", "responsive/");

// Add static pages or other dynamic pages if needed
const staticPages = ["/", "project", "/about", "/contact", "/forum", "/blogs"];
staticPages.forEach((page) =>
  smStream.write({ url: page, changefreq: "monthly", priority: 0.8 })
);

smStream.end();
streamToPromise(smStream).then(() => console.log("Sitemap generated!"));
