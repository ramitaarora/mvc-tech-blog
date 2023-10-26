const formSubmit = document.querySelector('#add-comment');
const commentBox = document.querySelector('#comment');

formSubmit.addEventListener('submit', async(event) => {
    event.preventDefault();
    // console.log(commentBox.value);
    if (commentBox.value) {
        const commentData = await fetch('/api/blog/comment', {
            method: 'POST',
            body: JSON.stringify({ 
                comment_content: commentBox.value, 
                post_id: (window.location.pathname).slice(-1),
            }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (commentData) {
            location.reload()
        } else {
            alert('Error saving comment!')
        }
    } else {
        alert('Error saving comment!');
    }
});