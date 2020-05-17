import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import style from './DecisionCollections.module.css';
import {
  createDecisionCollection,
  selectDecisionCollections,
  cloneDecisionCollection,
  deleteDecisionCollection,
} from './DecisionCollectionsSlice';

import {
  Button,
} from 'reactstrap';

function DecisionCollections({ history }) {
  const dispatch = useDispatch();
  const decisionCollections = useSelector(selectDecisionCollections);

  return (
    <div className="decision-collections" data-testid="decision-collections">
      <div className="container mb-5">
        <h2 className="mb-3">Decision Collections</h2>
        <Button
          color="success"
          data-testid="create"
          onClick={() => {
            dispatch(createDecisionCollection())
          }}
        >
          Create Decision Collection 
        </Button>
      </div>
      <hr/>
      <div className="container">
        {Object.keys(decisionCollections).length < 1 && <div className="row text-center">
          <div class="col-12">
            <h2>Want to decide something?</h2>
            <h4>Create a decision collection!</h4>  
            <Button
              color="success"
              data-testid="create"
              onClick={() => {
                dispatch(createDecisionCollection())
              }}
            >
              Let's Do This!
            </Button>
          </div>
        </div>}
        {Object.entries(decisionCollections).map(([id, dc]) => {
          const factors = Object.values(dc.userWeights)
          const options = Object.values(dc.optionCollection)

          return <div
            key={id}
            className={`row mb-5 ${style['dc-preview']}`}
          >
            <div className="col-md-8">
              <h4>{dc.name}</h4>
              <div className="row">
                <div className="col-4">
                  <ul className="list-unstyled">
                    <li>{factors.length} Factors</li>
                    <li>{options.length} Options</li>
                  </ul>
                </div>
                <div className="col-6 text-center">
                  <Button
                    block
                    size="sm"
                    outline
                    color="warning"
                    data-testid="edit"
                    onClick={() => history.push(`/collections/${id}/weights`)}
                  >
                    Edit 
                  </Button>                                    
                  {/* <Button
                    block
                    size="sm"
                    outline
                    data-testid="view-results"
                    disabled
                  >
                    View Results 
                  </Button>                                     */}
                </div>
              </div>
            </div>
            {/* <div className="col-md-4">
              <ul class="list-unstyled">
                {factors.slice(0, 4).map((weight) => <li>{weight.name}</li>)}
              </ul>
            </div> */}
            <div className="col-md-4">
              <Button
                block
                color="info"
                outline
                data-testid="clone"
                onClick={() => {
                  dispatch(cloneDecisionCollection({
                    decisionCollectionId: id,
                  }))
                }}
              >
                clone 
              </Button>
              <Button
                block
                color="danger"
                data-testid="delete"
                onClick={() => {
                  dispatch(deleteDecisionCollection({
                    decisionCollectionId: id,
                  }))
                }}
              >
                delete 
              </Button>
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
