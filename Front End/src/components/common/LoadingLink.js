import React from "react";
import NProgress from "nprogress";
import { Link } from "react-router-dom";

const LoadingLink = ({ href, state, children, className }) => {
  const handleClick = () => {
    NProgress.start();

    setTimeout(() => {
      NProgress.done();
    }, 500);
  };

  return (
    <Link
      to={href}
      state={state}
      className={`${className || ""} no-underline text-lightColor dark:text-darkColor`}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default LoadingLink;
