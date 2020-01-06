module.exports = app => {
  const api_v = process.env.API_V;

  app.use(`/${api_v}/verses`, require('./verses'));
  app.use(`/${api_v}/books`, require('./books.js'));
};
