const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const colorName = document.getElementById('colorName');
const rgbValues = document.getElementById('rgbValues');

// Fetch colors data (colors.json)
let colorsData = [];

fetch('/colors.json')
  .then(response => response.json())
  .then(data => {
    colorsData = data;
  })
  .catch(err => {
    console.error("Error loading colors data: ", err);
  });

// Function to calculate Euclidean distance between two RGB values
function getColorDistance(color1, color2) {
  const rDiff = color1[0] - color2[0];
  const gDiff = color1[1] - color2[1];
  const bDiff = color1[2] - color2[2];
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

// Load image onto the canvas when user selects a file
imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = e.target.result; // Use FileReader result (data URL)
    };
    
    reader.readAsDataURL(file); // Read the image as a Data URL
  }
});

// Detect color when clicking on the image
canvas.addEventListener('click', (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
  const pixel = ctx.getImageData(x, y, 1, 1).data;
  
  const r = pixel[0];
  const g = pixel[1];
  const b = pixel[2];
  
  const rgb = `rgb(${r}, ${g}, ${b})`;
  rgbValues.textContent = rgb;

  // Find the closest color in the predefined list
  let closestColor = { name: 'Unknown', distance: Infinity };

  for (const color of colorsData) {
    const distance = getColorDistance([r, g, b], color.rgb);
    if (distance < closestColor.distance) {
      closestColor = { name: color.name, distance };
    }
  }

  // Display the color name and RGB values
  colorName.textContent = closestColor.name;
});
