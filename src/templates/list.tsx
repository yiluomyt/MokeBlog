import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { Layout, Card, PostList, Pagination } from "@/components";

import { MarkdownRemark } from "@/types";

interface ListPageProps {
  data: {
    posts: { nodes: Array<MarkdownRemark> };
  };
  pageContext: {
    curPage: number;
    numPages: number;
  };
}

class ListPage extends PureComponent<ListPageProps, {}> {
  render() {
    const posts = this.props.data.posts.nodes;
    const { curPage, numPages } = this.props.pageContext;
    return (
      <Layout title="博客列表" backgroundImage="/bg.jpg">
        <Card title={`第${curPage}页`}>
          <PostList posts={posts} />
          <Pagination prefix="/list" current={curPage} total={numPages} />
        </Card>
      </Layout>
    );
  }
}

export default ListPage;

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      filter: { fields: { name: { ne: "README" }, posted: { ne: false } } }
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
