import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  & > span {
    display: inline-block;
    width: 100px;
    text-align: right;
    margin-right: 20px;
  }
  & > input {
    padding: 5px;
    border: 1px solid #b1b1b1;
    background-color: #fafafa;
  }
  & + & {
    margin-top: 5px;
  }
`;

function Input({ type = "text", value, setValue, labelText, placeholder }) {
  return (
    <Label>
      <span>{labelText}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </Label>
  );
}

export default Input;
