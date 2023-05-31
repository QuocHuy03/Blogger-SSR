import React from "react";

export default function Aside() {
  return (
    <div className="hidden lg:block sticky top-[55px] h-max">
      <nav className="w-64 px-5">
        <div>
          <h3 className="font-semibold text-sm mt-10 mb-2">On This Page</h3>
          <ol className=" text-sm">
            <li>
              <a
                className="inline-flex py-1 text-slate-600 hover:text-violet-500 focus:text-violet-500"
                href="#install-the-cli"
              >
                Install the CLI
              </a>
            </li>
          </ol>
        </div>
      </nav>
    </div>
  );
}
