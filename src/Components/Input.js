import React from "react";

function Input({ type = "text", value, setValue }) {
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return <input type={type} value={value} onChange={(e) => onChange(e)} />;
}

export default Input;
