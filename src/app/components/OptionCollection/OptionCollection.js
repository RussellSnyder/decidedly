import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './OptionCollection.module.css';
import ImportanceSlider, { IMPORTANCE_SLIDER_MAX, IMPORTANCE_SLIDER_MIN } from '../ImportanceSlider/ImportanceSlider'
import store from '../../store'  
import { getIndexFromId } from '../../utils/'

import {
  updateDecisionCollectionUserWeight,
  deleteDecisionCollectionUserWeight,
  updateDecisionCollectionOption,
  deleteDecisionCollectionOption,
  updateDecisionCollectionName,
  deleteDecisionCollection,
  selectDecisionCollections,
  createDecisionCollectionOption,
} from '../DecisionCollections/DecisionCollectionsSlice'

import {
  Button,
  Table
} from 'reactstrap';

import Option from '../Option/Option';

function OptionCollection(props) {
  const dispatch = useDispatch();
  const { history } = props;
  const { collectionId } = props.match.params // coming from React Router.
  const decisionCollections = useSelector(selectDecisionCollections);
  const decisionCollection = decisionCollections[getIndexFromId(decisionCollections, collectionId)]
  const { name, userWeights, optionCollection, id } = decisionCollection

  const OptionsTable = () => {
    return (
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {optionCollection.map(option => {
            const totalScore = option.weights.reduce((total, currentWeight) => {
              // TODO weight this by userWeights
              return total + currentWeight.value
            }, 0)

            return (
              <tr
                key={`option-${option.id}`}
                onClick={() => {
                  history.push(`/collections/${collectionId}/options/${option.id}`)
                }}>
                <th scope="row">{option.name}</th>
                <th>{totalScore}</th>
              </tr>
            )
          })}          
        </tbody>
      </Table>
    )
  }

  return (
    <>
      <div className="option-collection container">
        <div className="row">
          <div className="col-sm-4">
            <h4>Options</h4>
            <Button
              color="info"
              outline
              onClick={() => {
                dispatch(createDecisionCollectionOption({
                  id: collectionId
                }))
                history.push(`/collections/${collectionId}/options`)    
              }}>
                Create Option
            </Button>
          </div>
          <div className="col-sm-8">
            <OptionsTable />
          </div> 
        </div>
      </div>
    </>
  );
}

export default OptionCollection;
