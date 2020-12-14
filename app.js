let myLibrary = [];

function Book(title, author, pages, status, cover, accent, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.cover = cover;
  this.accent = accent;
  this.id = id;
}
const newBookForm = document.querySelector(".new-book");
const submit = document.getElementById("submit-book");
submit.addEventListener("click", () => {
  if (validateForm()) {
    const book = addBookToLibrary();
    displayBook(book);
  }
});
function addBookToLibrary() {
  const bookTitle = newBookForm.querySelector("input[name = book-title]").value;
  const bookAuthor = newBookForm.querySelector("input[name = author]").value;
  const bookPages = newBookForm.querySelector("input[name = pages-read]").value;
  let bookStatus;
  const readRadio = newBookForm.querySelectorAll("input[name = read]");
  for (i = 0; i < readRadio.length; i++) {
    if (readRadio[i].checked) bookStatus = readRadio[i].value;
  }
  let bookCover;
  const coverRadio = newBookForm.querySelectorAll("input[name = cover-color]");
  for (i = 0; i < coverRadio.length; i++) {
    if (coverRadio[i].checked) bookCover = coverRadio[i].value;
  }
  let bookAccent;
  const accentRadio = newBookForm.querySelectorAll(
    "input[name = accent-color]"
  );
  for (i = 0; i < accentRadio.length; i++) {
    if (accentRadio[i].checked) bookAccent = accentRadio[i].value;
  }

  let id;
  if (myLibrary.length === 0) {
    id = 0;
  } else {
    id = +myLibrary[myLibrary.length - 1].id + 1;
  }

  const newBook = new Book(
    bookTitle,
    bookAuthor,
    bookPages,
    bookStatus,
    bookCover,
    bookAccent,
    id
  );

  myLibrary.push(newBook);
  return newBook;
}

for (i = 0; i < myLibrary.length; i++) {
  displayBook(myLibrary[i]);
}

const bookStatusArr = [
  "currently reading",
  "haven't started",
  "wishlist",
  "finished",
];
const coverRadios = newBookForm.querySelectorAll("input[name=cover-color]");
const accentRadios = newBookForm.querySelectorAll("input[name=accent-color]");
let j = 0;
for (let i = 0; i < 2; i++) {
  for (let n = 0; n < bookStatusArr.length; n++) {
    const sampleBook = new Book(
      `sample book`,
      `sample author`,
      `${Math.floor(Math.random() * 5000)}`,
      bookStatusArr[n],
      `${coverRadios[Math.floor(Math.random() * 2)].value}`,
      `${accentRadios[Math.floor(Math.random() * 5)].value}`,
      `${j++}`
    );
    myLibrary.push(sampleBook);
    displayBook(sampleBook);
  }
}

