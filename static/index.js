const createPostButton = document.getElementById('createPostButton');
const modal = document.getElementById('createPostModal')
const createPostForm = document.getElementById('createPostForm')
const categorieError = document.getElementById('categorieError');
const notif = document.getElementById('notif')
const notifModal = document.getElementById('notifModal')
function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
    notifModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === modal || event.target === notifModal) {
        closeModal();
    } 
}

createPostButton.addEventListener('click',function (event) {
    event.preventDefault();
    openModal();
})

createPostForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const checkboxes = createPostForm.querySelectorAll('input[name="options"]:checked');
    if (checkboxes.length === 0) {
        categorieError.style.display = 'block';
        return; // Empêcher la soumission du formulaire
    } else {
        categorieError.style.display = 'none';
    }

    const data = getDataForm(createPostForm)

    console.log(data);
})

notif.addEventListener("click",(event)=>{
    notifModal.style.display = "block"
});


function getDataForm(form) {
    const dataForm = new FormData(form);
    const data = Object.fromEntries(dataForm.entries());

    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    data.options = Array.from(checkboxes).map(checkbox => checkbox.value);

    const fileInput = form.querySelector('input[type="file"]');
    if (fileInput.files.length > 0) {
        data.file = fileInput.files[0];
    }

    return data;
}