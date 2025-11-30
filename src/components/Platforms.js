import React, { useState } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, Container, Paper, Divider, Modal, Grid, List, ListItem, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import animalData from '../data/animalData.json';
import './Platforms.css';

const MotionCard = motion(Card);

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const Platforms = () => {
  const platformsData = Object.values(animalData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage('');
  };
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const yoloImages = [
    'Captura de pantalla 2025-11-30 122427.png',
    'Captura de pantalla 2025-11-30 122438.png',
    'Captura de pantalla 2025-11-30 122443.png',
    'Captura de pantalla 2025-11-30 122451.png',
    'Captura de pantalla 2025-11-30 122455.png',
    'Captura de pantalla 2025-11-30 122502.png',
    'Captura de pantalla 2025-11-30 122511.png',
    'Captura de pantalla 2025-11-30 122518.png',
    'Captura de pantalla 2025-11-30 122536.png',
  ];
  
  const row1Images = yoloImages.slice(0, 5);
  const row2Images = yoloImages.slice(5);

  const cameraTrapImages = [
    'Copertina_blog_-_Wild_Guardian_WIFI.jpg',
    'Captura de pantalla 2025-11-30 124719.png',
  ];

  const droneImages = [
    'annotated_image (36).png',
    'annotated_image (37).png',
    'annotated_image (38).png',
    'annotated_image (39).png',
    'annotated_image (40).png',
    'annotated_image (41).png',
    'annotated_image (42).png',
    'annotated_image (43).png',
    'annotated_image (45).png',
  ];

  const droneImages_row1 = droneImages.slice(0, 3);
  const droneImages_row2 = droneImages.slice(3, 6);
  const droneImages_row3 = droneImages.slice(6, 9);

  return (
    <Box>
      <Container sx={{ my: 4 }}>
        <Paper elevation={6} sx={{ p: { xs: 3, md: 5 }, textAlign: 'center', borderRadius: 2, minHeight: { xs: 'auto', md: '300px' }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Bienvenido a Fauna LAB
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Un proyecto innovador dedicado al monitoreo y conservación de la fauna silvestre en Neuquén.
          </Typography>
          <Typography variant="body1" paragraph>
            Nuestra plataforma utiliza tecnología de vanguardia para el análisis y la identificación de especies en su hábitat natural. A través del algoritmo de detección inteligente <strong>YOLO</strong>, y un agente de inteligencia artificial que corre en <strong>n8n</strong>, analizamos detalladamente características como la simetría, apariencia, y paleta de colores de cada animal. Este análisis es potenciado por el avanzado modelo de <strong>Deepseek</strong>, permitiéndonos obtener información precisa y valiosa para la protección de nuestra biodiversidad.
          </Typography>
        </Paper>
        <Divider sx={{ my: 4 }} />
      </Container>

      <div className="card-grid">
        {platformsData.map((platform, index) => (
          <MotionCard
            key={platform.name || index}
            sx={{ height: 300, display: 'flex', flexDirection: 'column' }} // Fixed height
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <CardActionArea component={Link} to={platform.path} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={platform.thumbnail}
                alt={platform.name}
                sx={{
                  objectFit: 'cover',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
              <CardContent sx={{ flexGrow: 1, overflow: 'hidden', textAlign: 'center' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {platform.name.replace(/_/g, ' ')}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {platform.name === 'Aguila - Alumine' ? 'Dirección de Fauna Aluminé' : platform.name === 'Ciervos Huechulafquen' ? 'Dirección de Tecnología' : platform.name === 'Ciervo SMA' ? 'Dirección de Tecnología' : platform.name === 'Guanacos JDLA' ? 'Direccion de Fauna JDLA' : platform.name === 'Huemul VLA' ? 'Policia Provincial' : platform.name === 'Jabali Camino Lolog' ? 'Dirección de Fauna SMA' : platform.name === 'Monito del Monte Covisal' ? 'Vecino SMA' : platform.name === 'Traful Puma' ? 'Dirección de Fauna Traful' : platform.name === 'Puma Camino Rucahue SMA' ? 'Vecino SMA' : platform.name === 'Truchas Boca Chimehuin' ? 'Dirección de Fauna JDLA' : platform.name === 'Zorro centro SMA' ? 'Dirección de Fauna SMA' : platform.name === 'Zorro Golf SMA' ? 'Dirección de Fauna SMA' : 'Direccion de Fauna'}
                </Typography>
              </CardContent>
            </CardActionArea>
          </MotionCard>
        ))}
      </div>

      <Container sx={{ my: 4 }}>
        <Divider sx={{ my: 4 }} />
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, textAlign: 'center', borderRadius: 2, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Algoritmo YOLO y Agente de IA de Análisis
          </Typography>
          <Typography variant="body1" paragraph>
            En el corazón de Fauna LAB reside una potente sinergia tecnológica. Empleamos el algoritmo <strong>YOLO (You Only Look Once)</strong>, líder en la detección de objetos en tiempo real, para identificar con precisión la presencia y el tipo de fauna silvestre en nuestras imágenes y videos. Cada detección es luego procesada por un agente de inteligencia artificial avanzado, orquestado en la plataforma <strong>n8n</strong>. Este agente no solo clasifica, sino que realiza un análisis profundo de características como la simetría morfológica, patrones de coloración y movimientos específicos de cada animal. Esta fase de análisis detallado, impulsada por modelos como <strong>Deepseek</strong>, es crucial para la extracción de datos significativos que informan nuestras estrategias de conservación y manejo.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
              {row1Images.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => openModal(`/algoritmo_image/${image}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <Box
                    component="img"
                    src={`/algoritmo_image/${image}`}
                    alt={`YOLO example ${index + 1}`}
                    sx={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </motion.div>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              {row2Images.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => openModal(`/algoritmo_image/${image}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <Box
                    component="img"
                    src={`/algoritmo_image/${image}`}
                    alt={`YOLO example ${index + 1}`}
                    sx={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </motion.div>
              ))}
            </Box>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Red de Cámaras Trampa
          </Typography>
          <Typography variant="body1" paragraph>
            Nuestra infraestructura se sustenta en una extensa y estratégicamente ubicada <strong>Red de Cámaras Trampa</strong> distribuidas en los ecosistemas clave de Neuquén. Estas cámaras, equipadas con sensores de movimiento y visión nocturna, operan de manera autónoma, capturando evidencia invaluable de la actividad de la fauna sin intervención humana directa. Cada dispositivo es un punto de recolección de datos vital que alimenta continuamente nuestro sistema de monitoreo, permitiendo una observación no invasiva y a largo plazo de las poblaciones animales, sus patrones de comportamiento y el impacto de los factores ambientales.
          </Typography>
          <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
            {cameraTrapImages.map((image, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  component="img"
                  src={`/${image}`}
                  alt={`Camera Trap Example ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: '200px', // Fixed height
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
        <Divider sx={{ my: 4 }} />
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, textAlign: 'center', borderRadius: 2 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Relevamiento Drone
          </Typography>
          <Typography variant="body1" paragraph>
            El uso de drones equipados con cámaras de alta resolución nos permite realizar un monitoreo aéreo exhaustivo de ambientes, hábitats y poblaciones de fauna silvestre. Esta tecnología es fundamental para la fiscalización y control, permitiendo detectar actividades ilegales, evaluar el estado de conservación de áreas remotas y obtener datos precisos para la toma de decisiones.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
              {droneImages_row1.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => openModal(`/Drone/${image}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <Box
                    component="img"
                    src={`/Drone/${image}`}
                    alt={`Drone example ${index + 1}`}
                    sx={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </motion.div>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
              {droneImages_row2.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => openModal(`/Drone/${image}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <Box
                    component="img"
                    src={`/Drone/${image}`}
                    alt={`Drone example ${index + 1}`}
                    sx={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </motion.div>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              {droneImages_row3.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => openModal(`/Drone/${image}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <Box
                    component="img"
                    src={`/Drone/${image}`}
                    alt={`Drone example ${index + 1}`}
                    sx={{
                      width: '150px',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />
                </motion.div>
              ))}
            </Box>
          </Box>
        </Paper>
        <Divider sx={{ my: 4 }} />
        <Box sx={{ width: { xs: '90%', md: '70%' }, mx: 'auto', my: 4 }}>
          <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, textAlign: 'center', borderRadius: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Proximas acciones:
            </Typography>
            <List>
              <ListItem sx={{ justifyContent: 'center' }}>
                <Button variant="contained" color="primary" sx={{ width: { xs: '100%', md: 300 }, height: '48px' }}>
                  Apertura social para relevamiento
                </Button>
              </ListItem>
              <ListItem sx={{ justifyContent: 'center' }}>
                <Button variant="contained" color="primary" sx={{ width: { xs: '100%', md: 300 }, height: '48px' }}>
                  Proyecto de tokenizar ejemplar de fauna silvestre
                </Button>
              </ListItem>
              <ListItem sx={{ justifyContent: 'center' }}>
                <Button variant="contained" color="primary" sx={{ width: { xs: '100%', md: 300 }, height: '48px' }}>
                  Proyecto de tokenizar un area natural protegida
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Box>
        <Divider sx={{ my: 4 }} />
      </Container>
      
      <Modal open={modalOpen} onClose={closeModal}>
        <Box sx={modalStyle}>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '90vw', maxHeight: '90vh' }} />
        </Box>
      </Modal>

      <Box className="footer-image">
        <img src="/Guardafauna - 1.png" alt="Guardafauna 1" className="footer-logo" />
        <img src="/provincia.png" alt="Provincia Logo" className="footer-logo" />
      </Box>
    </Box>
  );
};

export default Platforms;