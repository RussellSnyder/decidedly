import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import './DecisionCollection.module.css';
import ImportanceSlider from '../ImportanceSlider/ImportanceSlider'
import UserWeights from '../UserWeights/UserWeights'
import OptionCollection from '../OptionCollection/OptionCollection'

import {
  createDecisionCollection,
  deleteDecisionCollection,
  updateDecisionCollectionName,

  addDecisionCollectionUserWeight,
  updateDecisionCollectionUserWeight,
  deleteDecisionCollectionUserWeight,

  createDecisionCollectionOption,
  updateDecisionCollectionOption,
  deleteDecisionCollectionOption,

  updateDecisionCollectionOptionWeight,

  selectDecisionCollections,
} from '../DecisionCollections/DecisionCollectionsSlice'

import { CustomInput, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import EditableInput from '../EditableInput/EditableInput';

function DecisionCollection(props) {
  const dispatch = useDispatch();
  const { decisionCollectionId } = props.match.params // coming from React Router.
  const decisionCollections = useSelector(selectDecisionCollections);
  const decisionCollection = decisionCollections[decisionCollectionId]
  const { name, userWeights, optionCollection } = decisionCollection

  return (
    <div className="decision-collection">
      <h2>
        <EditableInput
          value={name}
          onChangeHandler={({value}) => dispatch(updateDecisionCollectionName({
            name: value,
            id: decisionCollectionId
          }))}
          placeholder="Collection Name"/>
      </h2>
      <hr/>
      <div className="row mb-4">
        <div className="col-6">
          <Link className="btn btn-info btn-block"
            to={`/collections/${decisionCollectionId}/weights`}>
            Weights
          </Link>
        </div>
        {Object.keys(userWeights).length > 0 && <div className="col-6">
          <Link
            className="btn btn-info btn-block"
            to={`/collections/${decisionCollectionId}/options`}
          >
            Options
          </Link>
        </div>}
      </div>
  </div>
  );
}

export default DecisionCollection;
