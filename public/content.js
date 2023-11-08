console.log("Content script loaded");

const inputEvent = new Event("input", {
  bubbles: true,
  cancelable: true
});

const allInputElements = document.querySelectorAll(
  "input,textarea,[contenteditable='true']"
);

const makeChatGptCall = (text, e) => {
  if (e.target.value) e.target.value = "Jarvis is typing...✍️";
  if (e.target.textContent) e.target.textContent = "Jarvis is typing...✍️";
  e.target.dispatchEvent(inputEvent);

  (async () => {
    const response = await chrome.runtime.sendMessage({ text });
    // do something with response here, not outside the function

    if (e.target.value) e.target.value = response;
    if (e.target.textContent) e.target.textContent = response;
    e.target.dispatchEvent(inputEvent);
  })();
};

const debounced = (fn, wait) => {
  let tid = null;

  return (...args) => {
    if (tid) clearTimeout(tid);
    tid = setTimeout(() => {
      fn(...args);
    }, wait);
  };
};

const callJarvis = (e) => {
  let text = e.target.value ?? e.target.textContent;
  text = text.trim();
  if (text[text.length - 1] !== ";") return;

  const splitText = text.split(":");

  if (splitText[0].toLowerCase().trim() !== "jarvis" || !splitText[1].trim())
    return;
  else {
    makeChatGptCall(splitText[1], e);
  }
};

const debouncedJarvis = debounced(callJarvis, 1000);

allInputElements.forEach((item) => {
  item.addEventListener("keypress", debouncedJarvis);
});
