// src/components/ControlSlider.js
import React, { useState } from 'react';
import { Slider } from '@mui/material';

function ControlSlider() {
    const [value, setValue] = useState(50);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // Send this value to your backend to control the PLC
        fetch(`/api/control`, {
            method: 'POST',
            body: JSON.stringify({ value: newValue }),
            headers: { 'Content-Type': 'application/json' },
        });
    };

    return (
        <div className="slider-container">
            <h3>Control Slider</h3>
            <Slider
                value={value}
                onChange={handleChange}
                min={0}
                max={100}
                step={1}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}%`}
                sx={{
                    color: '#2c7dff',
                    '& .MuiSlider-thumb': {
                        backgroundColor: '#2c7dff',
                    },
                }}
            />
            <p>Current Value: {value}%</p>
        </div>
    );
}

export default ControlSlider;
