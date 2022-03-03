const express = require("express");
const app = express();

const flipsRouter = require("./flips/flips.router");
const counts = require("./data/counts-data");

app.use(express.json());

app.use("/counts/:countId", (req, res, next) => {
  const { countId } = req.params;
  const foundCount = counts[countId];

  if (foundCount === undefined) {
    next({
      status: 404,
      message: `Count id not found: ${countId}`,
    });
  } else {
    res.json({ data: foundCount });
  }
});

app.use("/counts", (req, res) => {
  res.json({ data: counts });
});


app.use("/flips", flipsRouter);

// Not found handler
app.use((req, res, next) => {
  next(`Not found: ${req.originalUrl}`);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json({ error: message });
});

module.exports = app;