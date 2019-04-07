import React, { PureComponent } from "react";
import { Link } from "gatsby";

import styles from "./index.module.less";

interface TagProps {
  name: string;
  to?: string | null;
}

class Tag extends PureComponent<TagProps, {}> {
  render() {
    const { name, to } = this.props;
    if (to === null) {
      return <span className={styles.tag}>{name}</span>;
    }
    const toUrl = to ? to : `/tag/${name}`;
    return (
      <Link className={styles.tag} to={toUrl}>
        {name}
      </Link>
    );
  }
}

export default Tag;
