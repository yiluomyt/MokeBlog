import React, { PureComponent } from "react";
import { FaAngleUp } from "react-icons/fa";

import styles from "./index.module.less";

// 缓动函数
const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  } else {
    return (cc / 2) * ((t -= 2) * t * t + 2) + b;
  }
};

interface BackTopState {
  visible: boolean;
}

// 组件-回滚顶部
class BackTop extends PureComponent<{}, BackTopState> {
  // 默认不可视
  readonly state: BackTopState = { visible: false };

  // 当前的滚动距离
  getCurrentScrollTop() {
    return (
      window.pageYOffset ||
      document.body.scrollTop ||
      document.documentElement.scrollTop
    );
  }

  // 滚动至顶部
  scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    const scrollTop = this.getCurrentScrollTop();
    const startTime = Date.now();
    // 帧函数
    const frameFunc = () => {
      const timestamp = Date.now();
      // 间隔时间
      const time = timestamp - startTime;
      this.setScrollTop(easeInOutCubic(time, scrollTop, 0, 450));
      if (time < 450) {
        requestAnimationFrame(frameFunc);
      } else {
        this.setScrollTop(0);
      }
    };
    // TODO: 做降级适配
    requestAnimationFrame(frameFunc);
  };

  // 设置滚动距离
  setScrollTop(value: number) {
    document.body.scrollTop = value;
    document.documentElement.scrollTop = value;
  }

  // 处理滚动事件
  handleScroll = () => {
    const headerHeight = window.innerHeight * 0.65;
    this.setState({ visible: this.getCurrentScrollTop() > headerHeight });
  };

  // 监听滚动事件
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  // 取消监听
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    const backTopClassName = this.state.visible
      ? `${styles.backTop} ${styles.backTopOn}`
      : styles.backTop;
    return (
      <div className={backTopClassName} onClick={this.scrollToTop}>
        <FaAngleUp />
      </div>
    );
  }
}

export default BackTop;
