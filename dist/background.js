chrome.commands.onCommand.addListener((shortcut) => {
  console.log("reloading");

  if (shortcut.includes("+Q")) {
    console.log("re");
    chrome.runtime.reload();
  }
});
