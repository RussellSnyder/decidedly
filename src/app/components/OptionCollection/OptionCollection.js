import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './OptionCollection.module.css';

import {
  createDecisionCollectionOption,
  selectDecisionCollections,
  selectOptionCollection,
  selectUserWeights,
} from '../DecisionCollections/DecisionCollectionsSlice'

import {
  Button,
  Table
} from 'reactstrap';

import styles from './OptionCollection.module.css';

import { OPTION_VALUE_MAX } from '../Option/Option';

function OptionCollection(props) {
  const dispatch = useDispatch();
  const { history } = props;

  const { decisionCollectionId } = props.match.params

  const decisionCollections = useSelector(selectDecisionCollections);
  const optionCollection = selectOptionCollection(decisionCollections, decisionCollectionId)
  const userWeights = selectUserWeights(decisionCollections, decisionCollectionId)
  const highestPossiblePoints = Object.values(userWeights).reduce((total, current) => {
    return total += current.value
  }, 0) * OPTION_VALUE_MAX;

  console.log(highestPossiblePoints);

  const OptionsTable = () => {
    return (
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(optionCollection).map(([optionId, option]) => {
            const totalPoints = Object.entries(option.weights).reduce((total, [weightId, currentWeight]) => {
              const userWeightValue = userWeights[weightId].value
              return total + (currentWeight.value * userWeightValue)
            }, 0)

            const percentScore = (totalPoints / highestPossiblePoints * 100).toFixed(1)

            return (
              <tr
                className={styles['option-table-row']}
                key={`option-${optionId}`}
                onClick={() => {
                  history.push(`/collections/${decisionCollectionId}/options/${optionId}`)
                }}>
                <th scope="row">{option.name}</th>
                <th>{percentScore}%</th>
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
