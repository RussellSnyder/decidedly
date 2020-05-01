import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './UserWeights.module.css';
import ImportanceSlider, { IMPORTANCE_SLIDER_MAX, IMPORTANCE_SLIDER_MIN } from '../ImportanceSlider/ImportanceSlider'

import {
  addUserWeight,
  deleteUserWeight,
  updateUserWeightValue,
  updateUserWeightName,
  selectUserWeights,
} from './UserWeightsSlice';

import { CustomInput, Button, Form, FormGroup, Label, Input } from 'reactstrap';

function UserWeights({ handleSave }) {
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
      <h2>
        User Weights
        <Button
          color="success"
          className="float-right"
          onClick={() => handleSave({userWeights})}
        >
          Save User Weights
        </Button>
      </h2>
      <div className="mb-5">
        {errors.map(error => <p className="text-danger">
          {error}
        </p>)}
        <Form className="row"
          onSubmit={(e) => handleSubmit(e)}>
          <FormGroup className="col-sm-4">
            <Label for="name">Weight Name</Label>
            <Input
              onChange={(e) => setWeightName(e.target.value)}
              value={weightName}
              type="text"
              name="name"
              id="name"
              placeholder="name of weight" />
          </FormGroup>
          <FormGroup className="col-sm-7">
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
        {userWeights && userWeights.map(weight => {
        return <ImportanceSlider
          key={weight.id}
          { ...weight }
          handleNameChange={(payload) => dispatch(updateUserWeightName(payload))}
          handleValueChange={(payload) => dispatch(updateUserWeightValue(payload))}
          handleDelete={(payload) => dispatch(deleteUserWeight(payload))}
        />})}
      </div>
    </div>
  );
}

export default UserWeights;
