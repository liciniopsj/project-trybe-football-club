export default interface IRes {
  status?: number;
  message?: string;
  token?: object | string | null;
  role?: string | object | null;
}
