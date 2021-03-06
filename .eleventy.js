module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "node_modules/@arc-ui/bundle/dist/index.js": "assets/js/index.js",
    "node_modules/@arc-ui/bundle/dist/polyfills.js": "assets/js/polyfills.js",
    "node_modules/@arc-ui/fonts/lib/woff": "assets/css/woff",
    "node_modules/@arc-ui/fonts/lib/woff2": "assets/css/woff2",
  });

  // Copy Netlify headers
  eleventyConfig.addPassthroughCopy("./src/_headers");

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid",
      "png",
      "ico",
      "svg",
      "webmanifest",
    ],
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    dir: {
      input: "./src",
      output: "./_site",
    },
    passthroughFileCopy: true,
  };
};
