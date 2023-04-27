import express from "express";
import BetterSqlite3 from "better-sqlite3";

const app = express();
const port = process.env.PORT || "8080";
const db = BetterSqlite3("readme");
db.pragma("journal_mode = WAL");

app.get("/", async (_, res) => {
  async function listStory() {
    const stories = db.prepare("select * from stories;").all();
    return stories;
  }
  const start = performance.now();
  const stories = await listStory();
  const end = performance.now();
  const time = `Execution time: ${end - start} ms`;
  console.log(time);
  res.send({ ...stories, "exec time": time });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
