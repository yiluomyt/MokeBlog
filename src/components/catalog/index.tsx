import React, { PureComponent } from "react";

import styles from "./index.module.less";
import { MarkdownHeading } from "@/types";
import { classIf, easeInOutCubic, getCurrentScrollTop } from "@/utils";

function scrollTo(id: string) {
  const scrollTop = getCurrentScrollTop();
  const target = document.getElementById(id);
  if (!target) {
    return;
  }
  const targetScrollTop = target.offsetTop;
  const startTime = Date.now();
  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nextScrollTop = easeInOutCubic(time, scrollTop, targetScrollTop, 450);
    window.scrollTo(window.pageXOffset, nextScrollTop);
    if (time < 450) {
      requestAnimationFrame(frameFunc);
    }
  };
  requestAnimationFrame(frameFunc);
}

interface CatalogProps {
  headings: Array<MarkdownHeading>;
  className?: String;
}

interface CatalogState {
  active: null | string;
}

class Catalog extends PureComponent<CatalogProps, CatalogState> {
  readonly state: CatalogState = { active: null };

  private scrollEvent: any;
  private links: Array<{
    id: string;
    value: string;
    depth: number;
  }> = [];

  constructor(props: any) {
    super(props);
    this.links = (props.headings as Array<MarkdownHeading>)
      .filter(h => h.depth > 1)
      .map(h => ({
        id: h.value.replace(/ /g, "-").toLowerCase(),
        ...h,
      }));
  }

  componentDidMount() {
    this.scrollEvent = window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  }

  componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
  }

  handleScroll = () => {
    this.setState({
      active: this.getCurrentAnchor(),
    });
  };

  getCurrentAnchor() {
    const scrollTop = getCurrentScrollTop() + 5;
    let active: HTMLElement | null = null;
    this.links.forEach(link => {
      const target = document.getElementById(link.id);
      if (target) {
        if (target.offsetTop > scrollTop) return;
        if (!active) {
          active = target;
        } else if (target.offsetTop >= active!.offsetTop) {
          active = target;
        }
      }
    });

    return active ? active!.id : null;
  }

  render() {
    const mainHeading = this.props.headings.filter(head => head.depth === 1)[0];
    const { className } = this.props;
    const { active } = this.state;
    return (
      <div className={styles.catalog + classIf(className, className as string)}>
        <h3>{mainHeading.value}</h3>
        <ul>
          {this.links.map(link => (
            <li
              className={classIf(link.id === active, styles.active, true)}
              key={link.id}
              data-depth={link.depth}
            >
              <a
                href={"#" + link.id}
                title={link.value}
                onClick={e => {
                  e.preventDefault();
                  scrollTo(link.id);
                }}
              >
                {link.value}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Catalog;
