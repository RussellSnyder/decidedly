import React, { useState } from 'react';

import './ImportanceSlider.module.css';
import { CustomInput,
  Button,
  Input
} from 'reactstrap';

function ImportanceSlider({
  id,
  name,
  value,
  handleNameChange,
  handleValueChange,
  handleDelete,
  min = -10,
  max = 10,
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
            min={min}
            max={max}
            onChange={(e) => handleValueChange(parseInt(e.target.value))}
          />
          <div className="row">
            <div className="col-4 text-left">
              <Button onClick={()=> {
                if (value <= min) return;
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
                if (value >= max) return
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
