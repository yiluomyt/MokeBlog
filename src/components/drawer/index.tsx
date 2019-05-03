import React, { PureComponent } from "react";
import { FaTimes } from "react-icons/fa";
import { classIf } from "@/utils";

import styles from "./index.module.less";

interface DrawerState {
  visible: boolean;
  startX: number | null;
  currentX: number | null;
}

class Drawer extends PureComponent<{}, DrawerState> {
  readonly state: DrawerState = {
    visible: false,
    startX: null,
    currentX: null,
  };

  handleStart = (e: TouchEvent) => {
    this.setState({ startX: e.touches[0].clientX });
  };

  handleMove = (e: TouchEvent) => {
    this.setState({ currentX: e.changedTouches[0].clientX });
  };

  handleEnd = (e: TouchEvent) => {
    const { startX, currentX } = this.state;
    if (startX && currentX && startX - currentX >= 100) {
      this.setState({
        visible: true,
        startX: null,
        currentX: null,
      });
      window.addEventListener("touchstart", this.handleClose);
    }
  };

  handleClose = (e: TouchEvent) => {
    if (this.state.visible && e.target) {
      const drawer = this.refs.drawer as Element;
      const shouldClose = !drawer.contains(e.target as Element);
      if (shouldClose) {
        this.setState({
          visible: false,
          startX: null,
          currentX: null,
        });

        window.removeEventListener("touchstart", this.handleClose);
      }
    }
  };

  componentDidMount() {
    window.addEventListener("touchstart", this.handleStart);
    window.addEventListener("touchmove", this.handleMove);
    window.addEventListener("touchend", this.handleEnd);
  }

  componentWillUnmount() {
    window.removeEventListener("touchstart", this.handleStart);
    window.removeEventListener("touchmove", this.handleMove);
    window.removeEventListener("touchend", this.handleEnd);
  }

  render() {
    const { children } = this.props;
    const { visible } = this.state;
    return (
      <>
        <div
          ref="drawer"
          className={styles.drawer + classIf(visible, styles.drawerOn)}
        >
          <FaTimes
            className={styles.close}
            onClick={() => this.setState({ visible: false })}
          />
          {children}
        </div>
        <div className={styles.mask} />
      </>
    );
  }
}

export default Drawer;
