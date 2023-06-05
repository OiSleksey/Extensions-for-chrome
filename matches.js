const allCodeHtml = `
  <style>
      * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, Helvetica, sans-serif;
    }

    .chat-box {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      display: flex;
      align-items: center;
    }

    .message {
      background-color: #08c;
      margin-right: 10px;
      border: 1px solid #ccc;
      border-radius: 20px;
      padding: 10px 20px;
      position: relative;
    }

    .hidden {
      display: none;
    }

    .message__textarea {
      padding: 0;
      color: rgb(255, 255, 255);
      background-color: #08c;
      font-size: 16px;
    }

    .message__triangle {
      width: 20px;
      height: 20px;
      background-color: #08c;
      position: absolute;
      bottom: 5px;
      right: -11px;
      clip-path: polygon(0 0, 0% 100%, 100% 100%);
    }

    .btn-chat {
      background-color: #08c;
      padding: 10px 10px 7px 10px;
      border-radius: 20px;
    }

    .btn-chat::before {
      display: flex;
      justify-content: center;
      align-items: center;
      content: attr(data-count);
      color: rgb(255, 255, 255);
      position: absolute;
      right: -2px;
      top: -4px;
      background-color: red;
      padding: 1px 6px;
      border-radius: 50%;
    }

    .btn-chat__img {
      width: 30px;
    }

  </style>
  <div class="chat-box">
    <div class="message hidden">
      <textarea
        name="textarea"
        rows="1"
        cols="16"
        class="message__textarea"
        disabled
      >Мерщій питайте!
      </textarea>
      <div class="message__triangle"></div>
    </div>
    <div class="btn-chat" data-count="1">
      <img src="https://cdn-icons-png.flaticon.com/512/7781/7781489.png" alt="chat" class="btn-chat__img" />
    </div>
  </div>
`;

document.body.insertAdjacentHTML('beforeend', allCodeHtml);

const chatButton = document.querySelector('.btn-chat');
const chatBox = document.querySelector('.chat-box');
const messageBox = document.querySelector('.message');

let count = 1;
chatButton.addEventListener('click', function () {
  chatButton.dataset.count = count === 1 ? 0 : 1;
  count = count === 1 ? 0 : 1;
  messageBox.classList.toggle('hidden');
});
