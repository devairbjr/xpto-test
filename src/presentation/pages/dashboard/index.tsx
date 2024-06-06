import React, { useState, useEffect } from "react";
import axios from "axios";
import Accordion from "../../components/Accordion";
import {
  Container,
  ContainerTitle,
  ContainerAccordion,
  InputSearch,
  Contain
} from "./styles";

interface IClient {
  label: string;
  id: string;
  name: string;
  doc: string;
  address: string;
  clients: IClient[];
}

const Home: React.FC = () => {
  const [clients, setClients] = useState<any>([]);

  const montClients = (clients: IClient[], parent_ids: string[] = []) => {
    clients.forEach((client: IClient) => {
      const current_id = client.id;
      const new_entry = {
        id: current_id,
        name: client.name,
        address: client.address,
        doc: client.doc,
        from: [...parent_ids],
        inner: client.clients.map((c) => c.id),
        label: "cliente " + client.id
      };

      setClients((prev: any) => [...prev, new_entry]);

      montClients(client.clients, [...parent_ids, current_id]);
    });
  };

  const getClients = async () => {
    const response = await axios.get(
      "https://integra-api-tests.laerasoftware.com/data/recursive"
    );
    if (response.data.payload.length > 0) {
      montClients(response.data.payload);
    }
  };
  const searchClient = (e: any, id: string) => {
    const client = clients.find((client: any) => client.id === id);
    if (!client) {
      getClients();
      return;
    }
    setClients([]);
    setClients([client]);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <Container>
      <ContainerTitle>
        <b>Clients</b> Finder
      </ContainerTitle>
      <Contain>
        <InputSearch
          placeholder="Search client"
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              searchClient(e, e.target.value);
            }
          }}
        />
        {clients.map((client: any) => (
          <ContainerAccordion>
            <Accordion
              label={client.label}
              id={client.id}
              name={client.name}
              doc={client.doc}
              address={client.address}
              from={client.from}
              inner={client.inner}
            />
          </ContainerAccordion>
        ))}
      </Contain>
    </Container>
  );
};

export default Home;
