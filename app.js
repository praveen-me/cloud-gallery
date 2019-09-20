const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const expressStaticGzip = require("express-static-gzip");

require("dotenv").config();

const port = 8000 || process.env.PORT;

console.log(process.env.MONGOB_URI);

mongoose.connect(process.env.MONGOB_URI, { useNewUrlParser: true });
// On successfull connection
mongoose.connection.on("connected", () => {
  console.log("Connected to Atlas Database");
});
// In case of error
mongoose.connection.on("error", e => {
  console.log("Error: ");
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "dist")));

app.use(
  "/dist/bundle",
  expressStaticGzip(path.join(__dirname, "dist/bundle"), {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
    setHeaders: function(res, path) {
      res.setHeader("Cache-Control", "public, max-age=31536000");
    }
  })
);

app.set("views", path.join(__dirname, "./server/views"));
app.set("view engine", "ejs");

if (process.env.NODE_ENV === "development") {
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config");
  var compiler = webpack(webpackConfig);

  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(require("webpack-hot-middleware")(compiler));
}

app.use("/users", require("./server/routes/users"));
app.use("/image", require("./server/routes/image"));
app.use(require("./server/routes/index"));

// Creating http server
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
