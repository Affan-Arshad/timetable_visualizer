import Column from "./Column";

export default function DataRow(props) {
  const { index, row, handleDataChange, addRow, deleteRow } = props;

  return (
    <div key={index} index={index} className="px-3 row flex gap-x-3 w-100">
      <span onClick={addRow} className="hoverButton addRow addBefore">
        +
      </span>

      <Column
        name="subject"
        data={row.subject}
        handleDataChange={handleDataChange}
      />
      <Column name="day" data={row.day} handleDataChange={handleDataChange} />
      <Column
        name="start_time"
        data={row.start_time}
        handleDataChange={handleDataChange}
      />
      <Column
        name="end_time"
        data={row.end_time}
        handleDataChange={handleDataChange}
      />

      <span onClick={addRow} className="hoverButton addRow addAfter">
        +
      </span>
      <span onClick={deleteRow} className="hoverButton deleteRow">
        x
      </span>
    </div>
  );
}
