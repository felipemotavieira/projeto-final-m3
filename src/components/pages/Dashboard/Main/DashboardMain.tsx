import { UserContext } from "../../../../context/Context";
import React, { useContext, useEffect } from "react";

export const DashboardMain = () => {
  const { posts, getPosts } = useContext(UserContext);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <p>{post.postImage}</p>
            <p>{post.title}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
