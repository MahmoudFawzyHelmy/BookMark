let bookMarkName = document.getElementById("bookMarkName");
let bookMarkUrl = document.getElementById("bookMarkUrl");
let mainBtn = document.getElementById("mainBtn");
let tableBody = document.getElementById("tableBody");
mainBtn.onclick = function () {
  if (mainBtn.innerHTMl == "Update BookMark") {
    finalUpdate();
  } else {
    mainBtn.innerHTML = "Add BookMark";
    addBookMark();
  }
};

let bookMarkArr;
(function () {
  if (localStorage.getItem("bookmark") === null) {
    bookMarkArr = [];
  } else {
    bookMarkArr = JSON.parse(localStorage.getItem("bookmark"));
    display(bookMarkArr);
  }
})();

function addBookMark() {
  if (nameRgx() == true && urlRgx() == true) {
    let bookMarks = {
      markedName: bookMarkName.value,
      markedLink: bookMarkUrl.value,
    };
    bookMarkArr.push(bookMarks);
    localStorage.setItem("bookmark", JSON.stringify(bookMarkArr));
    display(bookMarkArr);
  }
  clearData();
}

function display(arr) {
  let box = "";
  for (let i = 0; i < arr.length; i++) {
    box += `
    <tr>
    <td>${i + 1}</td>
    <td>${arr[i].markedName}</td>
    <td><a href="${
      arr[i].markedLink
    }" target="_blank"><button class="btn btn-info">Visit</button></a></td>
    <td><button class="btn btn-danger" onclick="deleteBookMark(${i})">Delete</button></td>
    <td><button class="btn btn-info" onclick="updateBookMark(${i})">Update</button></td>
    </tr>
    `;
  }
  tableBody.innerHTML = box;
}
function clearData() {
  bookMarkName.value = "";
  bookMarkUrl.value = "";
}
function deleteBookMark(index) {
  bookMarkArr.splice(index, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookMarkArr));
  display(bookMarkArr);
}
let globalIndex;
function updateBookMark(index) {
  globalIndex = index;
  bookMarkName.value = bookMarkArr[index].markedName;
  bookMarkUrl.value = bookMarkArr[index].markedLink;
  mainBtn.innerHTML = "Update BookMark";
}
function finalUpdate() {
  bookMarkArr[globalIndex].markedName = bookMarkName.value;
  bookMarkArr[globalIndex].markedLink = bookMarkUrl.value;
  display();
}
function search(e) {
  let serached = [];
  for (let i = 0; i < bookMarkArr.length; i++) {
    if (bookMarkArr[i].markedName.toLowerCase().includes(e.toLowerCase())) {
      serached.push(bookMarkArr[i]);
    }
  }
  display(serached);
}

function nameRgx() {
  let rgx = /[A-Za-z]/gi;
  if (rgx.test(bookMarkName.value) == true) {
    return true;
  } else {
    window.alert("Wrong Pttern");
    return false;
  }
}
function urlRgx() {
  let valid = /\w@\w.(com|net)/g;
  if (valid.test(bookMarkUrl.value) == true) {
    return true;
  } else {
    window.alert("Wrong Pttern");
    return false;
  }
}
