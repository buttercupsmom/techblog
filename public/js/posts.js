const newFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('#comment-desc').value;
  const post_id = event.target.getAttribute('data-id');

  if (title) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ title, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      location.reload();
    } else {
      alert('Failed to create post.');
    }
  }
};

document.querySelector('.new-comment-form').addEventListener('submit', newFormHandler);
