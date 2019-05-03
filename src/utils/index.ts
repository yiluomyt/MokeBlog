export function classIf(
  condition: any,
  className: string,
  isFirst: boolean = false
) {
  if (condition && className) {
    return isFirst ? className : ` ${className}`;
  } else {
    return ``;
  }
}

// 缓动函数
export function easeInOutCubic(t: number, b: number, c: number, d: number) {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  }
  return (cc / 2) * ((t -= 2) * t * t + 2) + b;
}

// 当前的滚动距离
export function getCurrentScrollTop() {
  return (
    window.pageYOffset ||
    document.body.scrollTop ||
    document.documentElement.scrollTop
  );
}
