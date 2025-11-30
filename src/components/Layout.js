import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { motion } from 'framer-motion';

const Layout = ({ children, colorMode, mode }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ minHeight: { xs: 80, md: 100 } }}>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typography
                variant="h4"
                component="div"
                sx={{
                  fontFamily: '"Raleway", sans-serif',
                  fontWeight: 700,
                  border: '2px solid white',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  mr: 2,
                }}
              >
                FL
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontFamily: '"Raleway", sans-serif',
                  fontWeight: 400,
                }}
              >
                Fauna LAB
              </Typography>
            </motion.div>
          </Box>
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>
      <AppBar position="static" color="primary" component="footer">
        <Toolbar>
          <Typography variant="body2" color="inherit" sx={{ flexGrow: 1, textAlign: 'center' }}>
            © {new Date().getFullYear()} Dirección de Fauna. Todos los derechos reservados.
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Layout;
