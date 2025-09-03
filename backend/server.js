const app = require("./src/app");
const connectdb = require("./src/db/db");
require("dotenv").config({quiet:true});

connectdb();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
