import React, { PureComponent } from "react";
import { MarkdownRemark } from "@/types";

import styles from "./index.module.less";
import "katex/dist/katex.min.css";

interface PostProps {
  post: MarkdownRemark;
}

// 组件-博客
class Post extends PureComponent<PostProps, {}> {
  render() {
    const html = this.props.post.html;
    return (
      <div className={styles.post} dangerouslySetInnerHTML={{ __html: html }} />
    );
  }
}

export default Post;
