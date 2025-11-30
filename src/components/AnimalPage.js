import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Modal, Box, Grid, Typography, Button, Card, CardMedia, Container } from '@mui/material';
import './AnimalPage.css';

import animalData from '../data/animalData.json';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AnimalPage = () => {
  const { animalName } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState(null);
  const [map, setMap] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const currentAnimal = animalData[animalName];
    if (currentAnimal) {
      setAnimal(currentAnimal);
    } else {
      setAnimal(null);
    }
  }, [animalName]);

  useEffect(() => {
    if (map && animal?.coordinates) {
      setTimeout(() => {
        map.invalidateSize();
        map.panTo(animal.coordinates);
      }, 100);
    }
  }, [map, animal]);

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };

  // Custom red circle icon
  const redCircleIcon = L.divIcon({
    className: 'red-circle-icon',
    html: '<div style="background-color: red; width: 20px; height: 20px; border-radius: 50%;"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
  });

  if (!animal) {
    return <Typography>Animal no encontrado.</Typography>;
  }

  return (
    <Container>
      <Box>
        <Button variant="contained" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          Volver al Menú Anterior
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          {animal.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
        </Typography>

        {animal.videos && animal.videos.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Videos
            </Typography>
            <Grid container spacing={2} justifyContent="center"> {/* Centrar videos */}
              {animal.videos.map((video, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <video controls muted style={{ width: '100%', borderRadius: '8px' }}>
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {animal.images && animal.images.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Imágenes
            </Typography>
            <Grid container spacing={2} justifyContent="center"> {/* Centrar imágenes */}
              {animal.images.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card onClick={() => openModal(image)}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={image}
                      alt={`${animal.name} ${index + 1}`}
                      sx={{
                        cursor: 'pointer',
                        display: 'flex',       // Make CardMedia a flex container
                        justifyContent: 'center', // Center horizontally
                        alignItems: 'center',    // Center vertically (if needed for contain)
                        objectFit: 'cover',      // Ensure images cover the area
                      }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Zona de Monitoreo
          </Typography>
          {animal.coordinates ? (
            <Box sx={{ height: '400px', width: '100%' }}>
              <MapContainer center={animal.coordinates} zoom={13} scrollWheelZoom={false} ref={setMap} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={animal.coordinates} icon={redCircleIcon}>
                  <Popup>Observacion</Popup>
                </Marker>
              </MapContainer>
            </Box>
          ) : (
            <Typography>Mapa no disponible.</Typography>
          )}
        </Box>

        <Modal open={modalOpen} onClose={closeModal}>
          <Box sx={modalStyle}>
            <img src={selectedImage} alt="Selected" style={{ maxWidth: '90vw', maxHeight: '90vh' }} />
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default AnimalPage;
