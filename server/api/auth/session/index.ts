export type Methods = {
  post: {
    reqBody: {
      token: string;
    };
  };
  delete: {
    reqBody: Record<string, never>;
  };
};
