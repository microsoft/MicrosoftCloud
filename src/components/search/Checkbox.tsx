import React from 'react';

function Checkbox({ isChecked, label, checkHandler, index }: any) {
    return (
        <div className="checkbox">
            <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={isChecked}
                onChange={checkHandler}
            />
            <label htmlFor={`checkbox-${index}`}>{label}</label>
        </div>
    )
}

export default Checkbox;