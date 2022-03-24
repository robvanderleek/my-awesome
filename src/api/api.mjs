import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {fileURLToPath} from 'url';
import {Octokit} from "@octokit/rest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const octokit = new Octokit();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/express_backend', (req, res) => {
    res.send({express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT'});
});

app.get('/user/:username/avatar_url', async (req, res, next) => {
    const username = req.params.username;
    try {
        const response = await octokit.rest.users.getByUsername({username: username});
        const avatar_url = response.data.avatar_url;
        res.send(avatar_url);
    } catch (error) {
        next(error);
    }
});

app.get('/user/:username/my-awesome', async (req, res, next) => {
    try {
        const username = req.params.username;
        const response = await octokit.rest.repos.getContent({
            owner: username,
            repo: username,
            path: 'my-awesome.md'
        });
        let content = response.data.content;
        content = content.replace(/\n/gm, '');
        res.send(atob(content));
    } catch (error) {
        next(error);
    }
})

app.use(express.static(path.join(__dirname, '../../build')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send('Something Broke!');
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));

