import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap';
import { FaUser, FaRegCalendarAlt, FaInfoCircle } from 'react-icons/fa'
import { GiWeight } from 'react-icons/gi'
import './DecisionTemplate.module.css';

import {
  updateDecisionTemplate,
  selectDecisionTemplates,
  updateDecisionTemplateUserWeight,
} from '../DecisionTemplates/DecisionTemplatesSlice'

import EditableInput from '../EditableInput/EditableInput';

function DecisionTemplate(props) {
  const dispatch = useDispatch();
  const { decisionTemplateId } = props.match.params // coming from React Router.
  const decisionTemplates = useSelector(selectDecisionTemplates);
  const decisionTemplate = decisionTemplates[decisionTemplateId]
  const {name, description, author, date, userWeights } = decisionTemplate

  return (
    <div className="decision-template">
      <div className="container mb-4">
        <div className="row">
          <div className="text-center text-md-left col-md-6 mb-4 mb-md-0">
            <h2>
              <EditableInput
                value={name}
                onChangeHandler={({value}) => dispatch(updateDecisionTemplate({
                  name: value,
                  decisionTemplateId
                }))}
                placeholder="Template Name"/>
            </h2>
          </div>
          <div className="text-center col-md-6 text-md-right">
            <h4>
              <FaUser />
              <EditableInput
                value={author}
                onChangeHandler={({value}) => dispatch(updateDecisionTemplate({
                  author: value,
                  decisionTemplateId
                }))}
              />
            </h4>
            <h6>
              <FaRegCalendarAlt />
              <EditableInput
                value={date}
                onChangeHandler={({value}) => dispatch(updateDecisionTemplate({
                  date: value,
                  decisionTemplateId
                }))}
              />
            </h6>
          </div>
        </div>
      </div>
      <img 
        className="mb-4"
        src={`https://picsum.photos/2000/250?random=${date}`}
        alt="random image"
      />
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 col-md-4">
            <h3>About</h3>
            <hr/>
            <p>
              <EditableInput
                value={description}
                onChangeHandler={({value}) => dispatch(updateDecisionTemplate({
                  description: value,
                  decisionTemplateId
                }))}
              />
            </p>
          </div>
          <div className="col-12 col-md-8">
            <h3>Weights <GiWeight /></h3>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="text-center">Value</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(userWeights).map(([userWeightId, {name, description, value}]) => (
                  <tr key={`weight-${userWeightId}`}>
                    <td style={{whiteSpace: 'nowrap'}}>
                      <EditableInput
                        value={name}
                        onChangeHandler={({value}) => dispatch(updateDecisionTemplateUserWeight({
                          name: value,
                          decisionTemplateId,
                          userWeightId,
                        }))}
                      />
                    </td>
                    <td className="text-center">
                      <EditableInput
                        value={value}
                        onChangeHandler={({value}) => dispatch(updateDecisionTemplateUserWeight({
                          value,
                          decisionTemplateId,
                          userWeightId,
                        }))}
                      />
                    </td>
                    <td>
                      <EditableInput
                        value={description}
                        onChangeHandler={({value}) => dispatch(updateDecisionTemplateUserWeight({
                          description: value,
                          decisionTemplateId,
                          userWeightId,
                        }))}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DecisionTemplate;
