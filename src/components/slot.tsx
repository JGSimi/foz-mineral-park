import * as React from "react";

type AnyProps = Record<string, unknown>;

export const Slot = React.forwardRef<HTMLElement, { children?: React.ReactNode } & AnyProps>(
  function Slot({ children, ...props }, ref) {
    if (!React.isValidElement(children)) return null;
    const childProps = (children.props ?? {}) as AnyProps;
    const merged: AnyProps = { ...childProps, ...props };
    const childClass = (childProps.className as string | undefined) ?? "";
    const parentClass = (props.className as string | undefined) ?? "";
    if (childClass || parentClass) {
      merged.className = [parentClass, childClass].filter(Boolean).join(" ");
    }
    return React.cloneElement(
      children as React.ReactElement<AnyProps>,
      { ...merged, ref } as AnyProps,
    );
  },
);
