import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  width: 100%;
  max-width: 450px;
  margin: 50px auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 20px;
`;

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <CardWrapper>{children}</CardWrapper>;
};

export default Card;
