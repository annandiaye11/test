const modalCreatePost = document.getElementById('createPostModal');
const modalChat = document.getElementById('chatModal');
const categorieError = document.getElementById('categorieError');
const notif = document.getElementById('notif');
const notifModal = document.getElementById('notifModal');
var postRow = document.getElementsByClassName('postRow');

addListenerToUpCollection(postRow, 'click')

addListenerToDownCollection(postRow, 'click')

function openModal() {
    modalCreatePost.style.display = 'block';
}

function closeModal() {
    modalCreatePost.style.display = 'none';
    notifModal.style.display = 'none';
    console.log("cliccccckk");
}

window.onclick = function (event) {
    if (event.target === modalCreatePost || event.target === notif) {
        closeModal();
    }
}

createPostButton.addEventListener('click', function (event) {
    event.preventDefault();
    openCreatePostModal();
})

const createPostForm = document.getElementById('createPostForm')
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

notif.addEventListener("click", (event) => {
    notifModal.style.display = "block"
});


// ********************************************************************************************
function addListenerToUpCollection(collection, action) {
    for (let i = 0; i < collection.length; i++) {

        const upDiv = collection[i].getElementsByClassName('upDiv')[0]
        const downDiv = collection[i].getElementsByClassName('downDiv')[0]
        

        const imgUp = upDiv.getElementsByTagName('img')[0]
        const imgDown = downDiv.getElementsByTagName('img')[0]

        const p = upDiv.getElementsByTagName('p')[0]
        imgUp.addEventListener(action, (event) => {
            if (imgUp.src.includes("thumbs-up.svg")) {

                if (imgDown.src.includes("thumbs-down.svg")) {
                    imgUp.src = "./static/images/thumbs-up-green.svg";
                    const count = parseInt(upDiv.textContent.trim()) || 0;
                    p.textContent = count + 1;
                }

            } else {
                imgUp.src = "./static/images/thumbs-up.svg";
                const count = parseInt(upDiv.textContent.trim()) || 0;
                p.textContent = count - 1;
            }
        });

    }
}

function addListenerToDownCollection(collection, action) {
    for (let i = 0; i < collection.length; i++) {
        const divUp = collection[i].getElementsByClassName('upDiv')[0];
        const divDown = collection[i].getElementsByClassName('downDiv')[0];
        const imgUp = divUp.getElementsByTagName('img')[0];
        const imgDown = divDown.getElementsByTagName('img')[0];
        const p = divDown.getElementsByTagName('p')[0];
        imgDown.addEventListener(action, (event) => {
            if (imgDown.src.includes("thumbs-down.svg")) {
                if (imgUp.src.includes("thumbs-up.svg")){
                    imgDown.src = "./static/images/thumbs-down-green.svg";
                    const count = parseInt(divDown.textContent.trim()) || 0;
                    p.textContent = count + 1;
                }
            } else {
                imgDown.src = "./static/images/thumbs-down.svg";
                const count = parseInt(divDown.textContent.trim()) || 0;
                p.textContent = count - 1;
            }
        });

    }
}

window.onclick = function (event) {
    if (event.target === modalCreatePost) {
        closeCreatePostModal();
    }
}

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

function openCreatePostModal() {
    modalCreatePost.style.display = 'block';
}

function closeCreatePostModal() {
    modalCreatePost.style.display = 'none';
}

function openCModal(params) {

}