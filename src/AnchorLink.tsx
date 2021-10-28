/**
 * AnchorLink replaces grommet's Anchor component
 * to work as react-dom-router's Link component.
 */

import { Anchor, AnchorExtendedProps } from "grommet/components/Anchor";
import { Link, LinkProps } from "react-router-dom";
import React from "react";

export const AnchorLink: React.FC<AnchorLinkProps> = (props) => {
  return <Anchor as={Link} {...props} />;
};

export type AnchorLinkProps = LinkProps & AnchorExtendedProps;
