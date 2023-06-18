export const prepareResponse = <T = any, D = T>(
  data: T = null,
  error: D = null,
) => ({
  data,
  error,
});
