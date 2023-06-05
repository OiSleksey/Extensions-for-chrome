let value = '';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message.method);
  switch (message.method) {
    case 'set':
      console.log(message.value);
      value = message.value;
      sendResponse({ value: null });
      break;
    case 'get':
      sendAfterSet();
      break;
    case 'clear':
      value = '';
      sendResponse({ value: null });
      break;
  }
  return true;

  async function sendAfterSet() {
    if (value != '') {
      sendResponse({ value: value });
      return;
    }
    console.log(value);
    await new Promise(s => setTimeout(s, 1000));
    console.log('sey promise');

    value = 'Error: Document information could not be obtained.';
  }
});
