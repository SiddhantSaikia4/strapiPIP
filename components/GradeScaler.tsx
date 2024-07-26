import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { RadioGroup, FormControlLabel, Radio, Typography, Box } from '@mui/material';
import { Appointment } from '../models';

// Define the types for your form data
type GradeScalerValues = {
  skill1: string;
  skill2: string;
  skill3: string;
};

// Create the GradeScaler component
const GradeScaler = () => {
  const { control } = useFormContext<Appointment>();

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Skill Evaluation
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" gutterBottom>
         Java  (0 to 5):
        </Typography>
        <Controller
          name="grade.java"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} row>
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <FormControlLabel
                  key={value}
                  value={value.toString()}
                  control={<Radio />}
                  label={value.toString()}
                />
              ))}
            </RadioGroup>
          )}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" gutterBottom>
         Javascript  (0 to 5):
        </Typography>
        <Controller
          name="grade.javascript"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} row>
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <FormControlLabel
                  key={value}
                  value={value.toString()}
                  control={<Radio />}
                  label={value.toString()}
                />
              ))}
            </RadioGroup>
          )}
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" gutterBottom>
         C++  (0 to 5):
        </Typography>
        <Controller
          name="grade.Cplusplus"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} row>
              {[0, 1, 2, 3, 4, 5].map((value) => (
                <FormControlLabel
                  key={value}
                  value={value.toString()}
                  control={<Radio />}
                  label={value.toString()}
                />
              ))}
            </RadioGroup>
          )}
        />
      </Box>
    </Box>
  );
};

export default GradeScaler;
