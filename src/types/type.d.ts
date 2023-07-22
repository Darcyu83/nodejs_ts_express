declare global {
  interface Error {
    status?: number;
  }

  namespace Express {
    interface Request {
      isAuthenticated: () => boolean;
    }
  }
}

export {};
