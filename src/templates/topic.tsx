import React, { PureComponent } from "react";
import { graphql, Link } from "gatsby";
import { Layout, Card, Post } from "@/components";

import styles from "./topic.module.less";

import { MarkdownRemark, Site } from "@/types";

interface TopicPageProps {
  data: {
    site: Site;
    posts: { nodes: Array<MarkdownRemark> };
    readme: MarkdownRemark;
  };
  pageContext: {
    topic: string;
  };
}

class TopicPage extends PureComponent<TopicPageProps, {}> {
  render() {
    const pageInfo = this.props.data.site.siteMetadata.pages.topic;
    const topic = this.props.pageContext.topic;
    const readme = this.props.data.readme;
    const posts = this.props.data.posts.nodes.map(post => ({
      id: post.id,
      to: post.fields.slug,
      name: post.fields.name,
    }));
    return (
      <Layout
        {...pageInfo}
        containerOptions={{
          flex: true,
          style: { flexDirection: "row-reverse" },
        }}
        metaTitle={`Topic: ${topic}`}
        metaKeywords={[topic]}
      >
        <div>
          <Card className={styles.catalog} title="目录">
            <ol>
              {posts.map(post => (
                <li key={post.id}>
                  <Link to={post.to}>{post.name}</Link>
                </li>
              ))}
            </ol>
          </Card>
        </div>
        <Card className={styles.readme}>
          <Post post={readme} />
        </Card>
      </Layout>
    );
  }
}

export default TopicPage;
export const query = graphql`
  query($topic: String!) {
    site {
      siteMetadata {
        pages {
          topic {
            title
            subtitle
            backgroundImage
          }
        }
      }
    }
    posts: allMarkdownRemark(
      filter: {
        fields: {
          topic: { eq: $topic }
          name: { ne: "README" }
          posted: { ne: false }
        }
      }
      sort: { fields: [fields___top, fields___date], order: [DESC, ASC] }
    ) {
      nodes {
        id
        fields {
          slug
          name
        }
      }
    }
    readme: markdownRemark(
      fields: { name: { eq: "README" }, topic: { eq: $topic } }
    ) {
      html
    }
  }
`;
