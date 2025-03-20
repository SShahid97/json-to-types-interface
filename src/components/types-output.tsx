import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";
import { OutputObj } from "../types";
import { capitalize } from "../utils/helpers";

type TypesOutputProps = {
  nestedObjs: OutputObj[];
};

export default function TypesOutput({ nestedObjs }: TypesOutputProps) {
  const { copy } = useCopyToClipboard();

  const handleCopy = () => {
    const output = document.getElementById("output-box")?.innerText;
    console.log(output);
    if (output) copy(output);
  };

  return (
    <div className="types-output">
      <h4>Output: TypeScript Type / Interface</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          id="output-box"
          style={{
            border: "1px solid black",
            padding: 10,
            whiteSpace: "break-spaces",
            borderRadius: "5px",
            overflowY: "auto",
            height: "60vh",
            fontFamily: "monospace",
          }}
        >
          {nestedObjs.map((item) => {
            const pars = JSON.parse(item.value);
            return (
              <div key={new Date().getTime()}>
                <span style={{ color: "#ab417b" }}>export {item.type} </span>
                <span style={{ color: "blue" }}>{capitalize(item.key)} </span>
                {item.type === "type" ? `= {` : ` {`}
                <br />
                {Object.entries(pars).map(([key, value]) => (
                  <>
                    {typeof value === "object" ? (
                      <>
                        {value === null ? (
                          <span key={key} style={{ paddingLeft: 20 }}>
                            {`${key}: null;`}
                          </span>
                        ) : (
                          <>
                            {Array.isArray(value) &&
                              value.length > 0 &&
                              typeof value[0] === "object" && (
                                <span
                                  style={{ paddingLeft: 20, color: "#626262" }}
                                >
                                  {`${key}: (${capitalize(key)}Entity) [];`}
                                </span>
                              )}
                            {Array.isArray(value) &&
                              value.length > 0 &&
                              typeof value[0] !== "object" && (
                                <span
                                  style={{ paddingLeft: 20, color: "#626262" }}
                                >
                                  {`${key}: ${typeof value[0]}[];`}
                                </span>
                              )}
                            {Array.isArray(value) && value.length == 0 && (
                              <span
                                style={{ paddingLeft: 20, color: "#626262" }}
                              >
                                {`${key}: (null)[] | null;`}
                              </span>
                            )}

                            {!Array.isArray(value) && (
                              <span
                                style={{ paddingLeft: 20, color: "#626262" }}
                              >
                                {`${key}: ${capitalize(key)};`}
                              </span>
                            )}
                          </>
                        )}
                        <br />
                      </>
                    ) : (
                      <>
                        <span style={{ paddingLeft: 20, color: "#626262" }}>
                          {`${key}: ${typeof value};`}
                        </span>
                        <br />
                      </>
                    )}
                  </>
                ))}
                <span>{"}"}</span>
              </div>
            );
          })}
        </div>
        <div>
          <input
            disabled={nestedObjs.length === 0}
            className={nestedObjs.length === 0 ? "btn-disabled" : "btn"}
            type="button"
            value="Copy"
            onClick={handleCopy}
          />
        </div>
      </div>
    </div>
  );
}
