import React, { useState } from 'react';
import { Button, Form, FormGroup, Label } from 'reactstrap';
import { USER_WEIGHT_VALUE_MAX, USER_WEIGHT_VALUE_MIN } from '../UserWeights/UserWeights';
import ImportanceSlider from '../ImportanceSlider/ImportanceSlider'
import EditableInput from '../EditableInput/EditableInput'

export const TYPE = {
  ADD: 'add',
  DEFAULT: 'default'
}

export const UserWeight = ({
  type = TYPE.DEFAULT,
  id,
  handleSubmit,
  name,
  handleNameChange,
  description,
  handleDescriptionChange,
  value,
  handleValueChange,
  handleDelete,
}) => {
  const [internalName, setInternalName] = useState('');
  const [internalDescription, setInternalDescription] = useState('');
  const [internalValue, setInternalValue] = useState(5);
  const [internalErrors, setInternalErrors] = useState([]);

  const checkValues = () => {
    if (internalName.trim().length < 1) {
      setInternalErrors([...internalErrors, "please enter a name"])
    } else {
      handleSubmit({
        name: internalName,
        value: internalValue,
        description: internalDescription,
      })
  
      setInternalName("")
      setInternalDescription("")
      setInternalValue(0)
      setInternalErrors([])
    }
  }

  const isTypeAdd = type === TYPE.ADD;

  return (
    <>
      {internalErrors.map(error => <p className="text-danger">
        {error}
      </p>)}
      <Form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          if (isTypeAdd) checkValues()
        }}
      >
        <FormGroup className="col-md-4">
          <EditableInput
            onChangeHandler={({value}) => {
              isTypeAdd
                ? setInternalName(value)
                : handleNameChange(value)
            }}
            value={isTypeAdd ? internalName : name}
            placeholder="name"
            alwaysEditing={isTypeAdd}
          />
          {!isTypeAdd && <Button
            className="d-md-none float-right"
            size="sm"
            outline
            color="danger"
            onClick={() => handleDelete()}
          >
            X
          </Button>}

          <hr />
          <EditableInput
            type="textarea"
            rows="3"
            onChangeHandler={({value}) => {
              isTypeAdd
                ? setInternalDescription(value)
                : handleDescriptionChange(value)
            }}
            value={isTypeAdd ? internalDescription : description}
            placeholder="optional description"
            alwaysEditing={isTypeAdd}
          />

        </FormGroup>
        <FormGroup className={`col-md-7`}>
          <Label for="initialValue">Value</Label>
          <ImportanceSlider
            min={USER_WEIGHT_VALUE_MIN}
            max={USER_WEIGHT_VALUE_MAX}          
            id={id || 'add-a-weight'} 
            value={isTypeAdd ? internalValue : value}
            handleValueChange={(value) => 
              isTypeAdd
              ? setInternalValue(value)
              : handleValueChange(value)
            }
          />
        </FormGroup>
        <FormGroup className="col-md-1">
          {isTypeAdd && <Button
            size="sm"
            outline
            block
            color="success"
            type="submit"
          >
            +
          </Button>}
          {!isTypeAdd && <Button
            className="d-none d-md-block"
            size="sm"
            outline
            block
            color="danger"
            onClick={() => handleDelete()}
          >
            X
          </Button>}

        </FormGroup>
      </Form>
    </>
  )
}