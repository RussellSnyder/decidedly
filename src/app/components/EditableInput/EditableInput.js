import React, { useState } from 'react';

import { Input } from 'reactstrap';

import style from './EditableInput.module.css';

function EditableInput({value, onChangeHandler, placeholder}) {
  const [isEditing, setIsEditing] = useState(false);

const text = <span
  className={style['editable-text']}
  onClick={() => setIsEditing(true)}>
    {value}
  </span>

  const editingDom = <Input
    className={style['editable-input']}
    onChange={(e) => {
      onChangeHandler({
        value: e.target.value
      })
    }}
    onBlur={() => setIsEditing(false)}
    value={value}
    type="text"
    name="name"
    placeholder={placeholder} />


  return isEditing ? editingDom : text
}

export default EditableInput