import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './UserWeights.module.css';
import ImportanceSlider from '../ImportanceSlider/ImportanceSlider'
import {
  addDecisionCollectionUserWeight,
  updateDecisionCollectionUserWeight,
  deleteDecisionCollectionUserWeight,
  selectUserWeights,
  selectDecisionCollections
} from '../DecisionCollections/DecisionCollectionsSlice'

import { CustomInput, Button, Form, FormGroup, Label, Input } from 'reactstrap';

export const USER_WEIGHT_VALUE_MAX = 10
export const USER_WEIGHT_VALUE_MIN = 0

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
      <div className="weights mb-3">
        {userWeights && Object.entries(userWeights).map(([userWeightId, userWeight]) => {
        return <ImportanceSlider
          key={`userweight-${userWeightId}`}
          id={`userweight-${userWeightId}`}
          min={USER_WEIGHT_VALUE_MIN}
          max={USER_WEIGHT_VALUE_MAX}
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
      <hr/>
      <div className="mt-3">
        <h4>Add New Weight</h4>
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
            <Input
              type="textarea"
              rows="3"
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
              min={USER_WEIGHT_VALUE_MIN}
              max={USER_WEIGHT_VALUE_MAX}
              onChange={(e) => setNewWeightValue(parseInt(e.target.value))}
              name="initialValue"
              id="initialValue"
            />
            <div className="row">
            <div className="col-4 text-left">
              {USER_WEIGHT_VALUE_MIN}
            </div>
            <div className="col-4 text-center">
              {newWeightValue}
            </div>
            <div className="col-4 text-right">
              {USER_WEIGHT_VALUE_MAX}
            </div>
          </div>
          </FormGroup>
          <Button
            outline
            className="col-sm-1"
            color="success"
            type="submit"
          >
            Add
          </Button>
        </Form>
      </div>

    </div>
  );
}

export default UserWeights;
