export default function Square(props) {
  return (
    <button
      className={`square ${props.isHighligted && 'highlighted'}`}
      onClick={props.onClick}>
      {props.value}
    </button>
  );
}