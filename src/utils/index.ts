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