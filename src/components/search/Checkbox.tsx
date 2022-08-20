import React from 'react';
import './Checkbox.scss';

type CheckboxProps = { isChecked: boolean, label: string, checkHandler: () => void, index: number };

const Checkbox = ({ isChecked, label, checkHandler, index }: CheckboxProps) => {
    const id = `${label}-checkbox-${index}`;
    return (
        <div className="checkbox">
            <label htmlFor={id}>
                <input
                    type="checkbox"
                    id={id}
                    checked={isChecked}
                    onChange={checkHandler}
                />
                {label}
            </label>
        </div>
    )
}

export default Checkbox;