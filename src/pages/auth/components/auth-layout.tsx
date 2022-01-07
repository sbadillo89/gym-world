import React, { Fragment } from "react";

type AuthLayoutProps = {
  children?: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps): React.ReactElement => {
  return <Fragment>{children}</Fragment>;
};

export { AuthLayout };
