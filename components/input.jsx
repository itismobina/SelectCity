import React from 'react';

export default function Input({id, className, placeholder, type, onChange, value, onKeyDown, maxLength, onFocus, ref, readOnly}) {
    return (
        <input
            id={id}
            className={`${className}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            maxLength={maxLength}
            onFocus={onFocus}
            ref={ref}
            readOnly={readOnly}
        />
    )
}