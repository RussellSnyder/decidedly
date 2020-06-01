import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './UserWeights.module.css';
import {
  addDecisionCollectionUserWeight,
  updateDecisionCollectionUserWeight,
  deleteDecisionCollectionUserWeight,
  selectUserWeights,
  selectDecisionCollections
} from '../DecisionCollections/DecisionCollectionsSlice'

import { UserWeight } from '../UserWeight/UserWeight';

export const USER_WEIGHT_VALUE_MAX = 10
export const USER_WEIGHT_VALUE_MIN = 0

function UserWeights(props) {
  const dispatch = useDispatch();

  const { decisionCollectionId } = props.match.params

  const decisionCollections = useSelector(selectDecisionCollections);
  const userWeights = selectUserWeights(decisionCollections, decisionCollectionId)

  return (
    <div className="user-weights container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <h2>
            User Weights
          </h2>
        </div>
      </div> 
      <div className="weights mb-3">
        {userWeights && Object.entries(userWeights).map(([userWeightId, userWeight]) => (
          <UserWeight 
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
            handleValueChange={(value) => {
              dispatch(updateDecisionCollectionUserWeight({
                decisionCollectionId,
                userWeightId,
                value
              }))
            }}
            handleDelete={() => 
              dispatch(deleteDecisionCollectionUserWeight({
                decisionCollectionId,
                userWeightId}))
            }
          />
        ))}
      </div>
      <hr/>
      <div className="mt-3">
        <h4>Add New Weight</h4>
        <UserWeight
          type="add"
          handleSubmit={(values) => {
            dispatch(addDecisionCollectionUserWeight({
              decisionCollectionId,
              ...values
            }))
          }}
        />
      </div>

    </div>
  );
}

export default UserWeights;
