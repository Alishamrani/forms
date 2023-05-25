const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

// Set up file upload storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniquePrefix + '-' + file.originalname);
    }
});

// Set up file upload middleware
const upload = multer({ storage: storage });

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

// Handle form submission and file upload
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
    } else {
        res.send('File uploaded successfully.');
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
