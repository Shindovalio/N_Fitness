// VARIABLES //
var bag = document.querySelectorAll("#bag");
var bag_num = document.querySelectorAll('.bag-num');
var search = document.querySelector("#search");
var top_nav = document.querySelector(".top-nav");
var navtext = document.querySelectorAll(".top-nav-items");
var cartmenu = document.querySelector(".cart-menu");
var triangle = document.querySelector(".triangle");
var search_field = document.querySelector(".search-field");
var butt_menu = document.querySelector(".buttons-mobile");
var quantity = document.querySelector(".quantity");
var linebar = document.querySelector("#linebar");
var top_nav_mobile = document.querySelector('.top-nav-mobile');
cartmenu.style.display = "none"; triangle.style.display = "none"; butt_menu.style.display = "none";

function reload()
{
 if(window.history.replaceState) {window.history.replaceState(null, null, window.location.href);}


 // VARIABLES //
 bag = document.querySelectorAll("#bag");
 bag_num = document.querySelectorAll('.bag-num');
 search = document.querySelector("#search");
 top_nav = document.querySelector(".top-nav");
 navtext = document.querySelectorAll(".top-nav-items");
 cartmenu = document.querySelector(".cart-menu");
 triangle = document.querySelector(".triangle");
 search_field = document.querySelector(".search-field");
 butt_menu = document.querySelector(".buttons-mobile");
 quantity = document.querySelector(".quantity");
 linebar = document.querySelector("#linebar");
 cartmenu.style.display = "none"; triangle.style.display = "none"; butt_menu.style.display = "none";
}
// FUNCTIONS //
window.addEventListener
(
    'click', 
    function(e)
    {   
        if(!(search.contains(e.target) || search_field.contains(e.target)))
        {
            closesearch();
        }
        if(!(cartmenu.contains(e.target) || bag[0].contains(e.target) || bag[1].contains(e.target)))
        {
            closecart();
        }
        if(!(butt_menu.contains(e.target) || linebar.contains(e.target)))
        {
            closemenu();
        }
    }
);
function opencart()
{
    if (cartmenu.style.display == "none")
    {
        cartmenu.style.display = "block";
        triangle.style.display = "block";
        if(bag[0] != undefined)
        {
            bag[0].style.opacity = "0.8";
        }
        if(bag[1] != undefined)
        {
            bag[1].style.opacity = "0.8";
        }
    }
    else
    {
        cartmenu.style.display = "none";
        triangle.style.display = "none";
        if(bag[0] != undefined)
        {
            bag[0].style.opacity = "1";
        }
        if(bag[1] != undefined)
        {
            bag[1].style.opacity = "1";
        }
        if(bag_num[0] != undefined)
        {
            bag_num[0].style.opacity = "1";
        }
        if(bag_num[1] != undefined)
        {
            bag_num[1].style.opacity = "1";
        }
    }
}
function closecart()
{
    if (cartmenu.style.display == "block")
    {
        cartmenu.style.display = "none";
        triangle.style.display = "none";
        if(bag[0] != undefined)
        {
            bag[0].style.opacity = "1";
        }
        if(bag[1] != undefined)
        {
            bag[1].style.opacity = "1";
        }
        if(bag_num[0] != undefined)
        {
            bag_num[0].style.opacity = "1";
        }
        if(bag_num[1] != undefined)
        {
            bag_num[1].style.opacity = "1";
        }
    }
}
function opensearch()
{
    document.querySelector('.dimcho').style.display = "block";
    for(var i=0; i<9; i++)
    {
        navtext[i].style.display = "none";
    }
    top_nav.style.justifyContent = "center";
    search.style.display = "flex";
    search_field.style.display = "flex";
    search.style.cursor = "default";
    search.style.opacity = '0.8';
}
function closesearch()
{
    for(var i=0; i<9; i++)
    {
        navtext[i].style.display = "flex";
    }
    search_field.style.display = "none";
    top_nav.style.justifyContent = "space-evenly";
    search.style.cursor = "pointer";
    search.style.opacity = '1';
    document.querySelector('.dimcho').style.display = "none";
}
function openmenu()
{
    if(butt_menu.style.display == "none")
    {
        butt_menu.style.display = "block";
        linebar.style.backgroundImage = "url('/static/img/icons/cancel.png')";
    }
    else
    {
        butt_menu.style.display = "none";
        linebar.style.backgroundImage = "url('/static/img/icons/linebar-2.png')";
    }
}
function closemenu()
{
    if(butt_menu.style.display == "block")
    {
        butt_menu.style.display = "none";
        linebar.style.backgroundImage = "url('/static/img/icons/linebar-2.png')";
    }
}
function addquant()
{
    var currentval = quantity.value;
    quantity.value = parseInt(currentval) + 1;
}
function subquant()
{
    if(parseInt(quantity.value) > 1)
    {
        var currentval = quantity.value;
        quantity.value = parseInt(currentval) - 1;
    }
}