const path = require("path");

module.exports = {
  siteMetadata: {
    siteTitle: "Blog",
    description: "This is Blog framework.",
    url: "https://blog.mytyiluo.cn",
    menuItems: [
      {
        key: "Home",
        href: "/",
      },
      {
        key: "About",
        href: "/about",
      },
    ],
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-less`,
      options: {
        javascriptEnabled: true,
        cssLoaderOptions: {
          minifyClassNames: true,
          localIdentName: "[path][name]__[local]--[hash:base64:5]",
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        "@": path.join(__dirname, "src"),
      },
    },
    // make sure to put last in the array
    {
      resolve: `gatsby-plugin-netlify`,
    },
  ],
};
