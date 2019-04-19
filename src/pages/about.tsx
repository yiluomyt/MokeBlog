import React from "react";
import { graphql } from "gatsby";
import { Layout, Card } from "@/components";

import { Site } from "@/types";

interface AboutProps {
  data: {
    site: Site;
  };
}

// 页面-关于
const AboutPage = ({ data }: AboutProps) => {
  const pageInfo = data.site.siteMetadata.pages.about;
  return (
    <Layout {...pageInfo}>
      <Card title={pageInfo.title} style={{ minHeight: "30vh" }}>
        <p>咕咕咕 </p>
      </Card>
    </Layout>
  );
};

export default AboutPage;

export const query = graphql`
  {
    site {
      siteMetadata {
        pages {
          about {
            title
            subtitle
            backgroundImage
          }
        }
      }
    }
  }
`;
