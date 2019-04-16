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

// 组件-分页
class Pagination extends PureComponent<PaginationProps, {}> {
  // 默认间隔数量为3
  static defaultProps = { skipNum: 3 };

  convertTo = (to: number) => {
    const { prefix } = this.props;
    if (to === 1) {
      return prefix;
    } else {
      return `${prefix}/${to}`;
    }
  };

  // 生成分页项
  generatePaginationItems = (current: number, start: number, end: number) => {
    const items: PaginationItem[] = [];
    const { skipNum } = this.props;
    if (current - start < skipNum) {
      // 小于间隔数时显示全部页数
      _.range(start, current).forEach(i => {
        items.push({
          to: i,
        });
      });
    } else {
      // 大于间隔数时，显示第一页，省略符和前一页
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
    // 当前页
    items.push({
      to: current,
      isCurrent: true,
    });
    // 同上
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

  // 渲染省略符
  renderEllipsis = (item: PaginationItem) => {
    const { skipNum } = this.props;
    let title, angle;
    // 根据省略参数指定箭头方向
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
        to={this.convertTo(item.to)}
        title={title}
      >
        <span className={styles.ellipsis}>•••</span>
        <span className={styles.angle}>{angle}</span>
      </Link>
    );
  };

  // 渲染分页项
  renderItem = (item: PaginationItem) => {
    if (item.ellipsis) {
      return this.renderEllipsis(item);
    }
    const itemClassName =
      styles.item + (item.isCurrent ? ` ${styles.itemActive}` : "");
    return (
      <Link
        key={item.to}
        className={itemClassName}
        to={this.convertTo(item.to)}
        title={`第${item.to}页`}
      >
        {item.to}
      </Link>
    );
  };

  render() {
    const { current, total } = this.props;
    const start = 1;
    const end = total;
    // 判定是否有前一页
    const toPrev = current - start > 0 ? current - 1 : null;
    // 判定是否有后一页
    const toNext = end - current > 0 ? current + 1 : null;
    const items = this.generatePaginationItems(current, start, end);
    return (
      <div className={styles.pagination}>
        {toPrev ? (
          <Link
            className={styles.prev}
            to={this.convertTo(toPrev)}
            title="向前1页"
          >
            <FaAngleLeft />
          </Link>
        ) : null}
        {items.map(this.renderItem)}
        {toNext ? (
          <Link
            className={styles.next}
            to={this.convertTo(toNext)}
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
