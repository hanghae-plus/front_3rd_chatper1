import Post from "./Post";

export default function PostList(postList = dummyPostList) {
  const PostListContainer = document.createElement("div");
  PostListContainer.className = "space-y-4";

  postList.forEach((post) => {
    PostListContainer.appendChild(Post(post));
  });

  return PostListContainer;
}

const dummyPostList = [
  {
    userName: "user1",
    postedTime: "2023-10-01T10:00:00Z",
    content: "Content 1",
  },
  {
    userName: "user2",
    postedTime: "2023-10-02T11:00:00Z",
    content: "Content 2",
  },
  {
    userName: "user3",
    postedTime: "2023-10-03T12:00:00Z",
    content: "Content 3",
  },
  {
    userName: "user4",
    postedTime: "2023-10-04T13:00:00Z",
    content: "Content 4",
  },
  {
    userName: "user5",
    postedTime: "2023-10-05T14:00:00Z",
    content: "Content 5",
  },
  {
    userName: "user6",
    postedTime: "2023-10-06T15:00:00Z",
    content: "Content 6",
  },
  {
    userName: "user7",
    postedTime: "2023-10-07T16:00:00Z",
    content: "Content 7",
  },
  {
    userName: "user8",
    postedTime: "2023-10-08T17:00:00Z",
    content: "Content 8",
  },
  {
    userName: "user9",
    postedTime: "2023-10-09T18:00:00Z",
    content: "Content 9",
  },
  {
    userName: "user10",
    postedTime: "2023-10-10T19:00:00Z",
    content: "Content 10",
  },
];
