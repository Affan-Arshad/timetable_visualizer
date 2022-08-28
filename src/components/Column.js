export default function Column(props) {
  const { data, name, handleDataChange } = props;

  return (
    <input
      name={name}
      className="inputx"
      type="text"
      value={data}
      onChange={handleDataChange}
    />
  );
}
