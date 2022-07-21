import { ReactNode } from 'react';

type Props = {
  to: string,
  children: ReactNode
};

export default function Link(props: Props) {
  const { to } = props;

  return (
    <a href={to} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
}
