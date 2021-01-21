import React from "react";

interface IProps {
  to: string;
  children: JSX.Element;
}

const LinkContainer = (props: IProps) =>
  <a href={props.to}>
    {props.children}
  </a>;

(LinkContainer as any).whyDidYouRender = true;

export default LinkContainer;
