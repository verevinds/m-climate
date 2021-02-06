import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { Children, memo, ReactElement } from 'react';

interface IActiveLink {
  href: string;
  children: ReactElement;
  activeClassName?: string;
  exec?: boolean;
}
const ActiveLink: React.FC<IActiveLink> = ({
  children,
  activeClassName,
  exec = false,
  ...props
}) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';
  const pathname = props.href;

  let className;

  if (exec) {
    className =
      asPath === pathname
        ? `${childClassName} ${activeClassName}`.trim()
        : childClassName;
  } else {
    className = asPath.startsWith(pathname)
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName;
  }
  return (
    <NextLink {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </NextLink>
  );
};

export default memo(ActiveLink);
