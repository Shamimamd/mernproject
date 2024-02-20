const mongoose = require("mongoose");

main().catch((err) => console.log(err));
main().then((data) => console.log("mongo db is connected"));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
