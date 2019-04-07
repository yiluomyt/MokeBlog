import React, { PureComponent } from "react";
import { graphql, Link } from "gatsby";
import { Layout, Card, Post } from "@/components";

import styles from "./topic.module.less";

import { MarkdownRemark } from "@/types";

const bgImg =
  "https://yiluoblog.blob.core.windows.net/image/%E5%8A%A0%E8%97%A4%E6%83%A02.jpg";

interface TopicPageProps {
  data: {
    posts: { nodes: Array<MarkdownRemark> };
    readme: MarkdownRemark;
  };
  pageContext: {
    topic: string;
  };
}

class TopicPage extends PureComponent<TopicPageProps, {}> {
  render() {
    const topic = this.props.pageContext.topic;
    const readme = this.props.data.readme;
    const posts = this.props.data.posts.nodes.map(post => ({
      id: post.id,
      to: post.fields!.slug as string,
      name: post.fields!.name as string,
    }));
    return (
      <Layout
        title={topic}
        containerOptions={{
          flex: true,
          style: { flexDirection: "row-reverse" },
        }}
        metaTitle={`Topic: ${topic}`}
        backgroundImage={bgImg}
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
    posts: allMarkdownRemark(
      filter: { fields: { topic: { eq: $topic }, name: { ne: "README" } } }
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
