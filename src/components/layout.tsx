import React, { PureComponent } from "react";
import { Helmet } from "react-helmet";
import Header from "./header";
import Footer from "./footer";
import BackTop from "./back-top";
import Container, { ContainerProps } from "./container";

import _ from "lodash";

const defaultProps = {
  title: "Moke Blog",
  subtitle: "",
  backgroundImage: "",
  metaTitle: "Moke Blog",
  metaKeywords: [],
  metaDescription: "yiluomyt's Blog",
};

interface LayoutProps {
  title: string | null;
  subtitle: string | null;
  backgroundImage?: string | null;
  containerOptions?: ContainerProps;
  metaTitle?: string;
  metaKeywords?: string[];
  metaDescription?: string;
}

class Layout extends PureComponent<LayoutProps, {}> {
  static defaultProps = defaultProps;

  render() {
    const {
      title,
      subtitle,
      backgroundImage,
      containerOptions,
      metaTitle,
      metaKeywords,
      metaDescription,
      children,
    } = this.props;
    return (
      <>
        <Helmet>
          <html lang="zh-CN" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{metaTitle || title}</title>
          <meta name="keywords" content={_.uniq(metaKeywords).join(",")} />
          <meta name="description" content={metaDescription} />
        </Helmet>
        <Header
          title={`${title}`}
          subtitle={`${subtitle}`}
          backgroundImage={`${backgroundImage}`}
        />
        <Container style={{ minHeight: "35vh" }} {...containerOptions}>
          {children}
        </Container>
        <Footer />
        <BackTop />
      </>
    );
  }
}

export default Layout;
