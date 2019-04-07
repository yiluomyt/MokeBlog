import React, { PureComponent } from "react";

import styles from "./index.module.less";

export interface ContainerProps
  extends React.HtmlHTMLAttributes<HTMLMainElement> {
  flex?: boolean;
}

class Container extends PureComponent<ContainerProps, {}> {
  render() {
    const { children, flex, style } = this.props;
    return (
      <main
        className={styles.container + (flex ? ` ${styles.flex}` : "")}
        style={style}
      >
        {children}
      </main>
    );
  }
}

export default Container;
