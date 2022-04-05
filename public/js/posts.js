const { response } = require('express');

const newFormHandler = async function (event) {
  event.preventDefault();
  const comment = document.querySelector('#comment-input').value;
  const post_id = event.target.getAttribute('data-id');

  if (comment && post_id) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  document.location.replace('/');
};

document.querySelector('.comment-message').addEventListener('submit', newFormHandler);
