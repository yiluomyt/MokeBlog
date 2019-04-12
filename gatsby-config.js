const path = require("path");

module.exports = {
  siteMetadata: {
    siteTitle: "Moke",
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
          localIdentName:
            process.env.NODE_ENV === "development"
              ? "[path][name]__[local]--[hash:base64:5]"
              : "[hash:base64:5]",
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog/`,
        ignore: [`**/SUMMARY.md`]
      },
    },
    `gatsby-plugin-sharp`,
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
          {
            resolve: `gatsby-remark-images`,
            options: {
              // 
            }
          }
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Moke Blog`,
        short_name: `Moke`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#2f54eb`,
        display: `standalone`,
        icon: `static/icon.png`
      },
    },
    `gatsby-plugin-offline`,
    // make sure to put last in the array
    {
      resolve: `gatsby-plugin-netlify`,
    },
  ],
};
