const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const postsPerPage = 6;

// 添加节点属性
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  let i = 0;
  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    const dirName = fileNode.relativeDirectory.replace(`\\`, `/`).split(`/`)[0];
    const slug = createFilePath({ node, getNode }).replace(`\\`, `/`);

    const fields = [];
    fields.push(
      // 博客名称
      {
        name: `name`,
        value: node.frontmatter.title || fileNode.name,
      },
      // 博客路径
      {
        name: `slug`,
        value: slug,
      },
      // 博客主题
      {
        name: `topic`,
        value: node.frontmatter.topic || dirName || `无`,
      },
      // 博客标签
      {
        name: `tags`,
        value: node.frontmatter.tags || [`未分类`],
      },
      // 博客日期
      {
        name: `date`,
        value: node.frontmatter.date || new Date(),
      },
      // 博客封面
      {
        name: `cover`,
        value: node.frontmatter.cover || ``,
      },
      // 置顶博客
      {
        name: `top`,
        value: node.frontmatter.top || 0,
      },
      // 是否发布
      {
        name: `posted`,
        value: node.frontmatter.posted !== false, // 默认为true
      }
    );
    // 创建字段
    fields.forEach(field => createNodeField({ node, ...field }));
  }
};

// 根据模板创建页面
exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  return graphql(`
    {
      posts: allMarkdownRemark(
        filter: { fields: { name: { ne: "README" }, posted: { ne: false } } }
      ) {
        nodes {
          fields {
            slug
            topic
            tags
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors;
    }
    const posts = result.data.posts.nodes;
    // 博客页面
    createPostPages(posts, createPage);
    // 标签页面
    createTagPages(posts, createPage, createRedirect);
    // 专题页面
    createTopicPages(posts, createPage);
    // 博客列表
    createListPages(posts, createPage, createRedirect);
  });
};

function createListPages(posts, createPage, createRedirect) {
  const totalCount = posts.length;
  const numPages = Math.ceil(totalCount / postsPerPage);
  // 按页数创建页
  _.range(numPages).forEach(i => {
    createPage({
      path: `/list/${i + 1}`,
      component: path.resolve(`./src/templates/list.tsx`),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        curPage: i + 1,
        numPages: numPages,
      },
    });
  });
  createRedirect({
    fromPath: `/list`,
    isPermanent: true,
    redirectInBrowser: true,
    toPath: `/list/1`,
  });
}

function createTopicPages(posts, createPage) {
  const topics = posts.map(post => post.fields.topic);
  // 创建专题页面
  _.forEach(_.uniq(topics), topic => {
    createPage({
      path: `/topic/${topic}`,
      component: path.resolve(`./src/templates/topic.tsx`),
      context: {
        topic: topic,
      },
    });
  });
}

function createTagPages(posts, createPage, createRedirect) {
  let tags = posts.map(post => post.fields.tags);
  if (tags.length === 0) return;
  tags = tags.reduce((a, b) => a.concat(b));
  // 创建标签页面
  _.forEach(_.countBy(tags), (count, tag) => {
    const numPages = Math.ceil(count / postsPerPage);
    // 按页数创建页
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: `/tag/${tag}/${i + 1}`,
        component: path.resolve(`./src/templates/tag.tsx`),
        context: {
          tag: tag,
          limit: postsPerPage,
          skip: i * postsPerPage,
          curPage: i + 1,
          numPages: numPages,
        },
      });
    });
    createRedirect({
      fromPath: `/tag/${tag}`,
      isPermanent: true,
      redirectInBrowser: true,
      toPath: `/tag/${tag}/1`,
    });
  });
}

function createPostPages(posts, createPage) {
  posts.forEach(({ fields }) => {
    createPage({
      path: fields.slug,
      component: path.resolve(`./src/templates/post.tsx`),
      context: {
        slug: fields.slug,
      },
    });
  });
}