function displayBook(a) {
  const section = document.querySelector(`.section[data-name = "${a.status}"]`);
  const bookContainer = section.querySelector(".book-ctn");
  const bookWrapper = document.createElement("div");
  const bookDisplay = document.createElement("div");

  bookWrapper.classList.add("book-wrapper");
  bookWrapper.setAttribute("draggable", "true");
  bookWrapper.dataset.status = a.status;
  bookWrapper.id = a.id;
  bookWrapper.addEventListener("dragstart", onDragStart);

  const bulkUpdateCheck = document.createElement("input");
  bulkUpdateCheck.type = "checkbox";
  bulkUpdateCheck.value = a.id;
  bulkUpdateCheck.name = "bulk-update";
  bulkUpdateCheck.classList.add("bulk-update-check", "drawn-border");
  bookWrapper.appendChild(bulkUpdateCheck);

  bookDisplay.classList.add("book-display", "drawn-border");
  bookDisplay.style.backgroundColor = `${a.cover}`;
  if (a.cover === "#2C514C") bookDisplay.style.color = "white";
  bookWrapper.appendChild(bookDisplay);

  const firstPage = document.createElement("div");
  firstPage.classList.add("first-page");

  function displayFirstPage() {
    const bookDisplayTitle = document.createElement("p");
    bookDisplayTitle.classList.add("book-display-title");
    bookDisplayTitle.innerHTML = `<span>${a.title}</span>`;
    bookDisplayTitle.style.borderLeft = `5px solid ${a.accent}`;

    const bookDisplayAuthor = document.createElement("p");
    bookDisplayAuthor.classList.add("book-display-author");
    bookDisplayAuthor.innerHTML = `<span>${a.author}</span>`;

    return [bookDisplayTitle, bookDisplayAuthor];
  }

  const firstPageContents = displayFirstPage();

  firstPage.appendChild(firstPageContents[0]);
  firstPage.appendChild(firstPageContents[1]);

  function createRemoveBtn() {
    const removeBookBtn = document.createElement("div");
    removeBookBtn.classList.add("remove-book-btn", "drawn-border", "inactive");
    removeBookBtn.textContent = "remove book";
    removeBookBtn.dataset.id = a.id;
    const currentBook = removeBookBtn.dataset.id;

    removeBookBtn.addEventListener("click", () => {
      removeBook(currentBook);
    });

    function removeBook(book) {
      const removeBookPopUp = document.querySelector(".pop-up");
      removeBookPopUp.classList.remove("inactive");

      const yesBtn = removeBookPopUp.querySelector(".yes-btn");
      const noBtn = removeBookPopUp.querySelector(".no-btn");

      yesBtn.addEventListener("click", () => {
        myLibrary.splice(whereIsBook(book), 1);
        if (book === bookWrapper.id) bookWrapper.remove();
        removeBookPopUp.classList.add("inactive");
      });

      noBtn.addEventListener("click", () => {
        removeBookPopUp.classList.add("inactive");
      });
    }

    return removeBookBtn;
  }
  const removeBookBtn = createRemoveBtn();
  bookWrapper.appendChild(removeBookBtn);

  const secondPage = document.createElement("div");
  secondPage.classList.add("second-page");
  if (a.cover === "#FFF") {
    secondPage.style.borderLeft = "1px solid var(--main-font)";
  } else {
    secondPage.style.borderLeft = "1px solid white";
  }

  function displayPages() {
    const bookDisplayPages = document.createElement("div");
    bookDisplayPages.classList.add("book-display-pages");
    bookDisplayPages.textContent = `Pages read: `;
    const bookDisplayPagesNum = document.createElement("p");
    bookDisplayPagesNum.classList.add("book-display-pages-num");
    bookDisplayPagesNum.innerHTML = `<span>${a.pages}</span>`;
    bookDisplayPages.appendChild(bookDisplayPagesNum);

    return bookDisplayPages;
  }
  const bookDisplayPages = displayPages();

  function displayCoverColor() {
    const coverRadio = newBookForm.querySelector("#cover-color");
    const bookDisplayCover = coverRadio.cloneNode(true);
    const bookDisplayCoverText = bookDisplayCover.children[0];
    const bookDisplayCoverLabel = bookDisplayCover.querySelectorAll("label");
    for (i = 0; i < bookDisplayCoverLabel.length; i++) {
      const bookDisplayCoverName = bookDisplayCoverLabel[i].querySelector(
        "span"
      );
      bookDisplayCoverName.style.display = "none";
    }

    const bookDisplayCoverInput = bookDisplayCover.querySelectorAll("input");
    for (i = 0; i < bookDisplayCoverInput.length; i++) {
      if (a.cover === bookDisplayCoverInput[i].value)
        bookDisplayCoverInput[i].checked = true;
      bookDisplayCoverInput[i].name = `cover-color[${a.id}]`;
    }

    bookDisplayCoverText.textContent = "Your cover:";
    bookDisplayCover.classList.add("book-display-cover");

    return bookDisplayCover;
  }
  const bookDisplayCover = displayCoverColor();

  function displayAccentColor() {
    const accentRadio = newBookForm.querySelector("#accent-color");
    const bookDisplayAccent = accentRadio.cloneNode(true);
    const bookDisplayAccentText = bookDisplayAccent.children[0];
    const bookDisplayAccentLabel = bookDisplayAccent.querySelectorAll("label");
    for (i = 0; i < bookDisplayAccentLabel.length; i++) {
      const bookDisplayAccentName = bookDisplayAccentLabel[i].querySelector(
        "span"
      );
      bookDisplayAccentName.style.display = "none";
    }

    const bookDisplayAccentInput = bookDisplayAccent.querySelectorAll("input");
    for (i = 0; i < bookDisplayAccentInput.length; i++) {
      if (a.accent === bookDisplayAccentInput[i].value)
        bookDisplayAccentInput[i].checked = true;
      bookDisplayAccentInput[i].name = `accent-color[${a.id}]`;
    }

    bookDisplayAccentText.textContent = "Your accent:";
    bookDisplayAccent.classList.add("book-display-accent");

    return bookDisplayAccent;
  }

  const bookDisplayAccent = displayAccentColor();

  secondPage.appendChild(bookDisplayPages);
  secondPage.appendChild(bookDisplayCover);
  secondPage.appendChild(bookDisplayAccent);

  (function changeColor() {
    const coverDisplayRadio = secondPage.querySelectorAll(
      `input[name="cover-color[${a.id}]"]`
    );
    coverDisplayRadio.forEach((radio) =>
      radio.addEventListener("change", (e) => {
        bookDisplay.style.backgroundColor = e.target.value;
        if (e.target.value === "#2C514C") {
          secondPage.style.borderLeft = "1px solid white";
          bookDisplay.style.color = "white";
        } else {
          secondPage.style.borderLeft = "1px solid var(--main-font)";
          bookDisplay.style.color = "#2C514C";
        }
      })
    );

    const accentDisplayRadio = secondPage.querySelectorAll(
      `input[name="accent-color[${a.id}]"]`
    );
    accentDisplayRadio.forEach((radio) =>
      radio.addEventListener("change", (e) => {
        const bookDisplayTitle = firstPage.querySelector(".book-display-title");
        bookDisplayTitle.style.borderLeft = `5px solid ${e.target.value}`;
      })
    );
  })();

  (function editBookColor() {
    const radioBtns = secondPage.querySelectorAll("input[type=radio]");
    radioBtns.forEach((btn) =>
      btn.addEventListener("change", (e) => {
        e.target.name.includes("accent")
          ? (myLibrary[whereIsBook(a.id)].accent = e.target.value)
          : (myLibrary[whereIsBook(a.id)].cover = e.target.value);
      })
    );
  })();

  (function openBookDisplay() {
    firstPage.addEventListener("click", () => {
      if (!bookDisplay.classList.contains("book-display-update")) {
        bookWrapper.style.transform = "translateY(-1rem)";
        bookWrapper.setAttribute("draggable", "false");
        bookDisplay.classList.add("book-display-update");
        firstPageContents[0].setAttribute("contenteditable", "true");
        firstPageContents[1].setAttribute("contenteditable", "true");
        bookDisplayPages.firstElementChild.setAttribute(
          "contenteditable",
          "true"
        );
        secondPage.style.opacity = "1";
        exitBtn.classList.remove("inactive");
        removeBookBtn.classList.remove("inactive");

        editBookText();
      }
    });
  })();

  function editBookText() {
    const contentEditable = bookDisplay.querySelectorAll(
      "[contenteditable=true]"
    );
    contentEditable.forEach((p) =>
      p.addEventListener("input", () => {
        switch (p.classList.value) {
          case "book-display-title":
            myLibrary[whereIsBook(a.id)].title = p.textContent;
            break;
          case "book-display-author":
            myLibrary[whereIsBook(a.id)].author = p.textContent;
            break;
          case "book-display-pages-num":
            myLibrary[whereIsBook(a.id)].pages = p.textContent;
        }
      })
    );
  }

  const exitBtn = document.createElement("div");
  exitBtn.classList.add("exit", "drawn-border", "inactive");
  exitBtn.textContent = "X";
  bookWrapper.appendChild(exitBtn);
  exitBtn.addEventListener("click", closeBookDisplay);

  function closeBookDisplay() {
    bookWrapper.style.transform = "translateY(0)";
    bookWrapper.setAttribute("draggable", "true");
    bookDisplay.classList.remove("book-display-update");
    secondPage.style.opacity = "0";
    firstPageContents[0].setAttribute("contenteditable", "false");
    firstPageContents[1].setAttribute("contenteditable", "false");
    bookDisplayPages.firstElementChild.setAttribute("contenteditable", "false");
    exitBtn.classList.add("inactive");
    removeBookBtn.classList.add("inactive");
  }

  bookDisplay.appendChild(firstPage);
  bookDisplay.appendChild(secondPage);

  bookContainer.prepend(bookWrapper);
}
const whereIsBook = (bookId) => {
  for (i = 0; i < myLibrary.length; i++)
    if (bookId == myLibrary[i].id) return i;
};

