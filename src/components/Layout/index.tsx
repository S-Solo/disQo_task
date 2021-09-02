import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="bg-body w-screen h-screen p-10">
      <main className="h-full">{children}</main>
    </div>
  );
};

export default Layout;
