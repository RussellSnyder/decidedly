import React from 'react';

import './ImportanceSlider.module.css';
import {
  CustomInput,
  Button,
} from 'reactstrap';

function ImportanceSlider({
  id,
  value,
  handleValueChange,
  min = -10,
  max = 10,
}) {
  return (
    <div className="importantance-slider">
      <CustomInput
        id={id}
        type="range"
        value={value}
        min={min}
        max={max}
        onChange={(e) => handleValueChange(parseInt(e.target.value))}
      />
      <div className="row">
        <div className="col-4 text-left">
          <Button onClick={()=> {
            if (value <= min) return;
            handleValueChange(value - 1)
          }}>
            -
          </Button>
        </div>
        <div className="col-4 text-center">
          {value}
        </div>
        <div className="col-4 text-right">
          <Button onClick={()=> {
            if (value >= max) return
            handleValueChange(value + 1)
          }}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ImportanceSlider;
