async function editFormHandler(event) {
  event.preventDefault();

  const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title
      }),
      headers: {
        'Content-Type': 'application/json'
      }
  });

  if (response.ok) {s
      document.location.replace('/dashboard/');
  } else {
      alert(response.statusText);
  }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
  