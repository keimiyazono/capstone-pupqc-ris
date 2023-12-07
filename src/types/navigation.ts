import { IconBaseProps } from 'react-icons';

export type NavigationParent = Array<NavigationChildren | Navigation>;

export interface NavigationChildren {
  label: string;
  nodeList: Navigation[];
}

export interface Navigation {
  label: string;
  Icon: React.JSXElementConstructor<IconBaseProps>;
  href: string;
  className?: string;
}

export interface CustomStep {
  label: string;
  Icon: React.JSXElementConstructor<IconBaseProps>;
}
