const editTitle = document.querySelector('#edit-post-title');
const editPost = document.querySelector('#edit-post-content');
const updateButton = document.querySelector('#update-button');
const deleteButton = document.querySelector('#delete-button');

updateButton.addEventListener('click', async (event) => {
    event.preventDefault();
    // console.log(updateButton.getAttribute('data-id'))
    if (editTitle.value && editPost.value) {
        const response = await fetch('/api/blog/edit', {
            method: 'PUT',
            body: JSON.stringify({
                id: updateButton.getAttribute('data-id'),
                post_name: editTitle.value,
                post_content: editPost.value,
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            alert('Post saved!');
        }
        else {
            alert(response.statusText);
        }
    } else {
        alert('No data to update!')
    };
});

deleteButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const confirm = window.confirm("Are you sure you want to delete?")
    if (confirm) {
        const response = await fetch(`/api/blog/delete/${updateButton.getAttribute('data-id')}`, {
            method: 'DELETE',
        })
        if (response.ok) {
            alert('Post deleted!');
            location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    }
});