import React from 'react';
import { Typography, Paper } from '@mui/material';

const About: React.FC = () => {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        About Us
      </Typography>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur
        interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc. Sed euismod, nisi vel
        consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl nunc euismod nunc.
      </Typography>
      <Typography paragraph>
        Nullam euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae tincidunt nisl
        nunc euismod nunc. Sed euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae
        tincidunt nisl nunc euismod nunc.
      </Typography>
    </Paper>
  );
};

export default About;
