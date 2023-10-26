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
            alert('Error!')
        }
    } else {
        alert('No data to update!')
    };
})