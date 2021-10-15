var slider1 = document.querySelector('.slider');
var thumbs1 = document.querySelectorAll('.sub-thumbs');
var properties1 = document.querySelector('.plug-type');
function reload2()
{
    slider1 = document.querySelector('.slider');
    thumbs1 = document.querySelectorAll('.sub-thumbs');
}
function changeImage(digit, id1)
{
    id = '#' + id1;
    var active_thumbnail = document.querySelector(id);
    for(var i=0; i<4; i++)
    {
        thumbs1[i].style.border = "none";
    }
    active_thumbnail.style.border = "3px solid rgb(0, 162, 232)";
    slider1.style.backgroundImage = "url('../static/img/products/p1/massager" + digit + ".png')";
}

function changeImage2(digit, id1)
{
    id = '#' + id1;
    var active_thumbnail = document.querySelector(id);
    for(var i=0; i<4; i++)
    {
        thumbs1[i].style.border = "none";
    }
    active_thumbnail.style.border = "3px solid rgb(0, 162, 232)";
    slider1.style.backgroundImage = "url('../static/img/products/p2/mini" + digit + ".png')";
}

function changeImage3(digit, id1)
{
    id = '#' + id1;
    var active_thumbnail = document.querySelector(id);
    for(var i=0; i<4; i++)
    {
        thumbs1[i].style.border = "none";
    }
    active_thumbnail.style.border = "3px solid rgb(0, 162, 232)";
    slider1.style.backgroundImage = "url('../static/img/products/p3/pro" + digit + ".png')";
}

function changeImage4(digit, id1)
{
    id = '#' + id1;
    var active_thumbnail = document.querySelector(id);
    for(var i=0; i<4; i++)
    {
        thumbs1[i].style.border = "none";
    }
    active_thumbnail.style.border = "3px solid rgb(0, 162, 232)";
    slider1.style.backgroundImage = "url('../static/img/products/p4/neck" + digit + ".png')";
}

function changeSelect(num)
{
    if (properties1.selectedIndex == 0)
    {
        id1 = "one";
        digit = "1";
    }
    else if (properties1.selectedIndex == 1)
    {
        id1 = "two";
        digit = "2";
    }
    else if (properties1.selectedIndex == 2)
    {
        id1 = "three";
        digit = "3";
    }
    else if (properties1.selectedIndex == 3)
    {
        id1 = "four";
        digit = "4";
    }
    else if (properties1.selectedIndex == 4)
    {
        id1 = "five";
        digit = "5";
    }
    else
    {
        id1 = "six";
        digit = "6";
    }
    if(num == 1)
    {
        changeImage(digit, id1);
    }
    else if(num == 2)
    {
        changeImage2(digit, id1);
    }
    else if(num == 3)
    {
        changeImage3(digit, id1);
    }
    else
    {
        changeImage4(digit, id1);
    }
}

var col_cont = document.querySelectorAll('.colls-content');
var col_butt = document.querySelectorAll('.colls-button');

var col_cont2 = document.querySelectorAll('.colls-content2');
var col_butt2 = document.querySelectorAll('.colls-button2');
var col_butt2_img = document.querySelectorAll('.colls-button2-img');

function expand(n)
{
    if(col_cont[n].classList.contains("expanded"))
    {
        col_butt[n].style.backgroundSize = "8% 0%";
        col_butt[n].style.backgroundImage = "url('../static/img/icons/down.png')";
        col_butt[n].style.backgroundSize = "8% 75%";
        col_cont[n].style.display = "none";
        col_cont[n].classList.remove("expanded");
    }
    else
    {
        col_butt[n].style.backgroundSize = "8% 0%";
        col_butt[n].style.backgroundImage = "url('../static/img/icons/up.png')";
        col_butt[n].style.backgroundSize = "8% 75%";
        col_cont[n].style.display = "block";
        col_cont[n].classList.add("expanded");
    }
}
function expand2(n)
{
    if(col_cont2[n].classList.contains("expanded"))
    {
        col_butt2_img[n].style.backgroundImage = "url('../static/img/icons/down.png')";
        col_cont2[n].style.display = "none";
        col_cont2[n].classList.remove("expanded");
    }
    else
    {
        col_butt2_img[n].style.backgroundImage = "url('../static/img/icons/up.png')";
        col_cont2[n].style.display = "block";
        col_cont2[n].classList.add("expanded");
    }
}