// const { response } = require('express');
const x = document.getElementById('snackbar');

const newFormHandler = async function (event) {
  event.preventDefault();
  const comment = document.querySelector('#comment-input').value;
  const post_id = event.target.getAttribute('data-id');

  if (comment && post_id) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ comment, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (response.ok) {
    location.reload();
  } else {
    x.innerHTML = 'Comment failed to post.';
    x.className = 'show';

    setTimeout(function () {
      x.className = x.className.replace('show', '');
      x.innerHTML = '';
    }, 3000);
  }
};

if (document.querySelector('.comment-message')) {
  document.querySelector('.comment-message').addEventListener('submit', newFormHandler);
}
