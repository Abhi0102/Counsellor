require("dotenv").config();
const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

// Swagger Related
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/temp/" }));
app.use(cookieParser());

// Swagger Document Middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Logger Middleware
app.use(morgan("tiny"));

// Routes

const user = require("./routes/user");

//Route Middleware

app.use("/api/v1", user);

app.use(errorHandler);

module.exports = app;