function onDragStart(event) {
  let obj = { id: event.target.id, dataset: event.target.dataset.status };
  event.dataTransfer.setData("text/plain", JSON.stringify(obj));
}
function onDragEnter(event) {
  event.preventDefault();
  const section = appendSection(event);
  section.classList.add("drag-over");
}
function onDragLeave(event) {
  const section = appendSection(event);
  section.classList.remove("drag-over");
}
function onDragOver(event) {
  event.preventDefault();
  const section = appendSection(event);
  section.classList.add("drag-over");
}
function onDrop(event) {
  event.preventDefault();

  const section = appendSection(event);
  section.classList.remove("drag-over");

  const objStr = event.dataTransfer.getData("text/plain");
  const obj = JSON.parse(objStr);
  const draggableElement = document.getElementById(obj.id);
  let dropzone = event.target;

  let i = 0;
  while (!dropzone.getAttribute("ondrop") && i < 7) {
    dropzone = dropzone.parentElement;
    i++;
  }
  if (obj.dataset == dropzone.dataset.status) return false;

  dropzone.prepend(draggableElement);
  myLibrary[whereIsBook(obj.id)].status = dropzone.dataset.status;
}
function appendSection(event) {
  let section = event.target;
  let i = 0;
  while (!section.getAttribute("data-name") && i < 10) {
    section = section.parentElement;
    i++;
  }
  return section;
}
const addNewBtn = document.querySelectorAll(".add-new-btn");
const modal = document.querySelector(".modal");
addNewBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.style.cssText = "display: grid; place-items: center;";
  });
});
addNewBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const sectionTitle = btn.previousElementSibling;
    const readRadio = newBookForm.querySelectorAll("input[name = read]");
    for (i = 0; i < readRadio.length; i++) {
      if (readRadio[i].value === sectionTitle.textContent)
        return (readRadio[i].checked = true);
    }
  });
});

