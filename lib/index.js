const batch = 247; // batch id

// creating dynanically the API URL
const baseUrl = `https://wagon-chat.herokuapp.com/${batch}/messages`;

// storing in constants all the needed elements
const form = document.getElementById('comment-form');
const name = document.getElementById('your-name');
const comment = document.getElementById('your-message');
const comments = document.querySelector('.list-unstyled');
const refresh = document.getElementById('refresh');

// storing in a constant the function to create a new message
const newMessage = () => {
  const newObject = {
    author: name.value,
    content: comment.value
  };
  return newObject;
};

// GET method to display the messages
const refreshChat = () => {
  fetch(baseUrl)
    .then(response => response.json())
    .then((json) => {
      const data = json;
      // cleaning the messages before reloading the new content
      comments.innerHTML = "";
    // Starting the loop to display messages
      data.messages.forEach((message) => {
        // calculating the time between the creation of the post and the refresh based on what's available in the JSON
        const minutesAgo = Math.round((new Date() - new Date(message.created_at)) / 60000);
        // Inserting the messages
        const msgElement = `<li>${message.content} (posted <span class="date">${minutesAgo} minutes</span> ago) by ${message.author}</li>`;
        comments.insertAdjacentHTML("afterbegin", msgElement);
      });
    });
};

// POST method to post new messages on the board
const postMessage = (message, callback) => {
  fetch(baseUrl, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message)
  }).then(response => response.json())
    .then((json) => {
    // callback to display updated content once you added a message
      callback();
    });
};

// binding the POST method to an event listener
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = newMessage();
  postMessage(data, refreshChat);
});

// manual refresh of the page if needed
refresh.addEventListener('click', refreshChat);

// fetching new messages every 2 seconds
setInterval(refreshChat(), 2000);


// IMPLEMENTING THE SAME METHOD BUT WITH STATIC CONTENT
// DIFFICULTY WAS TO CALCULATE THE AGE OF THE POST
// I USED A DATA ATTRIBUTE

// form.addEventListener('submit', (event) => {

// --> preventing default behaviour of the submit button i.e. reloading the page
//   event.preventDefault();


// --> storing in constant the needed variable
//   const post = newMessage();
//   const postTime = new Date().getTime();
//   const spans = document.querySelectorAll('.date');

// --> First, iterating through all the spans since they display the age of the post in minutes. 
// --> This is to update the age before inserting the new post
//   spans.forEach((span) => {

// --> retrieving the creation date stored in the data attribute at the creation of the post. 
// --> Since it's a string needed to use parseInt.
//     const oldDate = parseInt(span.getAttribute('data-id'), 10);

// --> changing the content of the span for the right age through calculation. Had to use Math.round.
//     span.innerText = `${Math.round((postTime - oldDate) / 60000)} minutes ago`;
//   });

// --> adding the age of the created post in the data-attribute data-id and injecting it in the DOM
//   const msgElement = `
//       <li>${post.content} (posted <span class="date" data-id="${postTime}">
//       0 minutes ago</span>) by ${post.author}</li>`;
//   comments.insertAdjacentHTML('afterbegin', msgElement);
// });
