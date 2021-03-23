import { rest } from "msw";

const users = [
  {
    id: "404012b7-e76b-4c0f-9f20-4ab6012df129",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.mock",
    active: true,
  },
];

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
    return res(
      ctx.json({
        data: users,
        meta: {
          page: 1,
          limit: 10,
          total: 1,
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
