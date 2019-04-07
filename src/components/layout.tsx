import React, { PureComponent } from "react";
import { Helmet } from "react-helmet";
import Header from "./header";
import Footer from "./footer";
import BackTop from "./back-top";
import Container, { ContainerProps } from "./container";

const defaultProps = {
  title: "Moke Blog",
  subtitle: "",
  backgroundImage: "",
};

interface LayoutProps {
  title: string | null;
  subtitle: string | null;
  backgroundImage?: string | null;
  containerOptions?: ContainerProps;
  metaTitle?: string;
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
      children,
    } = this.props;
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{metaTitle || title}</title>
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
