import React, { PureComponent } from "react";
import { graphql, Link } from "gatsby";
import _ from "lodash";
import { Layout, Card, PostList, Tag } from "@/components";

import styles from "./index.module.less";

import { MarkdownRemark } from "@/types";

const title = "夏色皆守贴贴";
const subtitle = "马自立！！！！";
const bgImg =
  "https://yiluoblog.blob.core.windows.net/image/%E5%A4%8F%E8%89%B2%E7%9A%86%E5%AE%88.jpg";

interface IndexProps {
  data: {
    posts: { nodes: Array<MarkdownRemark> };
    statistics: { nodes: Array<MarkdownRemark> };
  };
}

class IndexPage extends PureComponent<IndexProps, {}> {
  render() {
    const posts = this.props.data.posts.nodes;
    const topics = _.uniq(
      this.props.data.statistics.nodes.map(e => e!.fields!.topic)
    );
    const tags = _.uniq(
      this.props.data.statistics.nodes
        .filter(e => e.fields!.tags)
        .map(e => e.fields!.tags as string[])
        .reduce((a, b) => a.concat(b))
    );

    return (
      <Layout
        title={title}
        subtitle={subtitle}
        backgroundImage="/bg.jpg"
        containerOptions={{ flex: true }}
        metaTitle="Moke Blog"
      >
        {/* 内容 */}
        <Card className={styles.content} title="Recent">
          <PostList posts={posts} />
          <div className={styles.more}>
            <Link to="/list">More</Link>
          </div>
        </Card>
        <div className={styles.extra}>
          {/* 主题 */}
          <Card title="Topic">
            <ul className={styles.topicList}>
              {topics.map(topic => (
                <li key={topic as string}>
                  <Link to={`/topic/${topic}`}>{topic}</Link>
                </li>
              ))}
            </ul>
          </Card>
          {/* 标签 */}
          <Card title="Tag">
            {tags.map(tag => (
              <Tag key={tag} name={tag} />
            ))}
          </Card>
        </div>
      </Layout>
    );
  }
}

export default IndexPage;

export const query = graphql`
  {
    posts: allMarkdownRemark(
      filter: { fields: { name: { ne: "README" }, posted: { ne: false } } }
      sort: { fields: [fields___top, fields___date], order: [ASC, DESC] }
      limit: 6
    ) {
      nodes {
        id
        excerpt
        fields {
          name
          slug
          date(formatString: "MMM DD, YYYY")
          topic
          tags
          top
        }
      }
    }
    statistics: allMarkdownRemark(
      filter: { fields: { name: { ne: "README" }, posted: { ne: false } } }
    ) {
      nodes {
        fields {
          topic
          tags
        }
      }
    }
  }
`;
