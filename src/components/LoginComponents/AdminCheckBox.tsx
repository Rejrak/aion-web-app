import React from "react";
import styled from "styled-components";

const primaryColor = "#007bff";
const borderColor = "#ccc";

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const StyledCheckbox = styled.div<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 2px solid ${borderColor};
  background-color: ${(props) => (props.$checked ? primaryColor : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:after {
    content: "✔";
    font-size: 14px;
    color: white;
    display: ${(props) => (props.$checked ? "block" : "none")};
  }
`;

const Label = styled.label`
  font-size: 16px;
  color: ${primaryColor};
  cursor: pointer;
`;

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <CheckboxWrapper>
      <HiddenCheckbox checked={checked} onChange={() => onChange(!checked)} />
      <StyledCheckbox $checked={checked} onClick={() => onChange(!checked)} />
      <Label onClick={() => onChange(!checked)}>Sono un amministratore</Label>
    </CheckboxWrapper>
  );
};

export default Checkbox;
