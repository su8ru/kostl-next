import { defineController } from "./$relay";

export default defineController(() => ({
  get: () => ({ status: 400 }),
}));
