import React, { PureComponent } from "react";
import { graphql, Link } from "gatsby";
import _ from "lodash";
import { Layout, Card, PostList, Tag } from "@/components";

import styles from "./index.module.less";

import { MarkdownRemark, Site } from "@/types";

interface IndexProps {
  data: {
    site: Site;
    posts: { nodes: Array<MarkdownRemark> };
    statistics: { nodes: Array<MarkdownRemark> };
  };
}

// 页面-首页
class IndexPage extends PureComponent<IndexProps, {}> {
  render() {
    // 页面信息
    const pageInfo = this.props.data.site.siteMetadata.pages.index;
    const posts = this.props.data.posts.nodes;
    const data = this.props.data.statistics.nodes;
    // 统计主题
    const topics = _.chain(data)
      .map(e => e.fields.topic)
      .uniq()
      .value();
    // 统计标签
    const tags = _.chain(data)
      .map(e => e.fields.tags)
      .flatten()
      .countBy()
      .pickBy((value, key) => value > 2)
      .map((value, key) => ({ tag: key, count: value }))
      .orderBy("count", "desc")
      .map(e => e.tag)
      .value();

    return (
      <Layout {...pageInfo} containerOptions={{ flex: true }}>
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
              {topics.length > 0 ? (
                topics.map(topic => (
                  <li key={topic as string}>
                    <Link to={`/topic/${topic}`}>{topic}</Link>
                  </li>
                ))
              ) : (
                <li>暂无主题</li>
              )}
            </ul>
          </Card>
          {/* 标签 */}
          <Card title="Tag">
            {tags.length > 0 ? (
              tags.map(tag => <Tag key={tag} name={tag} />)
            ) : (
              <p>暂无标签</p>
            )}
          </Card>
        </div>
      </Layout>
    );
  }
}

export default IndexPage;

export const query = graphql`
  {
    site {
      siteMetadata {
        pages {
          index {
            title
            subtitle
            backgroundImage
          }
        }
      }
    }
    posts: allMarkdownRemark(
      filter: { fields: { name: { ne: "README" }, posted: { ne: false } } }
      sort: { fields: [fields___top, fields___date], order: [DESC, DESC] }
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
