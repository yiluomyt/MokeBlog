import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { Layout, Card, PostList, Pagination } from "@/components";

import { MarkdownRemark, Site } from "@/types";

interface TagPageProps {
  data: {
    site: Site;
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
    const { backgroundImage } = this.props.data.site.siteMetadata.pages.tag;
    const posts = this.props.data.posts.nodes;
    const { tag, curPage, numPages } = this.props.pageContext;
    return (
      <Layout
        title={tag}
        backgroundImage={backgroundImage}
        metaTitle={`Tag: ${tag}`}
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
    site {
      siteMetadata {
        pages {
          tag {
            backgroundImage
          }
        }
      }
    }
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
