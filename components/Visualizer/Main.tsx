"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { produce } from "immer";
import styles from "./main.module.css";
import ui from "../ui/ui.module.css";
import Image from "next/image";
import caret from "@/public/caret.svg";
import * as Progress from "@radix-ui/react-progress";
const Main = () => {
  const [memory, setMemory] = useState<number[]>(new Array(300).fill(0));
  const [pointer, setPointer] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [stop, setStop] = useState(false);

  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const [inputValue, setinputValue] = useState("");
  const resetProgram = () => {
    setMemory(new Array(300).fill(0));
    console.log(memory);

    setPointer(0);
    setOutput("");
    setProgress(0);
  };
  const cleanup = (code: string): string => {
    return code
      .split("")
      .filter((x) => [".", ",", "[", "]", "<", ">", "+", "-"].includes(x))
      .join("");
  };
  const buildBracemap = (code: string): { [key: number]: number } => {
    const tempBracestack: number[] = [];
    const bracemap: { [key: number]: number } = {};

    for (let position = 0; position < code.length; position++) {
      const command = code[position];
      if (command === "[") tempBracestack.push(position);
      if (command === "]") {
        const start = tempBracestack.pop()!;
        bracemap[start] = position;
        bracemap[position] = start;
      }
    }

    return bracemap;
  };

  const handleUpdateCommand = (x: number, incrementing: boolean) => {
    setMemory(
      produce((draft) => {
        incrementing
          ? draft[x] === 255
            ? (draft[x] = 0)
            : (draft[x] += 1)
          : draft[x] === 0
          ? (draft[x] = 255)
          : (draft[x] -= 1);
      })
    );
  };

  const runProgram = (code: string): void => {
    code = cleanup(code);
    let commandsPointer: number = 0;
    const bracemap: { [key: number]: number } = buildBracemap(code);

    console.log(code.split(""));
    console.log(bracemap);

    let codeOutput: string = "";
    let array = memory;
    const runNextCommand = (x: number, memory: number[]) => {
      if (commandsPointer < code.length) {
        const command = code[commandsPointer];

        console.log(commandsPointer, command);

        if (command == ">") {
          if (pointer >= array.length) return;
          setPointer(produce((draft) => (draft += 1)));
          x += 1;
        }
        if (command == "<") {
          //   if (pointer == 0) return;
          setPointer(produce((draft) => (draft -= 1)));
          x -= 1;
        }
        if (command == "+") {
          handleUpdateCommand(x, true);
          memory[x] = memory[x] < 255 ? memory[x] + 1 : 0;
        }
        if (command == "-") {
          handleUpdateCommand(x, false);
          memory[x] = memory[x] > 0 ? memory[x] - 1 : 255;
        }
        if (command === ".") {
          codeOutput += String.fromCharCode(memory[x]);
          setOutput(codeOutput);
        }
        if (command === "[" && memory[x] === 0) {
          commandsPointer = bracemap[commandsPointer];
          console.log(
            "entered the end and the cmdpointer is now",
            commandsPointer
          );
        }
        if (command === "]" && memory[x] !== 0) {
          commandsPointer = bracemap[commandsPointer];
        }
        commandsPointer++;
        console.log("finished command", command);
        console.log("memory pointer", x, "memory value", memory[x]);
        setTimeout(() => runNextCommand(x, memory), 100);
      }
    };
    runNextCommand(pointer, memory);
  };

  return (
    <div className={styles.visualizerContainer}>
      <div className={styles.boxesContainer}>
        <div className={styles.boxes}>
          {memory.map((value, index) =>
            index === pointer ? (
              <div
                key={index}
                className={styles.box}
                style={{ backgroundColor: "#eee", color: "#000" }}
              >
                {value}
              </div>
            ) : (
              <div className={styles.box} key={index}>
                {value}
              </div>
            )
          )}
        </div>
        <div className="caretContainer">
          <Image
            src={caret}
            alt="caret"
            className={styles.caret}
            style={{
              marginLeft: `${pointer * 4 + 1}rem`,
              height: 32,
              width: 32,
            }}
          />
        </div>
      </div>

      <div className={styles.codeContainer}>
        <textarea
          name="code"
          className={styles.codeArea}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <section className={styles.codeOutput}>
          <button
            onClick={() => {
              resetProgram();
              runProgram(code);
            }}
          >
            Run
          </button>
          <button onClick={() => setStop(!stop)}>Stop</button>
          <Progress.Root className={ui.ProgressRoot} value={progress}>
            <Progress.Indicator
              className={ui.ProgressIndicator}
              style={{ transform: `translateX(-${100 - progress}%)` }}
            />
          </Progress.Root>

          <p>{output}</p>
        </section>
      </div>

      {/* <h1>{output}</h1> */}

      {open ? (
        <div className={ui.inputModal}>
          <h1>Input</h1>
          <span>Enter any [one] character from keyboard </span>
          <input type="text" maxLength={1} defaultValue={""} autoFocus />
          <p>{inputValue.length}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Main;