const modalBulk = document.querySelector(".modal-bulk");
const bulkEditForm = document.querySelector("form[name=bulk-update]");

function showBulkForm() {
  modalBulk.style.cssText = "display: grid; place-items: center;";
}
function bulkUpdate() {
  let checkedBooks = [];
  const bulkUpdateChecked = document.querySelectorAll(
    "input[name=bulk-update]:checked"
  );

  for (i = 0; i < bulkUpdateChecked.length; i++) {
    checkedBooks.push(bulkUpdateChecked[i].value);
    bookWrapper = document.getElementById(bulkUpdateChecked[i].value);
    bookWrapper.remove();
  }

  const bookTitle = bulkEditForm.querySelector("input[name = book-title]")
    .value;
  const bookAuthor = bulkEditForm.querySelector("input[name = author]").value;
  const bookPages = bulkEditForm.querySelector("input[name = pages-read]")
    .value;
  let bookStatus;
  const readRadio = bulkEditForm.querySelectorAll("input[name = read]");
  for (i = 0; i < readRadio.length; i++) {
    if (readRadio[i].checked) bookStatus = readRadio[i].value;
  }
  let bookCover;
  const coverRadio = bulkEditForm.querySelectorAll("input[name = cover-color]");
  for (i = 0; i < coverRadio.length; i++) {
    if (coverRadio[i].checked) bookCover = coverRadio[i].value;
  }
  let bookAccent;
  const accentRadio = bulkEditForm.querySelectorAll(
    "input[name = accent-color]"
  );

  for (i = 0; i < accentRadio.length; i++) {
    if (accentRadio[i].checked) bookAccent = accentRadio[i].value;
  }

  for (n = 0; n < checkedBooks.length; n++) {
    const book = whereIsBook(checkedBooks[n]);
    if (bookTitle) myLibrary[book].title = bookTitle;
    if (bookAuthor) myLibrary[book].author = bookAuthor;
    if (bookPages) myLibrary[book].pages = bookPages;
    if (bookStatus) myLibrary[book].status = bookStatus;
    if (bookCover) myLibrary[book].cover = bookCover;
    if (bookAccent) myLibrary[book].accent = bookAccent;
    displayBook(myLibrary[book]);
  }
  modalBulk.style.display = "none";
  resetModalAndForm(modalBulk, "bulk-update");
}

