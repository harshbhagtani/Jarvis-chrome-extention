import { Button, Input } from "antd";
import React from "react";
import { SetDataLocalStorage } from "../utils";

const MainPage = ({ apikey, setApiKey }: any) => {
  const reenterKey = () => {
    SetDataLocalStorage("openai_key", "");
    setApiKey("");
  };

  return (
    <div>
      <h3>👋 Hi there Jarvis here how may i help you?</h3>
      <div className="text_1">
        Just write Jarvis : (your question/prompt) in any editable box and put
        semicolon ';' at the end and wait for Jarvis to assist you😉.
      </div>

      <label>Api key</label>
      <Input disabled={true} value={apikey} type="password"></Input>
      <Button style={{ marginTop: "10px" }} onClick={reenterKey}>
        Enter new Api key
      </Button>
    </div>
  );
};

export default MainPage;
