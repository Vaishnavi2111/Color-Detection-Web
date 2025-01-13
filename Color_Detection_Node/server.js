import express from 'express';
import multer from 'multer';
import path from 'path';

// Get the current directory path for ES modules
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));  // Serve static files (like HTML, CSS)
app.use(express.static('uploads')); // Serve uploaded files
app.use('/colors.json', express.static(path.join(__dirname, 'public', 'colors.json'))); // Serve the colors.json file

app.post('/upload', upload.single('image'), (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.file.filename);
  res.json({ message: 'File uploaded successfully', filePath });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
