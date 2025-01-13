# Color Detection Web Applications

This repository contains three color detection web applications created using different technologies. Each application allows users to detect colors on images by clicking on them. The applications include predefined or customizable color datasets with corresponding RGB values.

---

## Table of Contents

- [Applications Overview](#applications-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [How to Use](#how-to-use)
- [Folder Structure](#folder-structure)
- [License](#license)

---

## Applications Overview

1. **Color Detection JS**

   - A simple application built with HTML, CSS, and JavaScript.
   - Includes a predefined JSON file with 900 colors and their RGB values.

2. **Color Detection Custom JSON**

   - Allows users to upload a custom JSON file with color definitions.
   - Falls back to a default JSON file if no custom file is provided.

3. **Color Detection Node.js**
   - A Node.js-based application for color detection.
   - Stores predefined colors in separate JSON files, offering scalability and flexibility.

---

## Features

- Detect colors by clicking on different parts of an image.
- Displays the closest matching color name and its RGB values.
- Supports both predefined and customizable color datasets.
- Optimized and user-friendly interface.

---

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js

---

## How to Use

### For Color Detection JS

1. Open the `index.html` file in a browser.
2. Upload an image and click on it to detect colors.

### For Color Detection Custom JSON

1. Open the `index.html` file in a browser.
2. Upload an image and a custom JSON file (optional).
3. Click on the image to detect colors.

### For Color Detection Node.js

1. Install dependencies:
   ```bash
   npm install
   ```
2. node server.js
3. Open the app in your browser and upload an image to detect colors.
