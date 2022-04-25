const newFormHandler = async function (event) {
  event.preventDefault();
  const title = document.querySelector('#comment-desc').value;
  const post_id = document.querySelector('input[name="post_id"]').value;
  console.log(title, post_id);
  if (title) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ title, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      alert('success');
      location.reload();
    } else {
      alert('Failed to create post.');
    }
  }
};

const deleteComment = async function (event) {
  event.preventDefault();
  const deleteButton = document.querySelector('#deleteComment').dataset.action;
  console.log(deleteButton);
};

document.querySelector('.new-comment-form').addEventListener('submit', newFormHandler);

document.querySelector('.delete-comment-form'), addEventListener('submit', deleteComment);
