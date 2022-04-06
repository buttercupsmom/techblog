const { response } = require('express');
const x = document.getElementById('snackbar');

const newFormHandler = async function (event) {
  event.preventDefault();
  const title = document.querySelector('#comment-input').value;
  const post_id = event.target.getAttribute('data-id');

  if (title && post_id) {
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({ title, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      location.reload();
    } else {
      let x = document.getElementById('snackbar');
      x.innerHTML = 'Comment failed to post.';
      x.className = 'show';

      setTimeout(function () {
        x.className = x.className.replace('show', '');
        x.innerHTML = '';
      }, 3000);
    }
  }
};
if (document.querySelector('.comment-message')) {
  document.querySelector('.comment-message').addEventListener('submit', newFormHandler);
}
