import { Button, Input } from "antd";
import React, { useState } from "react";
import { SetDataLocalStorage } from "../utils";
import "./styles.css";

const InputForm = ({ setApiKey }: any) => {
  const [key, setKey] = useState("");

  const saveApiKey = () => {
    SetDataLocalStorage("openai_key", key);
    setApiKey(key);
  };

  return (
    <form className="formContainer" onSubmit={saveApiKey}>
      <p className="text_1">*Please enter your openai API key to use Jarvis</p>
      <div>
        <label>YOUR API KEY</label>
        <Input
          value={key}
          onChange={(e) => {
            setKey(e.target.value);
          }}
        ></Input>
      </div>

      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default InputForm;
