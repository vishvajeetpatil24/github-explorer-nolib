import express from "express";
import fetch from "isomorphic-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use("/scripts", express.static(__dirname + "/scripts"));
app.use(express.static(__dirname + "/public"));

app.get("/search", async (req, res, next) => {
  try {
    const response: GithubRepo[] = await fetch(
      `https://api.github.com/users/${process.env.user ?? "vercel"}/repos`
    ).then((response) => response.json());
    res.json(
      response.map((element) => ({
        name: element.name,
        stargazers_count: element.stargazers_count,
        description: element.description,
        updated_at: element.updated_at,
        language: element.language,
      }))
    );
  } catch (err) {
    res.json([]);
    return;
  }
});

app.listen(3000);
