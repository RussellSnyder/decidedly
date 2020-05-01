import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './OptionCollection.module.css';
import ImportanceSlider, { IMPORTANCE_SLIDER_MAX, IMPORTANCE_SLIDER_MIN } from '../ImportanceSlider/ImportanceSlider'

import {
  CustomInput,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

import Option, { OPTION_VIEWS } from '../Option/Option';

import {
  selectUserWeights
} from '../UserWeights/UserWeightsSlice'

import {
  loadOptionWeights,
  resetOptionWeights,
  updateOptionWeightValue,
  updateOptionName,
  initializeOption,
  selectOption,
} from '../Option/OptionSlice';

import {
  selectOptionCollection,
  selectOptionInOptionCollection,
} from '../OptionCollection/OptionCollectionSlice';


const VIEWS = {
  OVERVIEW: "OVERVIEW",
  OPTION: "OPTION",
  ADD_OPTION: "ADD_OPTION",
}

function OptionCollection() {
  const dispatch = useDispatch();
  const optionCollection = useSelector(selectOptionCollection);
  const option = useSelector(selectOptionInOptionCollection);
  const userWeights = useSelector(selectUserWeights);

  const [view, setView] = useState(VIEWS.OVERVIEW)

  // const saveOption = () => {
  //   dispatch()
  // }

  const handleAddOption = () => {
    dispatch(initializeOption(userWeights))
    setView(VIEWS.ADD_OPTION)
  }

  return (
    <div className="option-collection">
      <h2>Option Collection</h2>
      {optionCollection.map(option => <Button>{option.name}</Button>)}

      <Button onClick={() => handleAddOption()}>Add Option</Button>

      <div className="view">        
        <Option />
      </div>
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

export default OptionCollection;
