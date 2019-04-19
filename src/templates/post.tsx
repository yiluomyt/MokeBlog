import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { Layout, Card, Post } from "@/components";

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
    const { name, cover, topic, tags } = post.fields;
    let keywords = tags;

    if (name) pageInfo.title = name;
    if (cover) pageInfo.backgroundImage = cover;
    if (topic) keywords.push(topic);
    return (
      <Layout
        {...pageInfo}
        metaTitle={topic ? `${name} - ${topic}` : name}
        metaKeywords={keywords}
      >
        <Card style={{ minHeight: "30vh" }}>
          <Post post={post} />
        </Card>
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
