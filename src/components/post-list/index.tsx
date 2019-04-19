import React, { PureComponent } from "react";
import { Link } from "gatsby";
import Tag from "@/components/tag";
import { classIf } from "@/utils";

import { MarkdownRemark } from "@/types";

import styles from "./index.module.less";

interface PostListProps {
  posts: Array<MarkdownRemark>;
}

class PostList extends PureComponent<PostListProps, {}> {
  // 只显示前三个标签，多余标签显示为...
  renderPostTagGroup = (tags: Array<string>) => (
    <div className={styles.tagGroup}>
      {tags.slice(0, 3).map(tag => (
        <Tag key={tag} name={tag} />
      ))}
      {tags.length > 3 ? <Tag name="..." to={null} /> : null}
    </div>
  );

  renderPost = (post: MarkdownRemark) => {
    const { id, excerpt } = post;
    const { name, slug, topic, date, tags, top } = post.fields;
    return (
      <div key={id} className={styles.post}>
        <Link className={styles.link} to={slug}>
          <h3 className={styles.title + classIf(top, styles.top)}>{name}</h3>
          <p className={styles.excerpt}>{excerpt}</p>
        </Link>
        <div className={styles.info}>
          <div>
            {date ? <span className={styles.date}>{date}</span> : null}
            {date && topic ? (
              <span style={{ marginLeft: "8px" }}>//</span>
            ) : null}
            {topic ? (
              <Link className={styles.topic} to={`/topic/${topic}`}>
                {topic}
              </Link>
            ) : null}
          </div>
          {this.renderPostTagGroup(tags)}
        </div>
      </div>
    );
  };

  render() {
    const { posts } = this.props;
    return (
      <div className={styles.list}>
        {posts.length > 0 ? posts.map(this.renderPost) : <p>暂无博客</p>}
      </div>
    );
  }
}

export default PostList;
