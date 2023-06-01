import React, { createContext, useState } from "react";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blogsData, setBlogsData] = useState(null);

  return (
    <BlogContext.Provider value={{ blogsData, setBlogsData }}>
      {children}
    </BlogContext.Provider>
  );
};
