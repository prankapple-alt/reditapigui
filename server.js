const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

// Serve static folder (for logo only)
app.use("/static", express.static("static"));

app.get("/", async (req, res) => {
    try {
        const subreddit = req.query.subreddit || "memes";
        const url = `https://meme-api.com/gimme/${subreddit}`;
        const response = await axios.get(url);
        const meme = response.data;

        res.send(`
            <html>
            <head>
                <title>Redit API</title>
                <style>
                    body {
                        font-family: Arial;
                        text-align: center;
                        background: #696969;
                        color: white;
                    }
                    .logo {
                        margin-top: 20px;
                    }
                    .meme-img {
                        max-width: 80%;
                        border-radius: 10px;
                        margin-top: 20px;
                    }
                    input, button {
                        padding: 10px;
                        margin: 10px;
                        font-size: 16px;
                        border-radius: 20px;
                    }
                </style>
            </head>
            <body>

                <img class="logo" src="/static/logo.png" width="50" height="50" />

                <h1>Redit API</h1>

                <form method="GET" action="/">
                    <input type="text" name="subreddit" value="${subreddit}" placeholder="Enter subreddit"/>
                    <button type="submit">Next image</button>
                </form>

                <h2>${meme.title}</h2>
                <p>r/${meme.subreddit}</p>
                <img class="meme-img" src="${meme.url}" />

            </body>
            </html>
        `);

    } catch (error) {
        res.send("Failed to load meme 😢");
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});