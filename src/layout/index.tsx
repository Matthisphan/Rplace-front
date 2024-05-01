import { ReactNode } from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

type Props = {
  children?: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </Box>
  );
}
