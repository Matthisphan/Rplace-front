import { ReactNode } from 'react';
import { Container } from '@mui/material';

export default function Main({ children }: { children: ReactNode }) {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      {children}
    </Container>
  );
}
