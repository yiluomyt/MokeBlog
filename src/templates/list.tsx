import React, { PureComponent } from "react";
import { graphql } from "gatsby";
import { Layout, Card, PostList, Pagination } from "@/components";

import { MarkdownRemark, Site } from "@/types";

interface ListPageProps {
  data: {
    site: Site;
    posts: { nodes: Array<MarkdownRemark> };
  };
  pageContext: {
    curPage: number;
    numPages: number;
  };
}

// 页面-列表
class ListPage extends PureComponent<ListPageProps, {}> {
  render() {
    // 页面信息
    const pageInfo = this.props.data.site.siteMetadata.pages.list;
    const posts = this.props.data.posts.nodes;
    const { curPage, numPages } = this.props.pageContext;
    return (
      <Layout {...pageInfo}>
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
    site {
      siteMetadata {
        pages {
          list {
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
