const batch = 247; // change to your own batch id
const baseUrl = `https://wagon-chat.herokuapp.com/${batch}/messages`;

const form = document.getElementById('comment-form');
const name = document.getElementById('your-name');
const comment = document.getElementById('your-message');
const comments = document.querySelector('.list-unstyled');
const refresh = document.getElementById('refresh');

const newMessage = () => {
  const newObject = {
    author: name.value,
    content: comment.value
  };
  return newObject;
};

const refreshChat = () => {
  fetch(baseUrl)
    .then(response => response.json())
    .then((json) => {
      const data = json;
      comments.innerHTML = "";
      data.messages.forEach((message) => {
        const minutesAgo = Math.round((new Date() - new Date(message.created_at)) / 60000);
        const msgElement = `<li>${message.content} (posted <span class="date">${minutesAgo} minutes</span> ago) by ${message.author}</li>`;
        comments.insertAdjacentHTML("afterbegin", msgElement);
      });
    });
};

const postMessage = (message, callback) => {
  fetch(baseUrl, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  }).then(response => response.json())
    .then((json) => {
      callback();
    });
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = newMessage();
  postMessage(data, refreshChat);
});

refresh.addEventListener('click', refreshChat);


setInterval(refreshChat(), 2000);


// To implement the time when not fetching data from an API using data-set

// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const post = newMessage();
//   const postTime = new Date().getTime();
//   const spans = document.querySelectorAll('.date');
//   spans.forEach((span) => {
//     const oldDate = parseInt(span.getAttribute('data-id'), 10);
//     span.innerText = `${Math.round((postTime - oldDate) / 60000)} minutes ago`;
//   });
//   const msgElement = `
//       <li>${post.content} (posted <span class="date" data-id="${postTime}">
//       0 minutes ago</span>) by ${post.author}</li>`;
//   comments.insertAdjacentHTML('afterbegin', msgElement);
// });
