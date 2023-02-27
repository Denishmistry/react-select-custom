import React from "react";
import chroma from "chroma-js";

import Select, {  components } from "react-select";



const colourOptions = [
  { value: "chocolate", label: "Chocolate", color: "#00B8D9" },
  { value: "strawberry", label: "Strawberry", color: "#5243AA" },
  { value: "vanilla", label: "Vanilla", color: "#FF8B00" }
];

const { Option } = components;

const IconOption = (props) => (
  <Option {...props}>
    <span
      className="mr-2 ml-2"
      style={{
        display:"inline-block",
        verticalAlign:"middle",
        marginRight:"10px",
        width: "10px",
        height: " 10px",
        borderRadius:"10px",
        backgroundColor:props.data.color
      }}
    >
    </span>
    {props.data.label}
  </Option>
);

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    marginLeft:8,
    height: 10,
    width: 10
  }
});

const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined
      }
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  multiValue: (styles, { data }) => ({ ...styles, ...dot(data.color) })
  // singleValue
};

function App() {
  return (
    <div className="App">
        <Select
          // defaultValue={colourOptions[2]}
          options={colourOptions}
          styles={colourStyles}
          components={{ Option: IconOption }}
          isMulti
        />
    </div>
  );
}

export default App;
