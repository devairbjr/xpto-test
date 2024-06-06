import React, { useState } from "react";
import {
  Container,
  Title,
  ContainerAccordion,
  ContainerTitle,
  BoxTitle
} from "./styles";

interface IAccordionProps {
  label: string;
  id: string;
  name: string;
  doc: string;
  address: string;
  from: string[];
  inner: string[];
}
const Accordion = ({
  label,
  id,
  name,
  doc,
  address,
  from,
  inner
}: IAccordionProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Container>
        <BoxTitle>
          <Title>{label}</Title>
          <button onClick={handleOpen}>{open ? "close" : "open"}</button>
        </BoxTitle>
        {open && (
          <ContainerAccordion>
            <ContainerTitle>{"id: " + id}</ContainerTitle>
            <ContainerTitle>{"nome: " + name}</ContainerTitle>
            <ContainerTitle>{"documento: " + doc}</ContainerTitle>
            <ContainerTitle>{"endereco : " + address}</ContainerTitle>
            <ContainerTitle>{"cliente de : " + from}</ContainerTitle>
            <ContainerTitle>{"Possui Clientes: " + inner}</ContainerTitle>
          </ContainerAccordion>
        )}
      </Container>
    </>
  );
};

export default Accordion;
