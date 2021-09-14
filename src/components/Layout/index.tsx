import React from "react";
import LogoSRC from "assets/logo.png";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="bg-body w-full min-h-screen p-4 md:p-10">
      <main className="h-full min-w-min max-w-screen-lg m-auto">
        <div className="flex items-center p-4">
          <img
            className="mr-2"
            src={LogoSRC}
            width="120px"
            height="auto"
            alt="logo"
          />
          <h1 className="text-main-title text-black">- Notepad Application</h1>
        </div>
        <div className="shadow-md bg-white rounded-md p-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
