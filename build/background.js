let apikey = "";
const sendRequestToChatAPI = async (inputText) => {
  try {
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const res = await fetch(apiUrl, {
      method: "post",
      headers: {
        Authorization: `Bearer ${apikey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: inputText }],
        temperature: 0.7
      })
    });

    const response = await res.json();
    return response;
  } catch (error) {
    console.error("Error making API request:", error);
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.tabId) apikey = request.key;

  if (request.tabId)
    chrome.scripting.executeScript({
      target: { tabId: request.tabId },
      files: ["content.js"]
    });
  else {
    sendRequestToChatAPI(request.text)
      .then((response) => {
        const message = response?.choices[0]?.message.content;

        sendResponse(message);
      })
      .catch((e) => {
        sendResponse(
          "There was some issue connecting with Jarvis Please try again.😞"
        );
      });
  }
  return true;
});

console.log("hello from background");
