import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Option.module.css';
import ImportanceSlider from '../ImportanceSlider/ImportanceSlider';
import { Button } from 'reactstrap';

import {
  updateDecisionCollectionOption,
  deleteDecisionCollectionOption,
  updateDecisionCollectionOptionWeight,
  selectDecisionCollections,
  selectUserWeights,
  selectOption,
  selectOptionWeights,
} from '../DecisionCollections/DecisionCollectionsSlice';

import EditableInput from '../EditableInput/EditableInput'

export const OPTION_VALUE_MAX = 10
export const OPTION_VALUE_MIN = -10

function Option(props) {
  const dispatch = useDispatch();

  const { decisionCollectionId, optionId } = props.match.params // coming from React Router.
  const { history } = props

  const decisionCollections = useSelector(selectDecisionCollections);

  const option = selectOption(decisionCollections, decisionCollectionId, optionId)
  const userWeights = selectUserWeights(decisionCollections, decisionCollectionId)
  const optionWeights = selectOptionWeights(decisionCollections, decisionCollectionId, optionId);

  return (
    <div className="option container-fluid">
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
        {Object.entries(optionWeights).map(([optionWeightId, {value}]) => {
          const { name, description } = userWeights[optionWeightId]
          return (
            <div className="row weight mb-5">
              <div className="col-md-3">
                <h5>{name}</h5>
                <p>{description}</p>
              </div>
              <div className="col-md-9">
                <ImportanceSlider
                  id={optionWeightId}
                  key={`option-${optionWeightId}`}
                  value={value}
                  min={OPTION_VALUE_MIN}
                  max={OPTION_VALUE_MAX}
                  handleValueChange={(value) => {
                    dispatch(updateDecisionCollectionOptionWeight({
                      decisionCollectionId,
                      optionId,
                      optionWeightId,
                      value,
                    }))
                  }}
                />                
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Option;
