import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './UserWeights.module.css';
import ImportanceSlider, { IMPORTANCE_SLIDER_MAX, IMPORTANCE_SLIDER_MIN } from '../ImportanceSlider/ImportanceSlider'
import {
  addDecisionCollectionUserWeight,
  updateDecisionCollectionUserWeight,
  deleteDecisionCollectionUserWeight,
  selectUserWeights,
  selectDecisionCollections
} from '../DecisionCollections/DecisionCollectionsSlice'

import { CustomInput, Button, Form, FormGroup, Label, Input } from 'reactstrap';

function UserWeights(props) {
  const dispatch = useDispatch();

  const { decisionCollectionId } = props.match.params

  const decisionCollections = useSelector(selectDecisionCollections);
  const userWeights = selectUserWeights(decisionCollections, decisionCollectionId)

  const [newWeightValue, setNewWeightValue] = useState(0);
  const [newWeightName, setNewWeightName] = useState('');
  const [errors, setErrors] = useState([]);

  const handleNewWeightSubmit = () => {
    if (!newWeightName || newWeightName.trim().length < 1) {
      setErrors([...errors, "please enter a name"])
    } else {
      dispatch(addDecisionCollectionUserWeight({
        decisionCollectionId,
        name: newWeightName,
        value: newWeightValue
      }))

      setNewWeightName("")
      setNewWeightValue(0)
      setErrors([])
    }
  }
  return (
    <div className="user-weights">
      <div className="row mb-4">
        <div className="col-12">
          <h2>
            User Weights
          </h2>
        </div>
      </div> 

      <div className="mb-5">
        {errors.map(error => <p className="text-danger">
          {error}
        </p>)}
        <Form
          className="row"
          onSubmit={(e) => {
          e.preventDefault();
          handleNewWeightSubmit()
        }}>
          <FormGroup className="col-sm-4">
            <Label for="name">Weight Name</Label>
            <Input
              type="textarea"
              rows="2"
              onChange={(e) => setNewWeightName(e.target.value)}
              value={newWeightName}
              placeholder="name of weight"
            />
          </FormGroup>
          <FormGroup className="col-sm-7">
            <Label for="initialValue">Value</Label>
            <CustomInput
              type="range"
              // value={value}
              value={newWeightValue}
              min={IMPORTANCE_SLIDER_MIN}
              max={IMPORTANCE_SLIDER_MAX}
              onChange={(e) => setNewWeightValue(parseInt(e.target.value))}
              name="initialValue"
              id="initialValue"
            />
            <div className="row">
            <div className="col-4 text-left">
              {IMPORTANCE_SLIDER_MIN}
            </div>
            <div className="col-4 text-center">
              {newWeightValue}
            </div>
            <div className="col-4 text-right">
              {IMPORTANCE_SLIDER_MAX}
            </div>
          </div>
          </FormGroup>
          <Button
            className="col-sm-1"
            color="success"
            type="submit"
          >
            +
          </Button>
        </Form>
      </div>
      <div className="weights">
        {userWeights && Object.entries(userWeights).map(([userWeightId, userWeight]) => {
        return <ImportanceSlider
          key={`userweight-${userWeightId}`}
          id={`userweight-${userWeightId}`}
          { ...userWeight }
          handleNameChange={(name) => 
            dispatch(updateDecisionCollectionUserWeight({
              decisionCollectionId,
              userWeightId,
              name
            }))
          }
          handleValueChange={(value) => 
            dispatch(updateDecisionCollectionUserWeight({
              decisionCollectionId,
              userWeightId,
              value
            }))
          }
          handleDelete={() => 
            dispatch(deleteDecisionCollectionUserWeight({
              decisionCollectionId,
              userWeightId}))
          }
        />})}
      </div>
    </div>
  );
}

export default UserWeights;
