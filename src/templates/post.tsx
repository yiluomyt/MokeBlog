import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { Layout, Card, Post } from "@/components";

import { MarkdownRemark, MarkdownRemarkFields } from "@/types";

interface PostPageProps {
  data: {
    post: MarkdownRemark;
  };
}

class PostPage extends PureComponent<PostPageProps, {}> {
  render() {
    const post = this.props.data.post;
    const {
      name: title,
      cover: bgImg,
      topic,
      tags,
    } = post.fields as MarkdownRemarkFields;
    let keywords: string[] = (tags as string[]) || [];
    if (topic) keywords.push(topic);
    return (
      <Layout
        title={title}
        backgroundImage={bgImg || "/bg.webp"}
        metaTitle={`${title} - ${topic}`}
        metaKeywords={keywords}
      >
        <Card>
          <Post post={post} />
        </Card>
      </Layout>
    );
  }
}

export default PostPage;
export const query = graphql`
  query($slug: String!) {
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
