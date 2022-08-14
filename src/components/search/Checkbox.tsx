import React from 'react';

function Checkbox({ isChecked, label, checkHandler, index }: { isChecked: boolean, label: string, checkHandler: () => void, index: number }) {
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