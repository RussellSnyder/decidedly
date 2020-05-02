import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Option.module.css';
import ImportanceSlider, { IMPORTANCE_SLIDER_MAX, IMPORTANCE_SLIDER_MIN } from '../ImportanceSlider/ImportanceSlider';
import { getIndexFromId } from '../../utils/'
import { CustomInput, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import {
  updateDecisionCollectionOptionWeight,
  updateDecisionCollectionOptionName,
  deleteDecisionCollectionOption,
  selectDecisionCollections,
} from '../DecisionCollections/DecisionCollectionsSlice';

export const OPTION_VIEWS = {
  NEW: "NEW",
  EDIT: "EDIT",
  SHOW: "SHOW",
}

function Option(props) {
  const { collectionId, optionId } = props.match.params // coming from React Router.
  const { history } = props

  console.log('history', collectionId, optionId)
  const decisionCollections = useSelector(selectDecisionCollections);
  const decisionCollection = decisionCollections[getIndexFromId(decisionCollections, collectionId)]
  const { optionCollection, userWeights } = decisionCollection
  const option = optionCollection[getIndexFromId(optionCollection, optionId)]
  console.log('option', option)

  const weights = option.weights

  const dispatch = useDispatch();

  const [name, setName] = useState(option.name)
  const [isEditingName, setIsEditingName] = useState(false)

  const DisplayName = () => {
    const notEditing = (
      <div className="editable" onClick={() => setIsEditingName(true)}>
        <h2>
          {name}
        </h2>
      </div>
    )

    const editing = (
      <div className="editable">
        <Input
          key={`option-name-${option.id}`}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              setIsEditingName(false)
              setName(e.target.value)  
            }
          }}
          onBlur={(e) => {
            setIsEditingName(false)
            setName(e.target.value)
          }}
          defaultValue={name}
        />
      </div>
    )

    return isEditingName ? editing : notEditing
  }

  return (
    <div className="option container">
      <div className="row mb-4">
        <div className="col-sm-8">
          <DisplayName />
        </div>
        <div className="col-sm-4 text-right">
          <Button
            color="danger"
            className="pull-right"
            onClick={() => dispatch(deleteDecisionCollectionOption({
              id: collectionId,
              option
            }))}
          >
            Delete 
          </Button>
        </div>
      </div>
      
      <div className="weights">
        {weights.map((weight, i) => {
          console.log(weight)
          const { name, id } = userWeights[i]
          let props = {
            value: weight.value,
            name,
            id
          }
          return <ImportanceSlider
            key={`option-${weight.id}`}
            { ...props }
            handleValueChange={(value) => {
              console.log({value})
              dispatch(updateDecisionCollectionOptionWeight({
                id: collectionId,
                optionId,
                weightId: weight.id,
                value
              }))
              history.push(`/collections/${collectionId}/options/${option.id}`)
            }}
          />
        })}
      </div>
    </div>
  );
}

export default Option;
