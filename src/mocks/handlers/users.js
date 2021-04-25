import { rest } from "msw";

const users = [];

for (let i = 0; i < 100; i++) {
  users.push({
    type: "users",
    id: i,
    attributes: { username: `user${i}`, email: `user${i}@example.com` },
  });
}

function getUser(id) {
  return users.find((user) => user.id === id);
}

function storeUser(user) {
  users.push(user);
}

function removeUser(id) {
  const userIndex = users.findIndex((user) => user.id === id);

  if (!userIndex) return null;

  return users.splice(userIndex, 1);
}

export const handlers = [
  rest.get("https://api.mock/api/users", (req, res, ctx) => {
    const offset = Number(req.url.searchParams.get("page[offset]")) || 1;
    const limit = Number(req.url.searchParams.get("page[limit]")) || 10;
    const totalPages = Math.ceil(users.length / limit);
    const startIndex = (offset - 1) * limit;

    return res(
      ctx.json({
        data: users.slice(startIndex, startIndex + limit),
        meta: {
          offset: offset,
          limit: limit,
          total: users.length,
          totalPages: totalPages,
        },
      }),
    );
  }),

  rest.get("https://api.mock/api/users/:id", (req, res, ctx) => {
    const user = getUser(req.params.id);

    if (user === null) {
      return res(ctx.status(422), ctx.json({ error: "Not found" }));
    }

    return res(
      ctx.json({
        data: user,
      }),
    );
  }),

  rest.post("https://api.mock/api/users/", (req, res, ctx) => {
    storeUser(JSON.parse(req.body));

    return res(
      ctx.json({
        data: JSON.parse(req.body),
      }),
    );
  }),

  rest.patch("https://api.mock/api/users/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        data: JSON.parse(req.body),
      }),
    );
  }),

  rest.put("https://api.mock/api/users/:id", (req, res, ctx) => {
    return res(
      ctx.json({
        data: JSON.parse(req.body),
      }),
    );
  }),

  rest.delete("https://api.mock/api/users/:id", (req, res, ctx) => {
    const user = removeUser(req.params.id);

    if (user.length !== 1) {
      return res(ctx.status(422), ctx.json({ error: "Not found" }));
    }

    return res(
      ctx.json({
        data: user[0],
      }),
    );
  }),
];
