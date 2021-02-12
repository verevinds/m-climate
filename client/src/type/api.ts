export type RestDelete = {
  data: { n: number; ok: number; deletedCount: number };
  err: null | string;
  message: string;
  _id: string;
};
