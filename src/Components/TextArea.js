import React from "react";

function TextArea({ value, setValue }) {
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return <textarea onChange={(e) => onChange(e)} defaultValue={value} />;
}

export default TextArea;
