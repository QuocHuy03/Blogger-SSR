import React from "react";


export default function NavBar() {
  return (
    <nav className="border-gray-200 mx-2 px-2 py-2.5 rounded dark:bg-slate-800">
      <div className="container flex justify-between items-center mx-auto pt-3">
        <div className="flex items-center mx-auto">
          <span className="text-xl font-medium whitespace-nowrap dark:text-white">
            Welcome Admin
          </span>
        </div>
        <div className="flex justify-end pr-4">
       
        </div>
      </div>
    </nav>
  );
}
