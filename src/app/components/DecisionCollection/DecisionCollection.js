import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './DecisionCollection.module.css';
import ImportanceSlider from '../ImportanceSlider/ImportanceSlider'
import UserWeights from '../UserWeights/UserWeights'
import OptionCollection from '../OptionCollection/OptionCollection'

import {
  updateDecisionCollectionName,
  updateDecisionCollectionUserWeights,
  selectDecisionCollectionName,
} from './DecisionCollectionSlice';

import {
  selectUserWeights,
} from '../UserWeights/UserWeightsSlice';

import { CustomInput, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const VIEWS = {
  USER_WEIGHTS: "USER_WEIGHTS",
  OPTION_WEIGHTS: "OPTION_WEIGHTS",
}

function DecisionCollection() {
  const dispatch = useDispatch();
  const name = useSelector(selectDecisionCollectionName);
  const userWeights = useSelector(selectUserWeights);
  const [view, setView] = useState(VIEWS.USER_WEIGHTS);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="decision-collection">
      <h2>
        DecisionCollection
        <Button
        className="float-right"
          color="success"
          onClick={() => dispatch(updateDecisionCollectionUserWeights(userWeights))}
        >
          Save
        </Button>

      </h2>
      <Input
        onChange={(e) => dispatch(updateDecisionCollectionName(e.target.value))}
        value={name}
        type="text"
        name="name"
        id="name"
        placeholder="name of decision collection" />
      <hr/>
      <div className="row mb-4">
        <div className="col-6">
          <Button outline={view !== VIEWS.USER_WEIGHTS} block onClick={() => setView(VIEWS.USER_WEIGHTS)}>
            User Weights
          </Button>
        </div>
        <div className="col-6">
          <Button outline={view !== VIEWS.OPTION_WEIGHTS} block onClick={() => setView(VIEWS.OPTION_WEIGHTS)}>
            Option Weights
          </Button>
        </div>
      </div>
      {view === VIEWS.USER_WEIGHTS && <UserWeights />}
      {view === VIEWS.OPTION_WEIGHTS && <OptionCollection />}
    </div>
  );
}

export default DecisionCollection;
