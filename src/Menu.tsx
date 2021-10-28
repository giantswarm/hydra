import React from 'react';

import { Button, Nav, Paragraph } from 'grommet';
import { UserSettings } from 'grommet-icons';

type MenuProps = {
    endpointCount: number;
};

function Menu({ endpointCount }: MenuProps) {
    return (
        <Nav direction="row" pad="medium">
            <Paragraph margin={{vertical: 'xsmall'}}>{ endpointCount } Endpoints</Paragraph>
            <Button icon={<UserSettings/>} label="Settings" />
        </Nav>
    );
}

export default Menu;
