import React from 'react';

import { Nav, Paragraph } from 'grommet';
import { UserSettings } from 'grommet-icons';
import { AnchorLink } from './AnchorLink';

type MenuProps = {
    endpointCount: number;
};

function Menu({ endpointCount }: MenuProps) {
    return (
        <Nav direction="row" pad="medium">
            <Paragraph margin="none">{ endpointCount } Endpoints</Paragraph>
            <AnchorLink to="/settings/" icon={<UserSettings/>} label="Settings" />
        </Nav>
    );
}

export default Menu;
