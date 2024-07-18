const modalCreatePost = document.getElementById("createPostModal");
const modalChat = document.getElementById("chatModal");
const categorieError = document.getElementById("categorieError");

const modalNotif = document.getElementById("notifModal");
var postRow = document.getElementsByClassName("postRow");

const commentModal = document.querySelector("#commentModal");

const Users = document.getElementsByClassName("user");
const messageBlock = document.getElementById("Message");
const allMessages = document.getElementById("MessageBlock");

let currentMessageBlock = null; 
let messageOffset = 10; 

// Fonction pour initialiser l'affichage des messages
function initializeMessages() {
  const messages = allMessages.children;
  for (let i = 0; i < messages.length - messageOffset; i++) {
    messages[i].style.display = "none";
  }
  allMessages.scrollTop = allMessages.scrollHeight;
}

// Fonction pour charger plus de messages
// function loadMoreMessages() {
//   const messages = allMessages.children;
//   let count = 0;
//   for (let i = messages.length - messageOffset - 1; i >= 0 && count < 10; i--) {
//     if (messages[i].style.display === "none") {
//       messages[i].style.display = "block";
//       count++;
//     }
//   }
//   messageOffset += count;

// }
let allMessagesLoaded = false;
function loadMoreMessages() {
  const messages = allMessages.children;
  let count = 0;
  let firstNewMessageIndex = null;

  if (messages.length === 0 || allMessagesLoaded) {
    return;
  }

  for (let i = messages.length - messageOffset - 1; i >= 0 && count < 10; i--) {
    if (messages[i].style.display === "none") {
      messages[i].style.display = "block";
      count++;
      if (firstNewMessageIndex === null) {
        firstNewMessageIndex = i;
      }
    }
  }

  messageOffset += count;

  if (messages.length - messageOffset <= 0) {
    allMessagesLoaded = true;
  }

  const targetIndex = messages.length - messageOffset + 5;
  if (targetIndex >= 0 && targetIndex < messages.length) {
    messages[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


// Fonction de throttle
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// initializeMessages();

// Écouteur d'événement pour le défilement
allMessages.addEventListener(
  "scroll",
  throttle(function () {
    if (allMessages.scrollTop === 0) {
      // console.log('tooooooooooop');
      loadMoreMessages();
    }
  }, 600)
);

addListenerToLike(postRow, "click");

addListenerToDislike(postRow, "click");

addListenerToUsers(Users, function (show) {
  messageBlock.style.display = show ? "block" : "none";
});

document.querySelectorAll(".shrink").forEach((el) => {
  el.addEventListener("click", (e) => {
    // Récupération du contenu du post
    let post = el.parentNode.parentNode;
    let author = post.querySelector(".user-profile p")?.textContent;
    let date = post.querySelector(".user-profile span")?.textContent;
    let content = post.querySelector(".postText")?.textContent;
    let categories = post.querySelector(".postCategories")?.textContent;
    let imageUrl = post.querySelector(".postImage")?.src;

    // Remplir les informations du modal
    document.querySelector("#comment-post-image").src = imageUrl;
    document.querySelector("#comment-post-author").textContent = author;
    document.querySelector("#comment-post-date").textContent = date;
    document.querySelector("#comment-post-categories").textContent = categories;
    document.querySelector("#comment-post-text").textContent = content;

    // Afficher le modal
    commentModal.style.display = "flex";
  });
});

const createPostButton = document.getElementById("createPostButton");
createPostButton.addEventListener("click", function (event) {
  event.preventDefault();
  openCreatePostModal();
});

const notif = document.getElementById("notif");
notif.addEventListener("click", (event) => {
  event.preventDefault();
  openNotifModal();
});

const createPostForm = document.getElementById("createPostForm");
createPostForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const checkboxes = createPostForm.querySelectorAll(
    'input[name="options"]:checked'
  );
  if (checkboxes.length === 0) {
    categorieError.style.display = "block";
    return; // Empêcher la soumission du formulaire
  } else {
    categorieError.style.display = "none";
  }

  const data = getDataForm(createPostForm);

  console.log(data);
});

window.onclick = function (event) {
  if (
    event.target === modalCreatePost ||
    event.target === modalNotif ||
    event.target === commentModal
  ) {
    closeModal(event.target);
  }
};

// ********************************************************************************************

function addListenerToLike(collection, action) {
  for (let i = 0; i < collection.length; i++) {
    const upDiv = collection[i].getElementsByClassName("upDiv")[0];
    const downDiv = collection[i].getElementsByClassName("downDiv")[0];

    const imgUp = upDiv.getElementsByTagName("img")[0];
    const imgDown = downDiv.getElementsByTagName("img")[0];

    const p = upDiv.getElementsByTagName("p")[0];
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
    collection[i].addEventListener("click", function () {
      const isAlreadySelected = collection[i].classList.contains("selected");
      for (let j = 0; j < collection.length; j++) {
        messageOffset = 10;
        initializeMessages();
        collection[j].classList.remove("selected");
      }

      if (isAlreadySelected) {
        // currentMessageBlock = collection[i];
        messageOffset = 10;
        initializeMessages();
        action(false);
      } else {
        collection[i].classList.add("selected");
        messageOffset = 10;
        initializeMessages();
        action(true);
      }
    });
  }
}

function addListenerToDislike(collection, action) {
  for (let i = 0; i < collection.length; i++) {
    const divUp = collection[i].getElementsByClassName("upDiv")[0];
    const divDown = collection[i].getElementsByClassName("downDiv")[0];
    const imgUp = divUp.getElementsByTagName("img")[0];
    const imgDown = divDown.getElementsByTagName("img")[0];
    const p = divDown.getElementsByTagName("p")[0];
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
  modalCreatePost.style.display = "block";
}

function closeModal(el) {
  el.style.display = "none";
}

function getDataForm(form) {
  const dataForm = new FormData(form);
  const data = Object.fromEntries(dataForm.entries());

  const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
  data.options = Array.from(checkboxes).map((checkbox) => checkbox.value);

  const fileInput = form.querySelector('input[type="file"]');
  if (fileInput.files.length > 0) {
    data.file = fileInput.files[0];
  }

  return data;
}
