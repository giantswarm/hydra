import React from 'react';
import { decode } from 'js-base64';
import EndpointManager from './auth/endpointManager';

import { Box, Button, Layer, Main, Heading, DataTable, Text } from 'grommet';
import { CircleInformation } from 'grommet-icons';

/**
 * Decode the payload of a JWT
 *
 * @param encoded Encoded JWT
 * @returns Payload as object
 */
const decodeJWT = (encoded: string): any => {
  const parts = encoded.split('.');
  const payload = decode(parts[1]);
  return JSON.parse(payload);
}

type SettingsProps = {
  endpointManager: EndpointManager;
}

function Settings({ endpointManager }: SettingsProps) {
  const [show, setShow] = React.useState<boolean>();

  const endpoints = Object.values(endpointManager.getEndpoints());

  const tableData = [];

  for (let endpoint of endpoints) {
    let item = {
      baseDomain: endpoint.baseDomain,
      issuer: endpoint.issuerURL,
      userName: '',
      userEmail: '',
      expires: 0,
      idToken: null,
    }

    const idToken = endpointManager.getIDToken(endpoint.baseDomain);
    if (idToken) {
      const payload = decodeJWT(idToken);
      item.userName = payload.name;
      item.userEmail = payload.email;
      item.expires = payload.exp;
      item.idToken = payload;
    }

    tableData.push(item);
  }


  return (
    <Main pad="large">
      <Heading margin={{vertical: "small"}} size="small">Settings</Heading>

      <Heading margin={{vertical: "medium"}} level="2" size="small">Management API endpoints</Heading>

      <DataTable
        columns={[
          {
            property: 'baseDomain',
            header: <Text>Base domain</Text>,
            primary: false,
          },
          {
            property: 'userName',
            header: <Text>User name</Text>,
            render: datum => (datum.userName),
          },
          {
            property: 'userEmail',
            header: <Text>Email</Text>,
            render: datum => (datum.userEmail),
          },
          {
            property: 'expires',
            header: <Text>Status</Text>,
            primary: false,
            render: datum => {
              const now = Date.now() / 1000;
              const delta = datum.expires - now;
              if (delta > 0) {
                return <Text>ID token active</Text>;
              }
              return <Text>ID token expired</Text>;
            },
          },
          {
            property: 'actions',
            header: <Text />,
            primary: false,
            render: datum => {
              const tokenString = JSON.stringify(datum.idToken, null, " ");

              return (
                <>
                  <Button plain label={<CircleInformation/>} onClick={() => setShow(true)} />
                  {show && (
                    <Layer
                      onEsc={() => setShow(false)}
                      onClickOutside={() => setShow(false)}
                      full={true}
                      margin="small"
                    >
                      <Box direction="column" pad="medium" gap="small">
                        <pre>
                        {tokenString}
                        </pre>
                        <Button label="Close" onClick={() => setShow(false)} />
                      </Box>
                    </Layer>
                  )}
                </>
              )
            },
          }
        ]}
        data={tableData} />
    </Main>
  );
}

export default Settings;
