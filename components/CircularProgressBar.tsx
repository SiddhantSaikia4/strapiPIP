import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

function CircularProgressWithLabel(props) {
  const { value } = props;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" size={80} {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
           boxShadow: 2 ,
           borderRadius: '40px',
           
        }}
      >
        <Tooltip title={value < 100 ? 'Incomplete' : ''} arrow>
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(value)}%`}
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default CircularProgressWithLabel;
