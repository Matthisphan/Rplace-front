import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Box, Stack } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import { useNavigate } from 'react-router-dom';
import HoverGrid from './HoverGrid';

export default function Grid() {
  const [grid, setGrid] = useState(Array.from({ length: 40 }, () => Array.from({ length: 40 }, () => '')));
  const [color, setColor] = useState('#000000');
  const [seconds, setSeconds] = useState(5);
  const [hover, setHover] = useState(false);
  const [hoverpos, setHoverpos] = useState([0, 0]);
  const navigate = useNavigate();

  async function handlePixelClick(x: number, y: number) {
    if (seconds === 0) {
      const newGrid = [...grid];
      newGrid[x][y] = color;
      setGrid(newGrid);
      setSeconds(5);
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/grid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('tokens') || '',
        },
        body: JSON.stringify({ row: grid }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      localStorage.clear();
      navigate('/login');
      console.error('There was an error!', error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/grid`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('tokens') || '',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && data.row && data.row.length !== 0) {
          setGrid(data.row);
        }
      } catch (error) {
        localStorage.clear();
        navigate('/login');
        console.error('There was an error!', error);
      }
    }
    const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);
    socket.on('gridUpdated', () => {
      fetchData();
    });
    return () => {
      socket.disconnect();
    };
  }, [navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  return (
    <Box>
      <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
        {seconds !== 0 ? <p>Time remaining: {seconds}</p> : <p>Time's up!</p>}
        <MuiColorInput value={color} onChange={(newColor) => setColor(newColor)} />
      </Stack>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {grid.map((row, x) => (
          <Box key={x} style={{ display: 'flex' }}>
            {row.map((pixel, y) => (
              <Box
                key={`${x}-${y}`}
                style={{
                  width: 20,
                  height: 20,
                  border: '1px solid #ddd',
                  backgroundColor: pixel,
                  cursor: 'pointer',
                }}
                onClick={() => handlePixelClick(x, y)}
                onMouseEnter={() => {
                  setHoverpos([x, y]);
                }}
              />
            ))}
          </Box>
        ))}
      </Box>
      {hover && <HoverGrid x={hoverpos[1]} y={hoverpos[0]} />}
    </Box>
  );
}
