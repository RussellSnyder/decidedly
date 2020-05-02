import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import store from '../../store'  

import './DecisionCollections.module.css';

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

  store.subscribe(() => {
    const previous = decisionCollections;
    const current = store.getState().decisionCollections
    if (!previous || !current) { return }

    if (current.length > previous.length) {
      // something was added if this is true
      const newCollectionId = current.slice(-1)[0].id
      history.push(`/collections/${newCollectionId}`)    
    }
  })

  return (
    <div className="decision-collections" data-testid="decision-collections">
      <div className="container">
        <h2>Decision Collections</h2>
        <Button
          data-testid="create"
          onClick={() => {
            dispatch(createDecisionCollection())
          }}
        >
          create decision collection 
        </Button>
      </div>
      <div className="container">
        {decisionCollections.map(dc => {
          return <div
            key={dc.id}
            className="row"
            onClick={() => history.push(`/collections/${dc.id}`)}
          >
            <div className="col-md-6">
              <h4>{dc.name}</h4>
              <ul className="list-unstyled">
                <li>{dc.userWeights.length} Factors</li>
                <li>{dc.optionCollection.length} Options</li>
              </ul>
            </div>
            <div className="col-md-6">
              {dc.userWeights.map(weight => weight.name).join(", ")}
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