const modalSequence = newBookForm.querySelectorAll(".modal-sequence");
const nextModalBtns = newBookForm.querySelectorAll(".next-modal");
let modalNumber = 0;
nextModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentModal = newBookForm.querySelectorAll(".modal-sequence")[
      modalNumber
    ];
    if (validateForm() === true) {
      if (btn.value === "Submit") {
        resetModalAndForm();
        return;
      }
      const nextModal = newBookForm.querySelectorAll(".modal-sequence")[
        ++modalNumber
      ];
      currentModal.classList.remove("active-modal");
      nextModal.classList.add("active-modal");
    } else {
      incompleteFields(currentModal);
    }
  });
});
const backModalBtns = newBookForm.querySelectorAll(".back-modal");
backModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentModal = newBookForm.querySelectorAll(".modal-sequence")[
      modalNumber
    ];
    const prevModal = newBookForm.querySelectorAll(".modal-sequence")[
      --modalNumber
    ];

    currentModal.classList.remove("active-modal");
    prevModal.classList.add("active-modal");
  });
});
function incompleteFields(modal) {
  modal.animate(
    [
      { transform: "rotate(0deg)" },
      { transform: "rotate(5deg)" },
      { transform: "rotate(0deg)" },
      { transform: "rotate(-5deg)" },
      { transform: "rotate(0deg)" },
    ],
    {
      duration: 100,
      iterations: 4,
    }
  );
}
function resetModal() {
  const activeModal = document.querySelector(".active-modal");
  activeModal.classList.remove("active-modal");
  const firstModal = document.getElementById("first-modal");
  firstModal.classList.add("active-modal");
  const invalids = activeModal.querySelectorAll(".invalid");
  invalids.forEach((field) => field.classList.remove("invalid"));
  modalNumber = 0;
}

window.onclick = function (e) {
  if (e.target == modal) {
    return resetModalAndForm(modal, "new-book");
  } else if (e.target == modalBulk) {
    return resetModalAndForm(modalBulk, "bulk-update");
  }
};
const exitBulk = bulkEditForm.querySelector(".exit");
exitBulk.addEventListener("click", function () {
  resetModalAndForm(modalBulk, "bulk-update");
});
const exitModal = newBookForm.querySelectorAll(".exit");
exitModal.forEach((btn) =>
  btn.addEventListener("click", function () {
    resetModalAndForm(modal, "new-book");
  })
);
function resetModalAndForm(popUp, formName) {
  popUp.style.display = "none";
  if (popUp === modal) resetModal();
  document.forms[formName].reset();
}

function validateForm() {
  if (validateRadio() && validateText()) return true;
}
function validateRadio() {
  let valid = true;
  let countChecked = 0;
  const setNames = new Set();
  const activeModal = document.querySelector(".active-modal");
  const radioBtns = activeModal.querySelectorAll("input[type=radio]");

  for (let i = 0; i < radioBtns.length; i++) {
    setNames.add(radioBtns[i].name);
    if (radioBtns[i].checked) countChecked++;
  }

  if (countChecked != setNames.size) valid = false;
  return valid;
}
function validateText() {
  let valid = true;
  const activeModal = document.querySelector(".active-modal");
  const textInputs = activeModal.querySelectorAll(
    "input[type=text], input[type=number]"
  );
  for (i = 0; i < textInputs.length; i++) {
    if (textInputs[i].hasAttribute("required")) {
      if (textInputs[i].type === "text" && !textInputs[i].value) {
        textInputs[i].classList.add("invalid");
        valid = false;
      }
    }
  }
  return valid;
}
