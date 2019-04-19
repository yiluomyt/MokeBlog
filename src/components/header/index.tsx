import React, { PureComponent } from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Site } from "@/types";

import styles from "./index.module.less";

interface HeaderProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
}

// 页头
class Header extends PureComponent<HeaderProps, {}> {
  render() {
    const { title, subtitle, backgroundImage } = this.props;
    return (
      <header
        className={styles.header}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <StaticQuery
          query={menuQuery}
          render={({ site: { siteMetadata: meta } }: { site: Site }) => (
            <nav>
              {/* 站点名称 */}
              <h3 className={styles.siteTitle}>
                <Link to="/">{meta.siteTitle}</Link>
              </h3>
              {/* 菜单 */}
              <ul className={styles.menu}>
                {meta.menuItems.map(item => (
                  <li key={item.key}>
                    <Link to={`${item.href}`}>{item.key}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        />
        {/* 标题 */}
        <div className={styles.title}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </header>
    );
  }
}

export default Header;

const menuQuery = graphql`
  {
    site {
      siteMetadata {
        siteTitle
        menuItems {
          key
          href
        }
      }
    }
  }
`;
