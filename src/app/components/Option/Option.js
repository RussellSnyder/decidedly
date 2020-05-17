import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Option.module.css';
import ImportanceSlider, { IMPORTANCE_SLIDER_MAX, IMPORTANCE_SLIDER_MIN } from '../ImportanceSlider/ImportanceSlider';
import { getIndexFromId } from '../../utils/'
import { CustomInput, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import {
  createDecisionCollectionOption,
  updateDecisionCollectionOption,
  deleteDecisionCollectionOption,
  updateDecisionCollectionOptionWeight,
  selectDecisionCollections,
  selectUserWeights,
  selectOption,
  selectOptionWeights,
  selectOptionWeight,
} from '../DecisionCollections/DecisionCollectionsSlice';

import EditableInput from '../EditableInput/EditableInput'

export const OPTION_VIEWS = {
  NEW: "NEW",
  EDIT: "EDIT",
  SHOW: "SHOW",
}

function Option(props) {
  const dispatch = useDispatch();

  const { decisionCollectionId, optionId } = props.match.params // coming from React Router.
  const { history } = props

  const decisionCollections = useSelector(selectDecisionCollections);

  const option = selectOption(decisionCollections, decisionCollectionId, optionId)
  const userWeights = selectUserWeights(decisionCollections, decisionCollectionId)
  const optionWeights = selectOptionWeights(decisionCollections, decisionCollectionId, optionId);

  return (
    <div className="option container">
      <div className="row mb-4">
        <div className="col-sm-8">
          <h2>
            <EditableInput
              value={option.name}
              onChangeHandler={({value}) => {
                dispatch(updateDecisionCollectionOption({
                  decisionCollectionId,
                  optionId,
                  name: value
                }))
              }}
              placeholder={"option name"}
            />
          </h2>
        </div>
        <div className="col-sm-4 text-right">
          <Button
            color="danger"
            className="pull-right"
            onClick={() => {
              dispatch(deleteDecisionCollectionOption({
                decisionCollectionId,
                optionId
              }))
              history.push(`/collections/${decisionCollectionId}/options`)
            }}
          >
            Delete 
          </Button>
        </div>
      </div>
      
      <div className="weights">
        {Object.entries(optionWeights).map(([optionWeightId, optionWeight]) => {
          return <ImportanceSlider
            id={optionWeightId}
            key={`option-${optionWeightId}`}
            value={optionWeight.value}
            name={userWeights[optionWeightId].name}
            handleValueChange={(value) => {
              dispatch(updateDecisionCollectionOptionWeight({
                decisionCollectionId,
                optionId,
                optionWeightId,
                value,
              }))
            }}
          />
        })}
      </div>
    </div>
  );
}

export default Option;
