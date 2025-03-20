import { useState } from "react";
import { OutputObj } from "./types";
import JsonInput from "./components/json-input";
import TypesOutput from "./components/types-output";

function App() {
  const [name, setName] = useState<string>("ExampleTypeName");
  const [jsonInputData, setJsonInputData] = useState<string>("");
  const [nestedObjs, setNestedObjs] = useState<OutputObj[]>([]);
  return (
    <div style={{ padding: 100, paddingTop:5 }}>
      <h2>
        JSON to TypeScript <span style={{ color: "#ab417b" }}>Interface </span>{" "}
        and <span style={{ color: "#ab417b" }}>Type </span>
      </h2>
      <div className="app-outer">
        <JsonInput
          jsonInputData={jsonInputData}
          setJsonInputData={setJsonInputData}
          setName={setName}
          name={name}
          setNestedObjs={setNestedObjs}
        />
        <TypesOutput nestedObjs={nestedObjs} />
      </div>
    </div>
  );
}

export default App;
