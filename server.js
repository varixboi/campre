const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/submit-image", (req, res) => {
    const imageData = req.body.image;

    // Process the image data as needed (e.g., save it, send it to the admin, etc.)
    console.log("Received image data:", imageData);

    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
