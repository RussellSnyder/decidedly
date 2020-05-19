import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNextId } from '../../utils/getNextId';

import style from './DecisionTemplates.module.scss';

import {
  createDecisionTemplate,
  selectDecisionTemplates,
} from './DecisionTemplatesSlice';

import {
  createDecisionCollectionFromDecisionTemplate,
  selectDecisionCollections,
} from '../DecisionCollections/DecisionCollectionsSlice';

import {
  Card, CardImg, CardText, CardBody, CardFooter, CardColumns,
  CardTitle, CardSubtitle, Button, Container
} from 'reactstrap';
import { Link } from 'react-router-dom';

const TemplatePreview = ({name, description, author, date, id, handleUseClick}) => (
  <Card
    // className="col-12 col-sm-6 col-md-4 mb-5"
    key={`template-preview-${id}`}
  >
    <CardImg top width="100%" src={`https://picsum.photos/200/100?random=${id}`} alt="Card image cap" />
    <CardBody>
      <CardTitle>{name}</CardTitle>
      <CardSubtitle>{author} - {date}</CardSubtitle>
      <CardText>{description}</CardText>
    </CardBody>
    <CardFooter>
      <Button color="primary" outline className="mb-3 mb-sm-0 col-12 col-sm-5"
        onClick={() => handleUseClick()}
      >
        Use
      </Button>
      <Link to={`/templates/${id}`} className="btn btn-outline-info col-12 col-sm-5 offset-sm-2">More</Link>
    </CardFooter>
  </Card>
);

function DecisionTemplates({ history }) {
  const dispatch = useDispatch();
  const decisionTemplates = useSelector(selectDecisionTemplates);
  const decisionCollections = useSelector(selectDecisionCollections);

  return (
    <div className="decision-templates">
      <div className="container mb-5">
        <h2 className="mb-3">Decision Templates</h2>
        <Button
          color="success"
          data-testid="create"
          onClick={() => {
            const newId = getNextId(decisionTemplates);
            dispatch(createDecisionTemplate())
            history.push(`/templates/${newId}/`)
          }}
        >
          Create Decision Collection 
        </Button>
      </div>
      <hr/>
      <Container>
        <CardColumns className={style.cardColumns}>
          {Object.entries(decisionTemplates).map(([id, decisionTemplate]) => (
            <TemplatePreview
              key={id}
              id={id}
              { ...decisionTemplate }
              handleUseClick={() => {
                const newId = getNextId(decisionCollections);
                console.log(decisionTemplate)
                dispatch(createDecisionCollectionFromDecisionTemplate({
                  decisionTemplate
                }))
                history.push(`/collections/${newId}/weights`)
              }}
            />
          ))}
        </CardColumns>
      </Container>
    </div>
  );
}

export default DecisionTemplates;
