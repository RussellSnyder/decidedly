import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './UserWeights.module.css';
import ImportanceSlider from '../ImportanceSlider/ImportanceSlider'
import { IMPORTANCE_SLIDER_MAX, IMPORTANCE_SLIDER_MIN } from '../ImportanceSlider/ImportanceSliderSlice';

import {
  addUserWeight,
  updateUserWeightValue,
  updateUserWeightName,
  selectUserWeights,
} from './UserWeightsSlice';

import { CustomInput, Button, Form, FormGroup, Label, Input } from 'reactstrap';


function UserWeights() {
  const dispatch = useDispatch();
  const userWeights = useSelector(selectUserWeights);

  const [initialValue, setInitialValue] = useState(0);
  const [weightName, setWeightName] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!weightName || weightName.length < 1) {
      setErrors([...errors, "please enter a name"])      
    } else {      
      dispatch(addUserWeight({name: weightName, value: initialValue}))
      setWeightName("")
      setInitialValue(0)
      setErrors([])
    }
  }
  return (
    <div className="user-weights">
      <h2>User Weights</h2>
      <div className="row mb-5">
        {errors.map(error => <p className="text-danger">
          {error}
        </p>)}
        <Form className="col-12"
          onSubmit={(e) => handleSubmit(e)}>
          <FormGroup >
            <Label for="name">Weight Name</Label>
            <Input
              onChange={(e) => setWeightName(e.target.value)}
              value={weightName}
              type="text"
              name="name"
              id="name"
              placeholder="name of weight" />
          </FormGroup>
          <FormGroup>
            <Label for="initialValue">Value</Label>
            <CustomInput
              type="range"
              // value={value}
              value={initialValue}
              min={IMPORTANCE_SLIDER_MIN}
              max={IMPORTANCE_SLIDER_MAX}
              onChange={(e) => setInitialValue(e.target.value)}
              name="initialValue"
              id="initialValue"
            />
            <div className="row">
            <div className="col-4 text-left">
              {IMPORTANCE_SLIDER_MIN}
            </div>
            <div className="col-4 text-center">
              {initialValue}
            </div>
            <div className="col-4 text-right">
              {IMPORTANCE_SLIDER_MAX}
            </div>
          </div>
          </FormGroup>
          <Button color="info" type="submit">
            Add Weight +
          </Button>
        </Form>
      </div>
      <div className="weights">
        {userWeights && userWeights.map(weight => <ImportanceSlider key={weight.id} { ...weight } />)}
      </div>
    </div>
  );
}

export default UserWeights;
