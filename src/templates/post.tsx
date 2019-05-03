import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { Layout, Card, Catalog, Post, Tag, Drawer } from "@/components";

import styles from "./post.module.less";

import { MarkdownRemark, Site } from "@/types";

interface PostPageProps {
  data: {
    site: Site;
    post: MarkdownRemark;
  };
}

class PostPage extends PureComponent<PostPageProps, {}> {
  render() {
    let pageInfo = this.props.data.site.siteMetadata.pages.post;
    const post = this.props.data.post;
    const { name, cover, topic, tags, date } = post.fields;
    let keywords = tags.concat();

    if (name) pageInfo.title = name;
    if (cover) pageInfo.backgroundImage = cover;
    if (topic) keywords.push(topic);

    return (
      <Layout
        {...pageInfo}
        containerOptions={{ flex: true }}
        metaTitle={topic ? `${name} - ${topic}` : name}
        metaKeywords={keywords}
      >
        <Card className={styles.postCard}>
          <Post post={post} />
        </Card>
        <div className={styles.sidebar}>
          <Card className={styles.info}>
            <a className={styles.topic} href={`/topic/${topic}`}>
              {topic}
            </a>
            <div className={styles.date}>{date}</div>
            <div className={styles.tags}>
              {tags.map(tag => (
                <Tag key={tag} name={tag} />
              ))}
            </div>
          </Card>
          <Catalog className={styles.sticky} headings={post.headings} />
        </div>
        <Drawer>
          <Catalog headings={post.headings} />
        </Drawer>
      </Layout>
    );
  }
}

export default PostPage;
export const query = graphql`
  query($slug: String!) {
    site {
      siteMetadata {
        pages {
          post {
            title
            subtitle
            backgroundImage
          }
        }
      }
    }
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      headings {
        value
        depth
      }
      fields {
        topic
        name
        tags
        date(formatString: "MMM DD, YYYY")
        cover
      }
    }
  }
`;
