import React, { useState } from "react";
import styled from "styled-components";

const primaryColor = "#007bff";
const secondaryColor = "#dc3545";
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
  color: ${(props) => props.theme.errorColor};
`;

interface InputEmailProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputEmail: React.FC<InputEmailProps> = ({ value, onChange, placeholder = "Inserisci la tua email" }) => {
  const [touched, setTouched] = useState(false);

  // Funzione per validare l'email
  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  // const isValidEmail = (email: string) => email.length < 5

  const hasError = touched && !isValidEmail;

  return (
    <InputWrapper>
      <Label>Email</Label>
      <StyledInput
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onBlur={() => setTouched(true)}
        $hasError={hasError}
      />
      {hasError && <ErrorMessage>Inserisci un'email valida</ErrorMessage>}
    </InputWrapper>
  );
};

export default InputEmail;
