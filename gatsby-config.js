const path = require("path");
const site = require("./site.json");

module.exports = {
  siteMetadata: site,
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
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-root-import`,
      options: {
        "@": path.join(__dirname, "src"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog/`,
        ignore: [`**/SUMMARY.md`],
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // 代码高亮
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: false,
              aliases: {
                dockerfile: "docker",
                conf: "apacheconf",
              },
            },
          },
          // LaTex支持
          {
            resolve: `gatsby-remark-katex`,
          },
          // 响应式图片
          {
            resolve: `gatsby-remark-images`,
            options: {
              wrapperStyle: "margin: 4px auto;",
              withWebp: true,
            },
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Moke Blog`,
        short_name: `Moke`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#2f54eb`,
        display: `standalone`,
        icon: `static/icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    // make sure to put last in the array
    {
      resolve: `gatsby-plugin-netlify`,
    },
  ],
};
