export interface ErrorStatus extends Error {
  statusCode: number;
  message: string;
}
