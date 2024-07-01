const createPostButton = document.getElementById('createPostButton');
const modal = document.getElementById('createPostModal')

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

createPostButton.addEventListener('click', openModal)
