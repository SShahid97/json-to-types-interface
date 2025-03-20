import { useState } from "react";
import { OutputObj } from "../types";

type JsonInputProps = {
  setJsonInputData: React.Dispatch<React.SetStateAction<string>>;
  jsonInputData: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setNestedObjs: React.Dispatch<React.SetStateAction<OutputObj[]>>;
};

export default function JsonInput({
  jsonInputData,
  setJsonInputData,
  setName,
  name,
  setNestedObjs,
}: JsonInputProps) {
  const [error, setError] = useState<boolean>(false);

  const handleGenerateOutput = (type: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setNestedObjs((_prev) => []);
    try {
      const parsedJson = JSON.parse(jsonInputData);
      if (typeof parsedJson === "object") {
        setNestedObjs((prev) => [
          ...prev,
          { key: name, value: jsonInputData, type: type },
        ]);
        Object.entries(parsedJson).map(([key, value]) => {
          if (typeof value === "object" && value !== null) {
            if (Array.isArray(value) && value.length > 0) {
              setNestedObjs((prev) => [
                ...prev,
                {
                  key: `${key}Entity`,
                  value: JSON.stringify(value.length > 0 ? value[0] : ""),
                  type: type,
                },
              ]);
            } else if (!Array.isArray(value)) {
              setNestedObjs((prev) => [
                ...prev,
                { key: key, value: JSON.stringify(value), type: type },
              ]);
            }
          }
        });
      }
    } catch (err) {
      setError(true);
    }
  };

  const isValidJson = (value: string) => {
    try {
      const parsedJson = JSON.parse(value);
      if (typeof parsedJson === "object") {
        if (Object.keys(parsedJson).length > 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (_err) {
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setError(false);
    const { value } = e.target;
    if (!isValidJson(value)) {
      console.log("ddd");
      setError(true);
    } else {
      setError(false);
    }
    setJsonInputData(value);
  };

  return (
    <div className="json-input">
      <h4>Input: JSON Example</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <input
          name="type-name"
          type="text"
          value={name}
          style={{ fontSize: 17, borderRadius: "5px", padding: 7 }}
          placeholder="Enter type name"
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          value={jsonInputData}
          onChange={handleInputChange}
          rows={4}
          cols={4}
          style={{
            width: "inherit",
            fontSize: 17,
            borderRadius: "5px",
            padding: 7,
            height: '55vh',
          }}
        />
        <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <input
            title={error || !jsonInputData?"Please enter a valid JSON":""}
            type="button"
            className={error || !jsonInputData?"btn-disabled":"btn"}
            disabled={error || !jsonInputData}
            value="Generate Interface"
            onClick={() => handleGenerateOutput("interface")}
          />
          <input
            title={error || !jsonInputData?"Please enter a valid JSON":""}
            type="button"
            className={error || !jsonInputData?"btn-disabled":"btn"}
            disabled={error || !jsonInputData}
            value="Generate Type"
            onClick={() => handleGenerateOutput("type")}
          />
        </div>
      </div>
      <div style={{ marginTop: 50 }}></div>
    </div>
  );
}
