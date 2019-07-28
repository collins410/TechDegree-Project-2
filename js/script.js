// Project 2
// List filter and pagination

// Declare global variables
const studentList = document.querySelectorAll('li');
const itemsPerPage = 10;
let noSearchValue = false;
let pageNumber = Math.ceil(studentList.length/itemsPerPage);
let newStudentArray = [];

// Change the display status of all students to hide them on the page
function removeContent (){
  for(i = 0; i < studentList.length; i++){
    studentList[i].style.display = "none";
  }
  if(noSearchValue) {
    let noSearchResults = document.getElementById("no_results");
    noSearchResults.parentNode.removeChild(noSearchResults);
    noSearchValue = false;
  }
}

// Show the specified number of students per page
function showPage (array, page) {
  let startIndex = (itemsPerPage * page) - itemsPerPage;
  let endIndex = itemsPerPage * page;
  if (((array.length / itemsPerPage) < page) && ((array.length / itemsPerPage) > 0)) {
    let endIndex = ((page * itemsPerPage) - ((1 - ((array.length / itemsPerPage) - Math.floor(array.length / itemsPerPage))) * 10));
    for (let i = startIndex; i < endIndex; i++) {
      array[i].style.display = "block";
    }
  } else {
    for (let i = startIndex; i < endIndex; i++) {
      studentList[i].style.display = "block";
    }
  }
}

//Handle the click event corresponding to the page number links
//Removes the "active" class name from all page  numbers then adds the
// active class to the clicked page number
function eventHandler(event){
  let page = parseInt(this.textContent);
  let pages = this.parentNode.childNodes;
  for(i = 0; i < pages.length; i++){
    pages[i].classList.remove('active');
  }
  this.setAttribute('class', 'active');
  if(newStudentArray.length > 0){
    removeContent();
    showPage(newStudentArray, page);
  } else {
    removeContent();
    showPage(studentList, page);
  }
}

// Add links after the list of students and incorporate formatting from css
// Add functionality to the links to change the students displayed on the page to correspond
// to the page clicked on
function appendPageLinks(num){
  let div = document.createElement('div');
  let ul = document.createElement('ul');
  document.getElementsByClassName('page').item(0).appendChild(div);
  div.appendChild(ul);
  div.setAttribute('id', 'pages');
  div.setAttribute('class', 'pagination');
  for (i = 1; i < num+1; i++) {
    let page = i;
    let a = document.createElement("a");
    let html = document.createTextNode(` ${page} `);
    let li = document.createElement("li");
    a.setAttribute("href", `#`);
    a.setAttribute('id', 'pageNumber');
    a.appendChild(html);
    li.appendChild(a);
    let pageLoc = document.getElementById('pages').firstChild;
    pageLoc.appendChild(li);
    li.addEventListener("click", eventHandler)
  }
}

function removePageLinks (){
  let li = document.getElementsByClassName('pagination').item(0).firstChild;
  //remove the page numbers at the bottom of the page
  li = li.childNodes;
  for(i = 0; i < li.length; i ++){
    li[i].style.display = "none";
  }
}

//Add search function
function addSearchBox(){
  let location = document.getElementsByClassName('cf').item(0);
  let input = document.createElement('input');
  let div = document.createElement('div');
  let button = document.createElement('button');
  location.appendChild(div);
  div.appendChild(input);
  div.setAttribute('class', 'student-search' );
  input.setAttribute('placeholder', 'Search for students...');
  input.setAttribute('type', 'text');
  input.setAttribute('onkeyup', 'search()');
  input.setAttribute('id', 'search-field');
  div.appendChild(button);
  button.innerHTML = "Search";
  button.addEventListener('click', search);
}

// Uses the input from the search box to display the corresponding students
function search () {
  removePageLinks();
  newStudentArray.length = 0;
  let field = document.getElementById('search-field');
  let input = field.value;
  let students = document.querySelectorAll('h3');
  for (let i = 0; i < students.length; i++) {
    let studentName = students[i];
    let text = studentName.innerText;
    if (text.includes(input) && (input.length > 0)) {
      newStudentArray.push(studentList[i]);
    }
  }
  // If there are no search results call the noResults function
  if ((newStudentArray.length < 1) && (input.length > 0)) {
    removeContent();
    noResults();
  } else if (input.length === 0){
    removeContent();
    showPage(studentList, 1);
    appendPageLinks(pageNumber);
  }else{
    removeContent();
    appendPageLinks(Math.ceil(newStudentArray.length/itemsPerPage));
    showPage(newStudentArray, 1);
  }
}

function noResults(){
  let location = document.getElementsByClassName('student-list').item(0);
  let h1 =  document.createElement('h1');
  h1.setAttribute('align', 'center');
  h1.setAttribute('id', 'no_results');
  h1.style.fontSize = "200%";
  if (!noSearchValue){
    noSearchValue = true;
    h1.innerHTML = "No Search Results";
    location.appendChild(h1);
  }
}

//Call the functions required to display the first page upon page load
removeContent();
showPage(studentList, 1);
appendPageLinks(pageNumber);
addSearchBox();
