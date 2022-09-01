export const DashboardMain = () => {
  const posts = [
    {
      postImage:
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Franca_02.jpg",
      title: "Fraca não é França",
      description:
        "Franca é uma cidade do estado de SP, Brasil, continente da America do Sul",
      localization: [
        {
          cityId: "500001",
          state: "35",
          cityName: "jgclsdgv",
        },
      ],
      category: null,
      likes: null,
      saved: null,
      comments: null,
      userId: 1,
      id: 1,
    },
    {
      postImage:
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Franca_02.jpg",
      title: "Taubate <3",
      description: "Lar da Gravida de taubate",
      localization: [
        {
          cityId: "6747647",
          state: "674647",
          cityName: "jgclsdgv",
        },
      ],
      category: "Updade",
      likes: null,
      saved: null,
      comments: null,
      userId: 1,
      id: 2,
    },
    {
      postImage:
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Franca_02.jpg",
      title: "Fraca não é França",
      description:
        "Franca é uma cidade do estado de SP, Brasil, continente da America do Sul",
      localization: [
        {
          cityId: "500001",
          state: "35",
          cityName: "jgclsdgv",
        },
      ],
      category: null,
      likes: null,
      saved: null,
      comments: null,
      userId: 2,
      id: 3,
    },
    {
      postImage:
        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Franca_02.jpg",
      title: "Taubate <3",
      description: "Lar da Gravida de taubate",
      localization: [
        {
          cityId: "6747647",
          state: "674647",
          cityName: "jgclsdgv",
        },
      ],
      category: "Updade",
      likes: null,
      saved: null,
      comments: null,
      userId: 2,
      id: 4,
    },
  ];

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.postImage}
            {/* {post.title}
            {post.description}
            {post.localization}
            {post.category}
            {post.likes}
            {post.saved}
            {post.comments}
            {post.userId} */}
          </li>
        ))}
      </ul>
    </div>
  );
};
