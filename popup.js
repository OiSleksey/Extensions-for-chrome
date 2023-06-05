const bootstrapHas = document.querySelector('.bootstrap-has__text-btn');
const jqueryHas = document.querySelector('.jquery-has__text-btn');
const headerHas = document.querySelector('.header-has__text-btn');
const cross = 'img/cross.png';
const tick = 'img/tick.png';

const setImgInBootsrap = data => {
  const bootstrapImg = document.querySelector('.bootstrap-has__img');
  if (data.classRow && data.hrefLink) {
    bootstrapImg.src = tick;
  } else {
    bootstrapImg.src = cross;
  }
};

const setImgInJquery = data => {
  const jqueryImg = document.querySelector('.jquery-has__img');
  if (data.examination) {
    jqueryImg.src = tick;
  } else {
    jqueryImg.src = cross;
  }
};

const setImgInHeader = data => {
  const headerImg = document.querySelector('.header-has__img');
  if (data.examination) {
    headerImg.src = tick;
  } else {
    headerImg.src = cross;
  }
};

const getDocumentBootstrap = () => {
  const classRow = document.querySelector('.row');
  const hrefLink = document.querySelector('link[href*="bootstrap"]');
  const message = {
    classRow,
    hrefLink,
  };
  chrome.runtime.sendMessage(
    { method: 'set', value: JSON.stringify(message) },
    () => {}
  );
};

const getDocumentJquery = () => {
  const examination = document.querySelector('link[href*="jquery"]');
  const message = {
    examination,
  };
  chrome.runtime.sendMessage(
    { method: 'set', value: JSON.stringify(message) },
    () => {}
  );
};

const getDocumentHeader = () => {
  const h1Elements = document.getElementsByTagName('h1');
  const examination = h1Elements.length > 0;
  const message = {
    examination,
  };
  chrome.runtime.sendMessage(
    { method: 'set', value: JSON.stringify(message) },
    () => {}
  );
};

const onClickQuestion = (nameFunctionInput, nameFunctionOutput) => {
  chrome.runtime.sendMessage({ method: 'clear' }, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: nameFunctionInput,
        },
        () => {
          if (chrome.runtime.lastError) {
            console.log('error');
          } else {
            chrome.runtime.sendMessage({ method: 'get' }, response => {
              const params = JSON.parse(response.value);
              nameFunctionOutput(params);
            });
          }
        }
      );
    });
  });
};

bootstrapHas.addEventListener('click', () => {
  onClickQuestion(getDocumentBootstrap, setImgInBootsrap);
});

jqueryHas.addEventListener('click', () => {
  onClickQuestion(getDocumentJquery, setImgInJquery);
});

headerHas.addEventListener('click', () => {
  onClickQuestion(getDocumentHeader, setImgInHeader);
});
