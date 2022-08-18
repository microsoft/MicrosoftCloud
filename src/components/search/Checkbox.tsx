import React from 'react';
import './Checkbox.css';

function Checkbox({ isChecked, label, checkHandler, index }: { isChecked: boolean, label: string, checkHandler: () => void, index: number }) {
    return (
        <div className="checkbox">
            <label htmlFor={`${label}-${index}`}>
                <input
                    type="checkbox"
                    id={`${label}-${index}`}
                    checked={isChecked}
                    onChange={checkHandler}
                />
                {label}
            </label>
        </div>
    )
}

export default Checkbox;