import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from 'reactstrap';
import { FaUser, FaRegCalendarAlt } from 'react-icons/fa'
import { GiWeight } from 'react-icons/gi'

import { UserWeight } from '../UserWeight/UserWeight';

import {
  updateDecisionTemplate,
  selectDecisionTemplates,
  updateDecisionTemplateUserWeight,
  deleteDecisionTemplate,
  deleteDecisionTemplateUserWeight,
  addDecisionTemplateUserWeight,
} from '../DecisionTemplates/DecisionTemplatesSlice'

import EditableInput from '../EditableInput/EditableInput';

function DecisionTemplate({ match, history }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isAddingNewUserWeight, setIsAddingNewUserWeight] = useState(false);

  const dispatch = useDispatch();
  const { decisionTemplateId } = match.params // coming from React Router.
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
        alt="random placeholder"
      />
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 col-md-4">
            <h3>Description</h3>
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
            <hr/>
            <Button color="danger"
              onClick={() => setModalOpen(true)}
            >
              Delete
            </Button>
            <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
              <ModalHeader>Are You Sure?</ModalHeader>
              <ModalBody>
                This masterpiece will be destroyed forever!
              </ModalBody>
              <ModalFooter className="justify-content-between ">
                <Button 
                  className="pull-left"
                  outline color="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button color="danger" onClick={() => {
                  dispatch(deleteDecisionTemplate({decisionTemplateId}))
                  history.push(`/templates/`)
                }}>
                  Delete
                </Button>
              </ModalFooter>
            </Modal>
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
                    <td>
                      <Button size="sm" color="danger"
                        onClick={() => {
                          dispatch(deleteDecisionTemplateUserWeight({
                            decisionTemplateId,
                            userWeightId,  
                          }))
                        }}>
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
                {!isAddingNewUserWeight && <tr>
                  <td colSpan="4">
                    <Button size="sm" color="success"
                      onClick={() => {
                        setIsAddingNewUserWeight(true)
                      }}>
                      + Add Another
                    </Button>
                  </td>
                </tr>}
              </tbody>
            </Table>
            {isAddingNewUserWeight && <UserWeight type="add" handleSubmit={(values) => {
              dispatch(addDecisionTemplateUserWeight({
                decisionTemplateId,
                ...values,
              }))
              setIsAddingNewUserWeight(false)
            }} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DecisionTemplate;
