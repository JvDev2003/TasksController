const env = process.env.ENV;
const port = process.env.PORT;
const dbUri = process.env.DBURI;

export default {
  port: port,
  env: env,
  dbUri: dbUri,
};
