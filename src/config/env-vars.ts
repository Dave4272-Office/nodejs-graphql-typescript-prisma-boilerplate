export const env = {
  postgresqlUrl: process.env.POSTGRES_URL,
  port: parseInt(process.env.PORT || "4000"),
  requestLimit: process.env.REQ_LIMIT || "200mb",
};
