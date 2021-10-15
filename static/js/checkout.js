var fname = document.querySelector("#fname");
var lname = document.querySelector("#lname");
var email = document.querySelector("#email");
var address = document.querySelector("#address");
var address2 = document.querySelector("#address2");
var postcode = document.querySelector("#post-code");
var city = document.querySelector("#city");
var country = document.querySelector(".coun");
var ship = document.querySelector('#shipping-info');
var pay = document.querySelector('#payment-form');
var contcont = document.querySelectorAll('.cont-cont');
var link = document.querySelector('.l2');
var second = document.querySelector('.second');
var s2 = document.querySelector('.s2');
var err = document.querySelector('.err');
var err2 = document.querySelector('.err2');
var comment = document.querySelector('#comment');
function cont()
{
    if(validate_ship())
    {
        err.style.opacity = "0";
        address.style.borderColor = "rgba(50, 50, 93, 0.1)";
        postcode.style.borderColor = "rgba(50, 50, 93, 0.1)";
        city.style.borderColor = "rgba(50, 50, 93, 0.1)";
        country.style.borderColor = "rgba(50, 50, 93, 0.1)";
        ship.style.display = "none";
        pay.style.display = "flex";
        contcont[0].style.display = "none";
        contcont[1].style.display = "flex";
        link.style.width = "100%";
        setTimeout(() => {
            s2.style.width = "100%";
            second.style.color = "white";
        }, 500);
    }
    else
    {
        err.style.opacity = "1";
        if(address.value.length == 0) {address.style.borderBottom = "1px solid red";}
        if(postcode.value.length == 0) {postcode.style.borderBottom = "1px solid red";}
        if(city.value.length == 0) {city.style.borderBottom = "1px solid red";}
        if(country.value.length == 0) {country.style.borderBottom = "1px solid red";}
    }
}
function back()
{
    err.style.opacity = "0";
    ship.style.display = "flex";
    pay.style.display = "none";
    contcont[0].style.display = "flex";
    contcont[1].style.display = "none";
    s2.style.width = "0";
    second.style.color = "black";
    setTimeout(() => {
        link.style.width = "0";
    }, 500);
}
function validate_ship()
{
    if( address.value.length == 0 || postcode.value.length == 0 || city.value.length == 0 || country.value.length == 0 )
    {
        return false;
    }
    else
    {
        return true;
    }
}
function validate_pay()
{
    if( lname.value.length == 0 || email.value.length == 0 )
    {
        return false
    }
    else
    {
        return true;
    }
}
function focuss(name)
{
    document.querySelector(name).style.borderBottom = "1px solid rgba(50, 50, 93, 0.1)";
}