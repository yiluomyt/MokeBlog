import React, { PureComponent } from "react";
import { Link } from "gatsby";
import Tag from "@/components/tag";

import { MarkdownRemark, MarkdownRemarkFields } from "@/types";

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
    const {
      name,
      slug,
      topic,
      date,
      tags,
      top,
    } = post.fields as MarkdownRemarkFields;
    return (
      <div key={id} className={styles.post}>
        <Link className={styles.link} to={slug as string}>
          <h3 className={styles.title}>
            {top ? "[置顶]" : null}
            {name}
          </h3>
          <p className={styles.excerpt}>{excerpt}</p>
        </Link>
        <div className={styles.info}>
          <div>
            {date ? <span className={styles.date}>{date}</span> : null}
            <Link className={styles.topic} to={`/topic/${topic}`}>
              {topic}
            </Link>
          </div>
          {this.renderPostTagGroup(tags as string[])}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className={styles.list}>{this.props.posts.map(this.renderPost)}</div>
    );
  }
}

export default PostList;
