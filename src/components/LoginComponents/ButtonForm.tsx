import React from "react";
import styled from "styled-components";

const primaryColor = "#007bff";
const secondaryColor = "#dc3545"; 

const StyledButton = styled.button<{ $primary: boolean }>`
  background-color: ${(props) => (props.$primary ? primaryColor : secondaryColor)};
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.$primary ? "#0056b3" : "#a71d2a")};
  }
`;

interface ButtonProps {
  primary?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ primary = true, onClick, children }) => {
  return (
    <StyledButton $primary={primary} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
