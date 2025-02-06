import React, { useState } from "react";
import styled from "styled-components";

const primaryColor = "#007bff"; 
const borderColor = "#ccc";
const errorColor = "#ff4d4d";

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 15px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: ${primaryColor};
`;

const StyledInput = styled.input<{ $hasError: boolean }>`
  width: 100%;
  padding: 10px;
  border: 2px solid ${(props) => (props.$hasError ? errorColor : borderColor)};
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease-in-out;

  &:focus {
    border-color: ${(props) => (props.$hasError ? errorColor : primaryColor)};
  }
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: ${errorColor};
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: 35px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: ${primaryColor};
`;

interface InputPasswordProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputPassword: React.FC<InputPasswordProps> = ({ value, onChange, placeholder = "Inserisci la tua password" }) => {
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Controlla se la password è valida (minimo 6 caratteri)
  const isValidPassword = (password: string) => password.length >= 6;

  const hasError = touched && !isValidPassword(value);

  return (
    <InputWrapper>
      <Label>Password</Label>
      <StyledInput
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onBlur={() => setTouched(true)}
        $hasError={hasError}
      />
      <ToggleButton type="button" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "🙈" : "👁"}
      </ToggleButton>
      {hasError && <ErrorMessage>La password deve avere almeno 6 caratteri</ErrorMessage>}
    </InputWrapper>
  );
};

export default InputPassword;
