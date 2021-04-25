import { rest } from "msw";

const posts = [];

for (let i = 0; i < 100; i++) {
  posts.push({
    type: "posts",
    id: i,
    attributes: { post: `Lorem ipsum ${i}` },
    relationships: { author: { data: { type: "users", id: i } } },
    included: [
      {
        type: "users",
        id: i,
        attributes: { username: `user${i}`, email: `user${i}@example.com` },
      },
    ],
  });
}

function getPost(id) {
  return posts.find((post) => post.id === id);
}

function storePost(post) {
  posts.push(post);
}

function removePost(id) {
  const postIndex = posts.findIndex((post) => post.id === id);

  if (!postIndex) return null;

  return posts.splice(postIndex, 1);
}

export const handlers = [
  rest.get("https://api.mock/api/posts", (req, res, ctx) => {
    const offset = Number(req.url.searchParams.get("page[offset]")) || 1;
    const limit = Number(req.url.searchParams.get("page[limit]")) || 10;
    const totalPages = Math.ceil(posts.length / limit);
    const startIndex = (offset - 1) * limit;

    return res(
      ctx.json({
        data: posts.slice(startIndex, startIndex + limit),
        meta: {
          offset: offset,
          limit: limit,
          total: posts.length,
          totalPages: totalPages,
        },
      }),
    );
  }),

  rest.get("https://api.mock/api/posts/:id", (req, res, ctx) => {
    const post = getPost(req.params.id);

    if (post === null) {
      return res(ctx.status(422), ctx.json({ error: "Not found" }));
    }

    return res(
      ctx.json({
        data: post,
      }),
    );
  }),

  rest.post("https://api.mock/api/posts/", (req, res, ctx) => {
    storePost(JSON.parse(req.body));

    return res(
      ctx.json({
        data: JSON.parse(req.body),
      }),
    );
  }),

  rest.patch("https://api.mock/api/posts/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        data: JSON.parse(req.body),
      }),
    );
  }),

  rest.put("https://api.mock/api/posts/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        data: JSON.parse(req.body),
      }),
    );
  }),

  rest.delete("https://api.mock/api/posts/:id", (req, res, ctx) => {
    const post = removePost(req.params.id);

    if (post.length !== 1) {
      return res(ctx.status(422), ctx.json({ error: "Not found" }));
    }

    return res(
      ctx.json({
        data: post[0],
      }),
    );
  }),
];
