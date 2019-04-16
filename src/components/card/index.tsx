import React, { PureComponent } from "react";

import styles from "./index.module.less";

interface CardProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  title?: string;
}

// 组件-卡片
class Card extends PureComponent<CardProps, {}> {
  render() {
    // 这里className需要!important
    const { title, children, className } = this.props;
    return (
      <div className={styles.card + (className ? ` ${className}` : "")}>
        {title ? <h3 className={styles.title}>{title}</h3> : null}
        {children}
      </div>
    );
  }
}

export default Card;
