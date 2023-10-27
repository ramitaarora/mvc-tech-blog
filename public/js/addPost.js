const newTitle = document.querySelector('#edit-post-title');
const newContent = document.querySelector('#edit-post-content');
const submitPost = document.querySelector('#submit-post-button');

submitPost.addEventListener('click', async(event) => {
    event.preventDefault();
    if (newTitle.value && newContent.value) {
        const response = await fetch('/api/blog/add', {
            method: 'POST',
            body: JSON.stringify({ 
                post_name: newTitle.value, 
                post_content: newContent.value,
            }),
            headers: { 'Content-Type': 'application/json' },
        })
        if (response.ok) {
            location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } else {
        alert('Missing title or post content!')
    }
})