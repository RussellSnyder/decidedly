import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './OptionCollection.module.css';
import ImportanceSlider from '../ImportanceSlider/ImportanceSlider'
import { IMPORTANCE_SLIDER_MAX, IMPORTANCE_SLIDER_MIN } from '../ImportanceSlider/ImportanceSliderSlice';

import {
  selectOption,
} from './OptionSlice';

import { CustomInput, Button, Form, FormGroup, Label, Input } from 'reactstrap';

function Option() {
  // const dispatch = useDispatch();
  // const options = useSelector(selectOptions);
  // const option = useSelector(selectOption);

  return (
    <div className="option">
      <h2>Option</h2>
      
      {/* <div className="mb-5">
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
        {optionWeights && optionWeights.map(weight => <ImportanceSlider key={weight.id} { ...weight } />)}
      </div> */}
    </div>
  );
}

export default Option;
