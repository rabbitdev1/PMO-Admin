import { Link } from "react-router-dom";
import React from "react";
import LoadingLink from "./LoadingLink";

function DynamicButton({
  initialValue,
  href,
  state,
  color,
  type,
  iconLeft,
  onClick,
  iconRight,
  className,
  disabled,
}) {
  if (type !== "fill" && type !== "no-padding" && type !== "transparent") {
    console.error("Invalid type provided for DynamicButton. Please provide 'fill' or 'no-padding'.");
    return null;
  }

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  const commonProps = {
    onClick: handleClick,
    className: `${type === "fill" ? "px-4" : type === "no-padding" ? "p-0" : "p-2"
      }  rounded-lg text-sm h-auto py-2.5 hover:opacity-80  justify-center items-center gap-2 flex select-none no-underline  ${className} `,
    disabled,
  };

  const content = (
    <div className="flex flex-row gap-2 items-center">
      {iconLeft && React.cloneElement(iconLeft, { fill: color })}
      {initialValue && (
        <span className="font-medium line-clamp-1">{initialValue}</span>
      )}
      {iconRight && React.cloneElement(iconRight, { fill: color })}
    </div>
  );

  return (
    <div className="inline-flex">
      {href ? (
        <LoadingLink to={href} state={state} {...commonProps}>
          {content}
        </LoadingLink>
      ) : (
        <button {...commonProps}>{content}</button>
      )}
    </div>
  );
}

export default DynamicButton;
