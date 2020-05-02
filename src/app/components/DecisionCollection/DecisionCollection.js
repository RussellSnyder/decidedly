import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import './DecisionCollection.module.css';
import ImportanceSlider from '../ImportanceSlider/ImportanceSlider'
import UserWeights from '../UserWeights/UserWeights'
import OptionCollection from '../OptionCollection/OptionCollection'

import {
  updateDecisionCollectionUserWeight,
  deleteDecisionCollectionUserWeight,
  updateDecisionCollectionOption,
  deleteDecisionCollectionOption,
  updateDecisionCollectionName,
  deleteDecisionCollection,
  selectDecisionCollections,
  createDecisionCollectionOption,
  getIndexFromId
} from '../DecisionCollections/DecisionCollectionsSlice'

import { CustomInput, Button, Form, FormGroup, Label, Input } from 'reactstrap';

function DecisionCollection(props) {
  const dispatch = useDispatch();
  const { history } = props;
  const { collectionId } = props.match.params // coming from React Router.
  const decisionCollections = useSelector(selectDecisionCollections);
  const decisionCollection = decisionCollections[getIndexFromId(decisionCollections, collectionId)]
  const { name, userWeights, optionCollection, id } = decisionCollection

  return (
    <div className="decision-collection">
      <h2>{name}</h2>
      <Input
        onChange={(e) => {
          dispatch(updateDecisionCollectionName({
            name: e.target.value,
            id
          }))
        }}
        value={name}
        type="text"
        name="name"
        placeholder="name of decision collection" />
      <hr/>
      <div className="row mb-4">
        <div className="col-6">
          <Link className="btn btn-info btn-block"
            to={`/collections/${collectionId}/weights`}>
            Weights
          </Link>
        </div>
        {userWeights.length > 0 && <div className="col-6">
          <Link
            className="btn btn-info btn-block"
            to={`/collections/${collectionId}/options`}
          >
            Options
          </Link>
        </div>}
      </div>
      {/* <UserWeights
        userWeights={userWeights}     
        handleSave={(payload) => dispatch(updateDecisionCollectionUserWeight({
          userWeight: payload,
          id
        }))}
        handleDelete={({userWeight}) => {
          dispatch(deleteDecisionCollectionUserWeight({
            id,
            userWeight
          }))
        }}
      /> */}
      {/* <OptionCollection
        collectionId={id}
        createOption={() => dispatch(createDecisionCollectionOption({
          id
        }))}
        optionCollection={optionCollection}
        userWeights={userWeights}
        handleSave={(option) => dispatch(updateDecisionCollectionOption({
          option,
          id
        }))}
        handleDelete={({option}) => dispatch(deleteDecisionCollectionOption({
          option,
          id
        }))}
      /> */}
  </div>
  );
}

export default DecisionCollection;
