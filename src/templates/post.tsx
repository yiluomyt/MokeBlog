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
    } = post.fields as MarkdownRemarkFields;
    return (
      <Layout
        title={title}
        backgroundImage={bgImg || "/bg.jpg"}
        metaTitle={`${title} - ${topic}`}
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
