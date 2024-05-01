import { useState, useEffect } from 'react';
import { Box, Card } from '@mui/material';

export default function HoverGrid({ x, y }: { x: number; y: number }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Met à jour les coordonnées de la souris lorsqu'elle se déplace
  const updateMousePosition = (e: any) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener('mousemove', updateMousePosition);
    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <Card sx={{ position: 'absolute', left: mousePosition.x - 40, top: mousePosition.y - 30 }}>
      <Box sx={{ width: 80, height: 20, bgcolor: 'black', color: 'white', textAlign: 'center' }}>
        x: {y} y: {x}
      </Box>
    </Card>
  );
}
