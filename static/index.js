const modalCreatePost = document.getElementById('createPostModal');
const modalChat = document.getElementById('chatModal');
const categorieError = document.getElementById('categorieError');

const modalNotif = document.getElementById('notifModal');
var postRow = document.getElementsByClassName('postRow');

const Users = document.getElementsByClassName('user');
const messageBlock = document.getElementById('Message');



addListenerToLike(postRow, 'click')

addListenerToDislike(postRow, 'click')

addListenerToUsers(Users, function(show) {
    messageBlock.style.display = show ? "block" : "none";
});


const createPostButton = document.getElementById('createPostButton')
createPostButton.addEventListener('click', function (event) {
    event.preventDefault();
    openCreatePostModal();
})

const notif = document.getElementById('notif');
notif.addEventListener("click", (event) => {
    event.preventDefault();
    openNotifModal();
});

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


window.onclick = function (event) {
    if (event.target === modalCreatePost || event.target === modalNotif){
        closeModal();
    }
}

// ********************************************************************************************

function addListenerToLike(collection, action) {
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

function addListenerToUsers(collection, action) {
    for (let i = 0; i < collection.length; i++) {
        collection[i].addEventListener("click", function() {
            const isAlreadySelected = collection[i].classList.contains("selected");

            for (let j = 0; j < collection.length; j++) {
                collection[j].classList.remove("selected");
            }

            if (isAlreadySelected) {
                action(false);
            } else {
                collection[i].classList.add("selected");
                action(true);
            }
        });
    }
}






function addListenerToDislike(collection, action) {
    for (let i = 0; i < collection.length; i++) {
        const divUp = collection[i].getElementsByClassName('upDiv')[0];
        const divDown = collection[i].getElementsByClassName('downDiv')[0];
        const imgUp = divUp.getElementsByTagName('img')[0];
        const imgDown = divDown.getElementsByTagName('img')[0];
        const p = divDown.getElementsByTagName('p')[0];
        imgDown.addEventListener(action, (event) => {
            if (imgDown.src.includes("thumbs-down.svg")) {
                if (imgUp.src.includes("thumbs-up.svg")) {
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

// *******************************************************************************************

function openNotifModal() {
    modalNotif.style.display = "block";
}

function openCreatePostModal() {
    modalCreatePost.style.display = 'block';
}

function closeModal() {
    modalCreatePost.style.display = 'none';
    modalNotif.style.display = 'none';
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