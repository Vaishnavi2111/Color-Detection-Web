// Get HTML elements
const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const colorNameElement = document.getElementById('colorName');
const rgbValuesElement = document.getElementById('rgbValues');
const jsonInput = document.getElementById('jsonInput');
const jsonStatus = document.getElementById('jsonStatus');

// Default predefined colors (in case no json is uploaded)
let colors = [
    { name: "Red", "rgb": [255, 0, 0] },
    { name: "Blue", "rgb": [0, 0, 255] },
    { name: "Yellow", "rgb": [255, 255, 0] },
    { name: "Orange", "rgb": [255, 165, 0] },
    { name: "Green", "rgb": [0, 255, 0] },
    { name: "Pink", "rgb": [255, 192, 203] },
    { name: "Light Blue", "rgb": [173, 216, 230] },
    { name: "Royal Blue", "rgb": [65, 105, 225] },
    { name: "Bright Red", "rgb": [255, 69, 0] },
    { name: "Purple", "rgb": [128, 0, 128] },
    { name: "Violet", "rgb": [238, 130, 238] },
    { name: "White", "rgb": [255, 255, 255] },
    { name: "Black", "rgb": [0, 0, 0] }
];

// Function to find the closest color
function getClosestColor(r, g, b) {
    let closestColor = null;
    let smallestDistance = Infinity;

    colors.forEach(color => {
        const [cr, cg, cb] = color.rgb;
        const distance = Math.sqrt(
            Math.pow(r - cr, 2) +
            Math.pow(g - cg, 2) +
            Math.pow(b - cb, 2)
        );

        if (distance < smallestDistance) {
            smallestDistance = distance;
            closestColor = color;
        }
    });

    // If the color is very far from predefined colors, label it as unknown
    if (smallestDistance > 100) {
        return { name: "Unknown Color" };
    }
    return closestColor;
}

// Handle image upload
imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Calculate scaling
                const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
                const x = (canvas.width - img.width * scale) / 2;
                const y = (canvas.height - img.height * scale) / 2;

                // Draw the scaled image
                ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Handle JSON file upload for custom colors
jsonInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/json') {
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const jsonData = JSON.parse(event.target.result);
                if (Array.isArray(jsonData)) {
                    colors = jsonData; // Update the colors array with the new data
                    jsonStatus.textContent = `Colors loaded from ${file.name}`;
                } else {
                    jsonStatus.textContent = 'Invalid JSON format. Please provide an array of colors.';
                }
            } catch (err) {
                jsonStatus.textContent = 'Error reading JSON file.';
            }
        };
        reader.readAsText(file);
    } else {
        jsonStatus.textContent = 'Please upload a valid JSON file.';
    }
});

// Handle mouse click to get pixel color
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Get pixel color at the clicked position
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const r = pixel[0];
    const g = pixel[1];
    const b = pixel[2];

    // Find the closest color
    const closestColor = getClosestColor(r, g, b);

    // Display the color name and RGB values
    colorNameElement.textContent = closestColor.name;
    rgbValuesElement.textContent = `RGB(${r}, ${g}, ${b})`;
});
