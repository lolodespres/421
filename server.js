require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 80;
app.use(express.static("public"));
app.use("/favicon.ico", express.static("public/images/favicon.ico"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
