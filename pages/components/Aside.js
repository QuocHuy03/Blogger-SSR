import React from "react";

export default function Aside() {
  return (
    <div class="hidden lg:block sticky top-[55px] h-max">
      <nav class="w-64 px-5">
        <div>
          <h3 class="font-semibold text-sm mt-10 mb-2">On This Page</h3>
          <ol class=" text-sm">
            <li>
              <a
                class="inline-flex py-1 text-slate-600 hover:text-violet-500 focus:text-violet-500"
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
