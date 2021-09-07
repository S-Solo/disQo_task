import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="bg-body w-full min-h-screen p-10">
      <main className="h-full max-w-screen-lg m-auto">
        <h1 className="text-main-title p-4 text-black">Notepad Application</h1>
        {children}
      </main>
    </div>
  );
};

export default Layout;
