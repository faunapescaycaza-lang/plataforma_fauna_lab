const fs = require('fs');
const path = require('path');

const animalesDir = path.join(__dirname, 'public', 'Animales', 'Monitoreo_Animales');
const outputDir = path.join(__dirname, 'src', 'data');
const outputFile = path.join(outputDir, 'animalData.json');

const animalData = {};

// Function to convert DMS to decimal degrees
function dmsToDecimal(dms) {
  const parts = dms.replace(/[^\d.SWNE]/g, ' ').split(/[^\d.SWNE]+/);
  const degrees = parseFloat(parts[0]);
  const minutes = parseFloat(parts[1]);
  const seconds = parseFloat(parts[2]);
  const direction = parts[3];

  let decimal = degrees + minutes / 60 + seconds / 3600;

  if (direction === 'S' || direction === 'W') {
    decimal = -decimal;
  }

  return decimal;
}

fs.readdirSync(animalesDir).forEach(animalName => {
  const animalDir = path.join(animalesDir, animalName);
  if (fs.statSync(animalDir).isDirectory()) {
    const coordPath = fs.existsSync(path.join(animalDir, 'coordenada.txt'))
      ? path.join(animalDir, 'coordenada.txt')
      : path.join(animalDir, 'coordenadas.txt');
    let coords = null;
    if (fs.existsSync(coordPath)) {
      const coordFileContent = fs.readFileSync(coordPath, 'utf8').trim();
      if (coordFileContent.includes('°')) {
        const dmsCoords = coordFileContent.split(/(?<=[SWNE])\s*(?=\d)/);
        if (dmsCoords.length === 2) {
          coords = [dmsToDecimal(dmsCoords[0]), dmsToDecimal(dmsCoords[1])];
        }
      } else {
        const parts = coordFileContent.split(' ')
          .map(p => p.replace(',', '.'))
          .filter(p => !isNaN(parseFloat(p)) && p.trim() !== '');
        if (parts.length >= 2) {
          coords = [parseFloat(parts[0]), parseFloat(parts[1])];
        }
      }
    }

    const images = fs.readdirSync(animalDir)
      .filter(file => file.startsWith('annotated_') && (file.endsWith('.png') || file.endsWith('.jpg')))
      .map(file => `/Animales/Monitoreo_Animales/${animalName}/${file}`);

    const videos = fs.readdirSync(animalDir)
      .filter(file => file.endsWith('.mp4') || file.endsWith('.mov'))
      .map(file => `/Animales/Monitoreo_Animales/${animalName}/${file}`);

    let thumbnail = images[0] || 'https://via.placeholder.com/100/000000/FFFFFF?text=No+Image';
    if (animalName === 'Truchas_Boca_Chimehuin') {
      thumbnail = '/Animales/Monitoreo_Animales/Truchas_Boca_Chimehuin/Captura de pantalla 2025-11-28 201229.png';
    }

    animalData[animalName] = {
      name: animalName.replace(/_/g, ' '),
      path: `/animal/${animalName}`,
      thumbnail: thumbnail,
      images: images,
      videos: videos,
      coordinates: coords,
    };
  }
});

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(outputFile, JSON.stringify(animalData, null, 2));

console.log('Animal data generated successfully!');
