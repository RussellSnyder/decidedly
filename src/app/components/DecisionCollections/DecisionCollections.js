import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../store'  

import style from './DecisionCollections.module.css';
import {
  createDecisionCollection,
  selectDecisionCollections
} from './DecisionCollectionsSlice';

import {
  CustomInput,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

function DecisionCollections({ history }) {
  const dispatch = useDispatch();
  const decisionCollections = useSelector(selectDecisionCollections);
  return (
    <div className="decision-collections" data-testid="decision-collections">
      <div className="container mb-5">
        <h2 className="mb-3">Decision Collections</h2>
        <Button
          data-testid="create"
          onClick={() => {
            dispatch(createDecisionCollection())
          }}
        >
          create decision collection 
        </Button>
      </div>
      <hr/>
      <div className="container">
        {Object.entries(decisionCollections).map(([id, dc]) => {
          const factors = Object.values(dc.userWeights)
          const options = Object.values(dc.optionCollection)

          return <div
            key={id}
            className={`row mb-3 ${style['dc-preview']}`}
            onClick={() => history.push(`/collections/${id}`)}
          >
            <div className="col-md-6">
              <h4>{dc.name}</h4>
              <ul className="list-unstyled">
                <li>{factors.length} Factors</li>
                <li>{options.length} Options</li>
              </ul>
            </div>
            <div className="col-md-6">
              {factors.map((weight) => weight.name).join(", ")}
            </div>
          </div>
        })}
      </div>
      <ul>
        
      </ul>
    </div>
  );
}

export default DecisionCollections;
