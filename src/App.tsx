/*global chrome*/

import { useEffect, useState } from "react";
import "./App.css";
import InputForm from "./Components/InputForm";
import MainPage from "./Components/MainPage";
import { getDataFromLocalStorage } from "./utils";

function App() {
  const [apikey, setApiKey] = useState(getDataFromLocalStorage("openai_key"));

  // Send a message to the background script

  const openSideBar = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });
    console.log(tab);
    const response = await chrome.runtime.sendMessage({
      tabId: tab.id,
      key: apikey
    });
    // do something with response here, not outside the function
    console.log(response);

    // do something with response here, not outside the function
    // console.log(response);
  };

  useEffect(() => {
    if (apikey) openSideBar();
  }, [apikey]);

  return (
    <div className="App">
      <header>Jarvis your Ai assistant</header>
      {!apikey ? (
        <InputForm setApiKey={setApiKey} />
      ) : (
        <MainPage apikey={apikey} setApiKey={setApiKey} />
      )}
    </div>
  );
}

export default App;
