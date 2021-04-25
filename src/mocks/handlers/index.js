import { handlers as usersHandlers } from "./users";
import { handlers as postsHandlers } from "./posts";

const handlers = [...usersHandlers, ...postsHandlers];

export { handlers };
