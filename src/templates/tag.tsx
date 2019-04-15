import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { Layout, Card, PostList, Pagination } from "@/components";

import { MarkdownRemark } from "@/types";

interface TagPageProps {
  data: {
    posts: { nodes: Array<MarkdownRemark> };
  };
  pageContext: {
    tag: string;
    curPage: number;
    numPages: number;
  };
}

class TagPage extends PureComponent<TagPageProps, {}> {
  render() {
    const posts = this.props.data.posts.nodes;
    const { tag, curPage, numPages } = this.props.pageContext;
    return (
      <Layout
        title={tag}
        metaTitle={`Tag: ${tag}`}
        backgroundImage="/bg.webp"
        metaKeywords={[tag]}
      >
        <Card title={`第${curPage}页`}>
          <PostList posts={posts} />
          <Pagination
            prefix={`/tag/${tag}`}
            current={curPage}
            total={numPages}
          />
        </Card>
      </Layout>
    );
  }
}

export default TagPage;

export const query = graphql`
  query($tag: String!, $skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      filter: {
        fields: {
          name: { ne: "README" }
          tags: { in: [$tag] }
          posted: { ne: false }
        }
      }
      sort: { fields: [fields___top, fields___date], order: [ASC, DESC] }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        id
        excerpt
        fields {
          name
          slug
          topic
          date(formatString: "MMM DD, YYYY")
          tags
          top
        }
      }
    }
  }
`;
