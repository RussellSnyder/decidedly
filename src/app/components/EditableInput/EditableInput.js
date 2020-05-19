import React, { useState } from 'react';

import { Input } from 'reactstrap';

import style from './EditableInput.module.css';

function EditableInput({
  value,
  onChangeHandler,
  placeholder,
  type="text",
  rows=1,
  alwaysEditing=false

}) {
  const [isEditing, setIsEditing] = useState(alwaysEditing);

const text = <span
  className={style['editable-text']}
  onClick={() => {
    if (!alwaysEditing) setIsEditing(true)
  }}>
    {value}
  </span>

  const editingDom = <Input
    className={style['editable-input']}
    onChange={(e) => {
      onChangeHandler({
        value: e.target.value
      })
    }}
    onBlur={() => {
      if (!alwaysEditing) setIsEditing(true)
    }}
    value={value}
    type={type}
    rows={rows}
    placeholder={placeholder} />


  return isEditing ? editingDom : text
}

export default EditableInput