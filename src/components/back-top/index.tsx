import React, { PureComponent } from "react";
import { FaAngleUp } from "react-icons/fa";

import styles from "./index.module.less";
import { classIf, easeInOutCubic, getCurrentScrollTop } from "@/utils";

interface BackTopState {
  visible: boolean;
}

// 组件-回滚顶部
class BackTop extends PureComponent<{}, BackTopState> {
  // 默认不可视
  readonly state: BackTopState = { visible: false };

  // 滚动至顶部
  scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    const scrollTop = getCurrentScrollTop();
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
    this.setState({ visible: getCurrentScrollTop() > headerHeight });
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
    const { visible } = this.state;
    return (
      <div
        className={styles.backTop + classIf(visible, styles.backTopOn)}
        onClick={this.scrollToTop}
      >
        <FaAngleUp />
      </div>
    );
  }
}

export default BackTop;
