"use strict";
//OPEN OR CLOSE SIDEBAR
function openCloseSideBar(){
let widthOfSideBar = $(".left").innerWidth();
let leftsideBarContent = $(".left li");
let TimeToOpen = 700;

if($("#OpenCloseIcon").attr("class") == "fas fa-bars"){
    $("#btnOpen").find("i").addClass("fa-solid fa-xmark").removeClass("fas fa-bars");
    $(".left").animate({"left":"0px"},1000);
    $(".right").animate({"left":`${widthOfSideBar}px`},1000);

    for(let i=0; i<= leftsideBarContent.length ;i++){
        leftsideBarContent.eq(i).animate({"opacity":"1","top":"0"},TimeToOpen);
        TimeToOpen += 300;
    }
}else{
    $("#btnOpen").find("i").addClass("fas fa-bars").removeClass("fa-solid fa-xmark");
    $(".left").animate({"left":`-${widthOfSideBar}px`},1000);
    $(".right").animate({"left":"0"},1000,function(){
    leftsideBarContent.animate({"opacity":"0","top":"300px"},1000)});
}
}
$('#btnOpen').click(openCloseSideBar);

//GET DATA FROM API & DISPLAY DATA
let list = [];
async function getMoviesByWord(currentSearch){
    let apiRequest = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&language=en-US&query=${currentSearch}&page=1&include_adult=false`)
    let finalData = await apiRequest.json();
    list = finalData.results;
    displayMoviesData()
    console.log(finalData.results);
    
}
$("#searchByWord").keyup(function(){
    let currentSearch = $(this).val();
    console.log(currentSearch);
    getMoviesByWord(currentSearch)
})

function displayMoviesData(){
    let cartona='';
    for(let i=0 ; i<list.length;i++){
        cartona+=`
        <div class="col-md-4 mb-5">
        <div class="movie-card position-relative overflow-hidden">
        <img src="https://image.tmdb.org/t/p/w500${list[i].poster_path}" alt="movies photo"class="w-100">
        <div class="layer bg-light bg-opacity-75 text-dark text-center">
        <h3>${list[i].title}</h3>
        <p>${list[i].overview}</p>
        <small>${list[i].vote_average}</small>
        <p class="mt-2">${list[i].release_date}</p>
       </div>
       </div>
       </div>`
    }
    $("#movies-content").html(cartona);
}

//GET MOVIES FROM SIDEBAR
async function searchMovie(moviesCat){
    let anotherApiRequest = await fetch(`https://api.themoviedb.org/3/${moviesCat}?api_key=bdd10d2b8f52bc0a5320d5c9d88bd1ff&language=en-US&page=1`)
    let anotherfinalData = await anotherApiRequest.json();
    list = anotherfinalData.results;
    displayMoviesData()
    console.log(anotherfinalData.results);
}
searchMovie('movie/now_playing');
let movieCategory = $(".nav-items a");
for(var i=0; i< movieCategory.length;i++){
    movieCategory.eq(i).click(function(e){
        const menu = $(e.target).attr('moviesCat');
        searchMovie(menu);
        console.log(menu)
    })
}

$("#searchIn").keyup(function(){
    let currentSearch = $(this).val();
    let cartona='';
    for(let i=0;i<list.length;i++)
    {if(list[i].title.toLowerCase().includes(currentSearch.toLowerCase())){
        cartona +=`
        <div class="col-md-4 mb-5">
        <div class="movie-card position-relative overflow-hidden">
        <img src="https://image.tmdb.org/t/p/w500${list[i].poster_path}" alt="movies photo"class="w-100">
        <div class="layer bg-light bg-opacity-75 text-dark text-center">
        <h3>${list[i].title}</h3>
        <p>${list[i].overview}</p>
        <small>${list[i].vote_average}</small>
        <p class="mt-2">${list[i].release_date}</p>
        </div>
        </div>
        </div>`
        } 
    }
    $("#searchMoviesResult").html(cartona);
})

//VALIDATION FORM
const validation = {
    regexName: /^[a-zA-z][a-zA-z\s]{1,20}$/,
    regexEmail:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    regexPhoneNumber: /^(002)?01[0125]\d{8}$/,
    regexAge: /^([1-7][0-9]|80)$/,
    regexPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,

    checkValidation: function(regex,number){
        if(regex.test($(".contact-us input").eq(number).val()) == true){
            $(".contact-us input").eq(number).next().addClass("d-none");
            $(".contact-us input").eq(number).addClass("is-valid").removeClass("is-invalid");
            return true
        }
        else{
            $(".contact-us input").eq(number).next().removeClass("d-none");
            $(".contact-us input").eq(number).removeClass("is-invalid").addClass("is-invalid");
            return false
        }
  },
    checkRePassword: function () {
        if ($(".contact-us input").eq(4).val() == $(".contact-us input").eq(5).val()) {
            $(".contact-us input").eq(5).next().addClass("d-none");
            $(".contact-us input").eq(5).addClass("is-valid").removeClass("is-invalid");
            return true
        }
        else{
            $(".contact-us input").eq(5).next().removeClass("d-none");
            $(".contact-us input").eq(5).removeClass("is-invalid").addClass("is-invalid");
            return false
        }
  },
}
let {regexName,regexEmail,regexPhoneNumber,regexAge,regexPassword} = validation;
$("form").keyup(function () {
    if(validation.checkValidation(regexName, 0) && validation.checkValidation(regexEmail, 1) && validation.checkValidation(regexPhoneNumber, 2) &&
    validation.checkValidation(regexAge, 3) && validation.checkValidation(regexPassword, 4) &&
    validation.checkRePassword()){
        $("#submit").attr("disabled", false)
    }
    else{
        $("#submit").attr("disabled", true); 
    }
});







