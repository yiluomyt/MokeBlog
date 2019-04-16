import React, { PureComponent } from "react";
import { graphql, Link } from "gatsby";
import _ from "lodash";
import { Layout, Card, PostList, Tag } from "@/components";

import styles from "./index.module.less";

import { MarkdownRemark } from "@/types";

const title = "Moke Blog";
const subtitle = "Microsoft Fans ♥ .NET Core";
const bgImg = "/bg.webp";

interface IndexProps {
  data: {
    posts: { nodes: Array<MarkdownRemark> };
    statistics: { nodes: Array<MarkdownRemark> };
  };
}

// 页面-首页
class IndexPage extends PureComponent<IndexProps, {}> {
  render() {
    const posts = this.props.data.posts.nodes;
    // 统计主题
    const topics = _.uniq(
      this.props.data.statistics.nodes.map(e => e!.fields!.topic)
    );
    // 统计标签
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
        backgroundImage={bgImg}
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
