
var siteNameInput = document.getElementById("bookmarkName");
var siteURLInput = document.getElementById("bookmarkURL");
var datawrapper = document.getElementById("tbody");
var searchinput = document.getElementById("search")
var allbookMarks = [];
var bookmarkupdated;

if(localStorage.allbookMarks !=null){
    allbookMarks = JSON.parse(localStorage.allbookMarks);
    displaydata(allbookMarks)
}

function addBookMark() {
    console.log("addBookMark");
    var newbookmark = {
        sitename : siteNameInput.value,
        siteurl : siteURLInput.value,
    }
    allbookMarks.push(newbookmark);
    localStorage.setItem("allbookmarks", JSON.stringify(allbookMarks));
    console.log(allbookMarks);
   displaydata(allbookMarks)
}

function displaydata(arr){

    var cartoona =""
    for(var i = 0 ; i < arr.length ; i++){
     cartoona+=`<tr>
     <td>${i +1}</td>
     <td>${arr[i].sitename}</td>
     <td><a class="btn btn-primary"href="${arr[i].siteurl}" target "_blank">visit</a></td>
     <td><button class="btn btn-success" onclick ="preupdate(${i})">update</button></td>
     <td><button class="btn btn-danger" onclick ="deletebookmark(${i})"> delete</button></td>
   </tr>
     `
    }
    datawrapper.innerHTML = cartoona;
}


function preupdate(index){
    bookmarkupdated = index ;
    siteNameInput.value =allbookMarks[index].sitename;
    siteURLInput.value = allbookMarks[index].siteurl;
    displayupdatebtn()
    console.log(bookmarkupdated);
}

function displayupdatebtn(arr){
document.getElementById("submitBtn").classList.replace("d-block", "d-none")
document.getElementById("updatebtn").classList.replace("d-none", "d-block")
}

function displaysubmitbtn(arr){
    document.getElementById("submitBtn").classList.replace("d-none", "d-block")
    document.getElementById("updatebtn").classList.replace("d-block", "d-none")
    }

function finalupdate(){
   var newbookmark = {
    sitename : siteNameInput.value,
    siteurl : siteURLInput.value,
   };
   allbookMarks.splice(bookmarkupdated ,1 ,newbookmark);
   localStorage.setItem("allbookmarks", JSON.stringify(allbookMarks));
   displaydata(allbookMarks);
   displaysubmitbtn();
    clearinput()

}
function visitWebsite(e) {
    var websiteIndex = e.target.dataset.index;
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarks[websiteIndex].siteURL)) {
      open(bookmarks[websiteIndex].siteURL);
    } else {
      open(`https://${bookmarks[websiteIndex].siteURL}`);
    }
  }

function deletebookmark(index){
    allbookMarks.splice(index,1);
    localStorage.setItem("allbookmarks", JSON.stringify(allbookMarks));
    displaydata(allbookMarks);


}

function clearinput(){
    siteNameInput.value = "";
    siteURLInput.value = "";

}

var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

sitename.addEventListener("input", function () {
  validate(sitename, nameRegex);
});

siteurl .addEventListener("input", function () {
  validate( siteurl , urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}