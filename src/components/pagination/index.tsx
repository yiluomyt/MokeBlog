import React, { PureComponent } from "react";
import { Link } from "gatsby";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import _ from "lodash";

import styles from "./index.module.less";

interface PaginationItem {
  ellipsis?: "prev" | "next";
  isCurrent?: boolean;
  to: number;
}

interface PaginationProps {
  current: number;
  total: number;
  skipNum: number;
  prefix: string;
}

class Pagination extends PureComponent<PaginationProps, {}> {
  static defaultProps = { skipNum: 3 };

  generatePaginationItems = (current: number, start: number, end: number) => {
    const items: PaginationItem[] = [];
    const { skipNum } = this.props;
    if (current - start < skipNum) {
      _.range(start, current).forEach(i => {
        items.push({
          to: i,
        });
      });
    } else {
      items.push(
        {
          to: 1,
        },
        {
          ellipsis: "prev",
          to: current - skipNum,
        },
        {
          to: current - 1,
        }
      );
    }
    items.push({
      to: current,
      isCurrent: true,
    });
    if (end - current < skipNum) {
      _.range(current + 1, end + 1).forEach(i => {
        items.push({
          to: i,
        });
      });
    } else {
      items.push(
        {
          to: current + 1,
        },
        {
          ellipsis: "next",
          to: current + skipNum,
        },
        {
          to: end,
        }
      );
    }

    return items;
  };

  renderEllipsis = (item: PaginationItem) => {
    const { skipNum, prefix } = this.props;
    let title, angle;
    if (item.ellipsis === "prev") {
      title = `向前${skipNum}页`;
      angle = <FaAngleDoubleLeft />;
    } else if (item.ellipsis === "next") {
      title = `向后${skipNum}页`;
      angle = <FaAngleDoubleRight />;
    }
    return (
      <Link
        key={item.ellipsis}
        className={styles.container}
        to={`${prefix}/${item.to}`}
        title={title}
      >
        <span className={styles.ellipsis}>•••</span>
        <span className={styles.angle}>{angle}</span>
      </Link>
    );
  };

  renderItem = (item: PaginationItem) => {
    const { prefix } = this.props;
    if (item.ellipsis) {
      return this.renderEllipsis(item);
    }
    const itemClassName =
      styles.item + (item.isCurrent ? ` ${styles.itemActive}` : "");
    return (
      <Link
        key={item.to}
        className={itemClassName}
        to={`${prefix}/${item.to}`}
        title={`第${item.to}页`}
      >
        {item.to}
      </Link>
    );
  };

  render() {
    const { current, total, prefix } = this.props;
    const start = 1,
      end = total;
    const toPrev = current - start > 0 ? current - 1 : null;
    const toNext = end - current > 0 ? current + 1 : null;
    const items = this.generatePaginationItems(current, start, end);
    return (
      <div className={styles.pagination}>
        {toPrev ? (
          <Link
            className={styles.prev}
            to={`${prefix}/${toPrev}`}
            title="向前1页"
          >
            <FaAngleLeft />
          </Link>
        ) : null}
        {items.map(this.renderItem)}
        {toNext ? (
          <Link
            className={styles.next}
            to={`${prefix}/${toNext}`}
            title="向后1页"
          >
            <FaAngleRight />
          </Link>
        ) : null}
      </div>
    );
  }
}

export default Pagination;
