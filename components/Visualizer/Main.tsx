"use client";
import { useState } from "react";
import styles from "./main.module.css";

const Main = () => {
  const [array, setArray] = useState([0, 0, 0, 0, 0]);
  const [pointer, setPointer] = useState(0);
  const [output, setoutput] = useState("");

  function handleIncrementClick(index: number, isIncreament: boolean) {
    const updatedArray = array.map((c, i) => {
      if (i === index) {
        return isIncreament ? c + 1 : c === 0 ? 255 : c - 1;
      } else {
        return c;
      }
    });
    setArray(updatedArray);
  }
  const convertToAscii = (value: number): string => {
    const charCode = value.toString(16);
    return String.fromCharCode(parseInt(charCode, 16));
  };

  return (
    <div className={styles.visualizerContainer}>
      <div>
        <div className={styles.boxes}>
          {array.map((value, index) =>
            index === pointer ? (
              <p
                className={styles.box}
                style={{ backgroundColor: "#eee", color: "#000" }}
              >
                {value}
              </p>
            ) : (
              <p className={styles.box}>{value}</p>
            )
          )}
        </div>
        <button
          className={styles.button}
          onClick={() => setPointer(pointer + 1)}
        >
          {">"}
        </button>
        <button
          className={styles.button}
          onClick={() => setPointer(pointer - 1)}
        >
          {"<"}
        </button>
        <button
          className={styles.button}
          onClick={() => handleIncrementClick(pointer, true)}
        >
          {"+"}
        </button>
        <button
          className={styles.button}
          onClick={() => handleIncrementClick(pointer, false)}
        >
          {"-"}
        </button>
        <button
          className={styles.button}
          onClick={() => setoutput(output + convertToAscii(array[pointer]))}
        >
          {"."}
        </button>
        <h1>{output}</h1>
      </div>
    </div>
  );
};

export default Main;
