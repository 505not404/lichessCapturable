chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });

  const lichessPath = "https://lichess.org"; 

  chrome.action.onClicked.addListener(async (tab) => {
    console.log("yeah"); 
    if (tab.url.startsWith(lichessPath)) {
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      const nextState = prevState === 'ON' ? 'OFF' : 'ON';
  
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState
      });
  
      if (nextState === 'ON') {
        await chrome.scripting.insertCSS({
          files: ["style.css"],
          target: { tabId: tab.id }
        });
        await chrome.scripting.executeScript({
          files: ["pieceMoves.js", "content.js"],
          target: { tabId: tab.id }
        });

      } else if (nextState === 'OFF') {
        await chrome.scripting.removeCSS({
          files: ["style.css"],
          target: { tabId: tab.id }
        });
        await chrome.scripting.removeScript({
          files: ["pieceMoves.js", "content.js"],
          target: { tabId: tab.id }
        });
      }
    }
  });

console.log("tes"); 