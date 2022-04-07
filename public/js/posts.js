const newFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('#comment-input').value;
  const post_id = event.target.getAttribute('data-id');

  const response = await fetch(`/api/comment`, {
    method: 'POST',
    body: JSON.stringify({ title, post_id }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    location.reload();
  } else {
    alert('Failed to create post.');
  }
};

document.querySelector('.new-comment-form').addEventListener('submit', newFormHandler);
