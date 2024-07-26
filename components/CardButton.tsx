// components/CardButton.js
import React from 'react';
import { useRouter } from 'next/router';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

const CardButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/form');
  };

  return (
    <Card variant="outlined">
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography variant="h5" component="div">
            Click Here to Go to Form
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CardButton;
