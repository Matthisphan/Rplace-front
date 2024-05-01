import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import GithubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          pt: { xs: 4, sm: 8 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Stack
          direction="column"
          spacing={1}
          sx={{
            color: 'text.secondary',
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Contact me:
          </Typography>
          <Typography variant="body2">matthisphan.pro@gmail.com</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{
            color: 'text.secondary',
          }}
        >
          <IconButton
            color="inherit"
            href="https://github.com/Matthisphan"
            target="_blank"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <GithubIcon />
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.linkedin.com/in/matthis-phan/"
            target="_blank"
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}
