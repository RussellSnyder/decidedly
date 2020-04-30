import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './ImportanceSlider.module.css';
import { CustomInput, Button, Input } from 'reactstrap';
import { IMPORTANCE_SLIDER_MAX, IMPORTANCE_SLIDER_MIN } from './ImportanceSliderSlice';
import { deleteUserWeight, updateUserWeightName, updateUserWeightValue } from '../UserWeights/UserWeightsSlice';

function ImportanceSlider({id, name, value}) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="weighting-slider row mb-4">
        {!isEditing &&
          <div className="col-sm-4">
            {name}
            <Button
              block
              size="small"
              color="warning"
              outline onClick={() => setIsEditing(!isEditing)}
            >
              Edit Name
            </Button>
          </div>
        }
        {isEditing &&
          <div className="col-sm-4">
            <Input
              onBlur={() => {
                setIsEditing(false)
              }}
              onChange={(e) => {
                dispatch(updateUserWeightName({
                  id,
                  name: e.target.value
                }))
              }}
              value={name}
              type="text"
              name="name"
              id="name"
            />
          </div>
        }
        <div className="col-sm-7">
          <CustomInput
            id={id}
            type="range"
            value={value}
            min={IMPORTANCE_SLIDER_MIN}
            max={IMPORTANCE_SLIDER_MAX}
            onChange={(e)=> dispatch(updateUserWeightValue({id, value: parseInt(e.target.value)}))}
          />
          <div className="row">
            <div className="col-4 text-left">
              <Button onClick={()=> {
                if (value <= IMPORTANCE_SLIDER_MIN) return
                dispatch(updateUserWeightValue({id, value: --value}))}
              }>
                -
              </Button>
            </div>
            <div className="col-4 text-center">
              {value}
            </div>
            <div className="col-4 text-right">
              <Button onClick={()=> {
                if (value >= IMPORTANCE_SLIDER_MAX) return
                dispatch(updateUserWeightValue({id, value: ++value}))}
              }>
                +
              </Button>
            </div>
          </div>
        </div>
        <div className="col-sm-1 text-right">
          <Button
            size="small"
            color="danger"
            outline onClick={() => dispatch(deleteUserWeight(id))}
          >
            X
          </Button>
        </div>
    </div>
  );
}

export default ImportanceSlider;
