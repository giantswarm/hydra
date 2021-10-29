import React from 'react';
import { decode } from 'js-base64';

import { Box, Button, Layer, Main, Heading, DataTable, Text } from 'grommet';
import { CircleInformation } from 'grommet-icons';

const decodeJWT = (encoded: string) => {
  const parts = encoded.split('.');
  //const header = decode(parts[0]);
  const payload = decode(parts[1]);
  const payloadData = JSON.parse(payload);
  const payloadFriendly = JSON.stringify(payloadData, null, " ");
  return payloadFriendly;
}

function Settings() {
  const [show, setShow] = React.useState<boolean>();

  // Get all localStorage items with key 'oidc.user:*'
  const keys = Object.keys(localStorage);
  let numKeys = keys.length;
  const endpoints = [];

  while (numKeys--) {
    if (keys[numKeys].startsWith('oidc.user:')) {
      const keyParts = keys[numKeys].split(':');
      const item = localStorage.getItem(keys[numKeys]);
      if (item) {
        const itemData = JSON.parse(item);
        itemData['issuer'] = keyParts[1] + ':' + keyParts[2];
        itemData['client_id'] = keyParts[3]
        endpoints.push(itemData);
      }
    }
  }

  return (
    <Main pad="large">
      <Heading margin="none">Settings</Heading>

      <Heading margin="none" level="2" >Management API endpoints</Heading>

      <DataTable
        columns={[
          {
            property: 'issuer',
            header: <Text>Endpoint URL</Text>,
            primary: false,
          },
          {
            property: 'profile.name',
            header: <Text>User name</Text>,
            render: datum => (datum.profile.name),
          },
          {
            property: 'profile.email',
            header: <Text>User email</Text>,
            render: datum => (datum.profile.email),
          },
          {
            property: 'expires_at',
            header: <Text>Status</Text>,
            primary: false,
            render: datum => {
              const now = Date.now() / 1000;
              const delta = datum.expires_at - now;
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
                        {decodeJWT(datum.id_token)}
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
        data={endpoints} />
    </Main>
  );
}

export default Settings;
