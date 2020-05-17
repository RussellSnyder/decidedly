import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './OptionCollection.module.css';
import ImportanceSlider, { IMPORTANCE_SLIDER_MAX, IMPORTANCE_SLIDER_MIN } from '../ImportanceSlider/ImportanceSlider'
import store from '../../store'  
import { getIndexFromId } from '../../utils/'

import {
  createDecisionCollectionOption,
  updateDecisionCollectionOption,
  deleteDecisionCollectionOption,
  selectDecisionCollections,
  selectOptionCollection,
  selectUserWeights,
} from '../DecisionCollections/DecisionCollectionsSlice'

import {
  Button,
  Table
} from 'reactstrap';

import Option from '../Option/Option';
import styles from './OptionCollection.module.css';

function OptionCollection(props) {
  const dispatch = useDispatch();
  const { history } = props;

  const { decisionCollectionId } = props.match.params

  const decisionCollections = useSelector(selectDecisionCollections);
  const optionCollection = selectOptionCollection(decisionCollections, decisionCollectionId)
  const userWeights = selectUserWeights(decisionCollections, decisionCollectionId)

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
          {Object.entries(optionCollection).map(([optionId, option]) => {
            const totalScore = Object.entries(option.weights).reduce((total, [weightId, currentWeight]) => {
              const userWeightValue = userWeights[weightId].value
              // TODO weight this by userWeights
              return total + (currentWeight.value * userWeightValue)
            }, 0)

            return (
              <tr
                className={styles['option-table-row']}
                key={`option-${optionId}`}
                onClick={() => {
                  history.push(`/collections/${decisionCollectionId}/options/${optionId}`)
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
                  decisionCollectionId
                }))
                  // history.push(`/collections/${decisionCollectionId}/options/`)    
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
