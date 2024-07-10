import config from "./app/config/index.js";
import server from "./server.js";
import fastify from "fastify";
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";

const app = fastify({
  logger: {
    level: "debug",
    transport: {
      target: "@mgcrea/pino-pretty-compact",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
});

// const app = fastify({ logger: true });

app.register(fastifyRequestLogger);

// Custom error handler
app.setErrorHandler(function (error, req, res) {
  console.error(error);
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";
  res.code(statusCode).send({
    status_code: statusCode,
    status: false,
    error: error.name,
    message: errorMessage,
  });
});

try {
  server(app);
} catch (e) {
  console.log({ error: e });
  process.exit(1);
}

/**
 * Run the server!
 */
const start = async () => {
  try {
    await app.listen({ port: config.port }); // For fastify server
  } catch (e) {
    app.log.error(e);
    process.exit(1);
  }
};

start();
