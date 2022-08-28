import { useEffect, useState } from "react";
import DataRow from "./components/DataRow";
import "./tailwind.output.css";
import "./index.css";

export default function App() {
  const [data, setData] = useState([
    {
      subject: "CPT149",
      lt: "L",
      room: "Q2-09(45)",
      day: "SUN",
      start_time: "1600",
      end_time: "1800"
    },
    {
      subject: "PHY205",
      lt: "L",
      room: "Q4-07(46)",
      day: "MON",
      start_time: "1600",
      end_time: "1800"
    },
    {
      subject: "CPT205",
      lt: "L",
      room: "Q3-09(lab-30)",
      day: "MON",
      start_time: "1800",
      end_time: "2000"
    },
    {
      subject: "MAT103",
      lt: "L",
      room: "Q2-09(45)",
      day: "TUE",
      start_time: "1600",
      end_time: "1800"
    },
    {
      subject: "CPT205",
      lt: "T",
      room: "Q3-09(lab-30)",
      day: "TUE",
      start_time: "1800",
      end_time: "2000"
    },
    {
      subject: "PHY205",
      lt: "T",
      room: "Q4-07(46)",
      day: "WED",
      start_time: "1400",
      end_time: "1600"
    },
    {
      subject: "CPT149",
      lt: "T2",
      room: "Q3-09(lab-30)",
      day: "WED",
      start_time: "1800",
      end_time: "2000"
    },
    {
      subject: "MAT103",
      lt: "T",
      room: "Q2-09(45)",
      day: "THU",
      start_time: "1600",
      end_time: "1800"
    }
  ]);

  const [optimisedData, setOptimisedData] = useState({});

  useEffect(() => {
    setOptimisedData((prev) => {
      const times = new Set(
        data
          .map((data) => {
            return data.start_time + " - " + data.end_time;
          })
          .sort()
      );

      const days = new Set(
        data.map((data) => {
          return data.day;
        })
      );

      const subjects = new Set(
        data.map((data) => {
          return data.subject;
        })
      );

      const colors = ["blue", "orange", "green", "red", "orange"];

      const coloredSubjects = Object.fromEntries(
        [...subjects].map((subject, i) => {
          return [subject, colors[i]];
        })
      );

      return {
        headers: [...times],
        rows: [...days].map((day) => {
          return [
            { name: day },
            ...[...times].map((time, j) => {
              for (let i = 0; i < data.length; i++) {
                if (
                  data[i].day == day &&
                  data[i].start_time + " - " + data[i].end_time == time
                ) {
                  return {
                    name: data[i].subject,
                    lt: data[i].lt,
                    room: data[i].room,
                    color: coloredSubjects[data[i].subject]
                  };
                }
              }
              return {};
            })
          ];
        })
      };
    });
  }, [data]);

  console.log(data);

  const handleDataChange = (event) => {
    const key = event.target.getAttribute("name");
    const index = event.target.parentElement.getAttribute("index");
    const value = event.target.value;
    setData((prev) => {
      return prev.map((row, i) => {
        if (i == index) {
          return { ...row, [key]: value };
        }
        return row;
      });
    });
  };

  const addRow = (event) => {
    let index = event.target.parentElement.getAttribute("index");
    if (event.target.classList.contains("addAfter")) index++;
    const newItem = {
      subject: "",
      day: "",
      start_time: "",
      end_time: ""
    };
    setData((prev) => {
      return [...prev.slice(0, index), newItem, ...prev.slice(index)];
    });
  };

  const deleteRow = (event) => {
    const index = event.target.parentElement.getAttribute("index");
    setData((prev) => {
      return prev.filter((row, i) => {
        if (i != index) return true;
        return false;
      });
    });
  };

  return (
    <div className="App p-3 container mx-auto">
      <div className="flex flex-col gap-y-3">
        <div className="px-3 headers flex gap-x-3">
          <span>Subject</span>
          <span>Day</span>
          <span>Start time</span>
          <span>End time</span>
        </div>

        {!data.length ? (
          <span onClick={addRow}>add a row</span>
        ) : (
          data.map((row, index) => (
            <DataRow
              key={index}
              row={row}
              index={index}
              addRow={addRow}
              handleDataChange={handleDataChange}
              deleteRow={deleteRow}
            />
          ))
        )}

        <div className="mt-10">
          <h1 className="text-2xl">Visually Optimised Time Table</h1>
          <table className="w-full mt-10 optimised-table">
            <thead>
              <tr>
                <th></th>
                {!!optimisedData.headers &&
                  !!optimisedData.headers.length &&
                  optimisedData.headers.map((time) => <th>{time}</th>)}
              </tr>
            </thead>
            <tbody>
              {!!optimisedData.rows &&
                !!optimisedData.rows.length &&
                optimisedData.rows.map((row, i) => (
                  <tr>
                    {row.map((data) => (
                      <td
                        className={`font-bold p-4 bg-${data.color}-200 text-${data.color}-900`}
                      >
                        {data.name} <small>{data.lt}</small>
                        <br />
                        <small>{data.room}</small>
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
