import React from 'react';

const InputField = ({ label, type, placeholder, value, setValue }) => (
  <div>
    <div className="label">{label}</div>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </div>
);

export default InputField;
