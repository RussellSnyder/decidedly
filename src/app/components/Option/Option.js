import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Option.module.css';
import ImportanceSlider, { IMPORTANCE_SLIDER_MAX, IMPORTANCE_SLIDER_MIN } from '../ImportanceSlider/ImportanceSlider';

import {
  loadOptionWeights,
  resetOptionWeights,
  updateOptionWeightValue,
  updateOptionName,
  initializeOption,
  selectOption,
} from './OptionSlice';

import { CustomInput, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export const OPTION_VIEWS = {
  NEW: "NEW",
  EDIT: "EDIT",
  SHOW: "SHOW",
}

function Option({ handleAddOption, userWeights }) {
  const dispatch = useDispatch();
  const option = useSelector(selectOption);

  const [view, setView] = useState(OPTION_VIEWS.SHOW)

  const handleAddOptionSubmit = (e) => {
    e.preventDefault();

    handleAddOption({option})
  }

  return (
    <div className="option">
      <div className={`view-${view}`}>
        <h3>Create an Option</h3>

        <Form className="row"
          onSubmit={(e) => handleAddOptionSubmit(e)}>
          <FormGroup className="col-sm-4">
            <Label for="name">Option Name</Label>
            <Input
              onChange={(e) => updateOptionName(e.target.value)}
              value={option.name}
              type="text"
              name="name"
              id="name"
              placeholder="Option Name" />
          </FormGroup>

          <Button type="submit">
            Add Option to Collection
          </Button>
        </Form>
      </div>
      
      <div className="weights">
        {option.weights && option.weights.map(weight => {
        return <ImportanceSlider
          key={weight.id}
          { ...weight }
          handleValueChange={(payload) => dispatch(updateOptionWeightValue(payload))}
        />})}
      </div>
    </div>
  );
}

export default Option;
