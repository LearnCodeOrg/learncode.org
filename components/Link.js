export default function Link(props) {
  const { to } = props;

  return (
    <a href={to} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
}
