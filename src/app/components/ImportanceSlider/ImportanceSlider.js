import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './ImportanceSlider.module.css';
import { CustomInput,
  Button,
  Input
} from 'reactstrap';

export const IMPORTANCE_SLIDER_MAX = 7;
export const IMPORTANCE_SLIDER_MIN = -7;

function ImportanceSlider({
  id,
  name,
  value,
  handleNameChange,
  handleValueChange,
  handleDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const DisplayName = () => {
    if (!handleNameChange) return name;
    
    const notEditing = (
      <div className="editable" onClick={() => setIsEditing(!isEditing)}>
        {name}
      </div>
    )

    const editing = (
      <div className="editable">
        <Input
          type="textarea"
          rows="2"
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              setIsEditing(false)
              handleNameChange(e.target.value)  
            }
          }}
          onBlur={(e) => {
            setIsEditing(false)
            handleNameChange(e.target.value)
          }}
          defaultValue={name}
        />
      </div>
    )

    return isEditing ? editing : notEditing
  }

  return (
    <div className="importantance-slider row mb-4">
        <div className="col-sm-4">
          <DisplayName /> 
        </div>
        <div className={`col-sm-${handleDelete ? 7 : 8}`}>
          <CustomInput
            id={id}
            type="range"
            value={value}
            min={IMPORTANCE_SLIDER_MIN}
            max={IMPORTANCE_SLIDER_MAX}
            onChange={(e) => handleValueChange(parseInt(e.target.value))}
          />
          <div className="row">
            <div className="col-4 text-left">
              <Button onClick={()=> {
                if (value <= IMPORTANCE_SLIDER_MIN) return;
                handleValueChange(value - 1)
              }}>
                -
              </Button>
            </div>
            <div className="col-4 text-center">
              {value}
            </div>
            <div className="col-4 text-right">
              <Button onClick={()=> {
                if (value >= IMPORTANCE_SLIDER_MAX) return
                handleValueChange(value + 1)
              }}>
                +
              </Button>
            </div>
          </div>
        </div>
        {handleDelete && <div className="col-sm-1 text-right">
          <Button
            size="small"
            color="danger"
            outline onClick={() => handleDelete({id})}
          >
            X
          </Button>
        </div>}
    </div>
  );
}

export default ImportanceSlider;
