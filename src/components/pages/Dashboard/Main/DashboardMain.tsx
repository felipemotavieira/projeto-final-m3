import { UserContext } from "../../../../context/Context";
import React, { useContext } from "react";

export const DashboardMain = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <ul>
      {user.posts?.map((post) => (
        <li key={post.id}>
          <p>{post.postImage}</p>
          <p>{post.title}</p>
          <p>{post.description}</p>
        </li>
      ))}
    </ul>
  );
};
