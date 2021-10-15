var password0 = document.querySelector("#password0");
var password0_missing = document.querySelector(".password0-missing");

var password = document.querySelector("#password");
var password_missing = document.querySelector(".password-missing");

var password2 = document.querySelector("#password2");
var password2_missing = document.querySelector(".password2-missing");

var add1 = document.querySelector('#address-1');
var add1_missing = document.querySelector('.address1-missing');
var add2 = document.querySelector('#address-2');
var add2_missing = document.querySelector('.address2-missing');
var code = document.querySelector('#post-code');
var code_missing = document.querySelector('.post-code-missing');
var city = document.querySelector('#city');
var city_missing = document.querySelector('.city-missing');
var country = document.querySelector('#count-input');
var country_missing = document.querySelector('.country-missing');

var lowercase = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var numbers = "0123456789".split("");
var symbols = "~`! @#$%^&*()_-+={[}]|\\:;\"'<,>.?/".split("");

var info = document.querySelectorAll(".info");
var butt = document.querySelectorAll(".desktop");
var butt2 = document.querySelectorAll(".mobile");

function switchInfo(n)
{
    for(var i = 0; i<4; i++)
    {
        info[i].style.display = "none";
        butt[i].style.background = "rgb(0,162,232)";
        butt[i].style.color = "white";
    }
    info[n].style.display = "flex";
    butt[n].style.background = "white";
    butt[n].style.color = "rgb(0,162,232)";
}
function switchInfo2(n)
{
    for(var i = 0; i<4; i++)
    {
        info[i].style.display = "none";
    }
    info[n].style.display = "flex";
    if(n == 0)
    {
        butt2[0].style.backgroundImage = "url('../static/img/icons/account-gray.png')";
        butt2[1].style.backgroundImage = "url('../static/img/icons/lock-white.png')";
        butt2[2].style.backgroundImage = "url('../static/img/icons/address-white.png')";
        butt2[3].style.backgroundImage = "url('../static/img/icons/card-white.png')";
    }
    else if(n == 1)
    {
        butt2[0].style.backgroundImage = "url('../static/img/icons/account-tr.png')";
        butt2[1].style.backgroundImage = "url('../static/img/icons/lock-gray.png')";
        butt2[2].style.backgroundImage = "url('../static/img/icons/address-white.png')";
        butt2[3].style.backgroundImage = "url('../static/img/icons/card-white.png')";
    }
    else if(n == 2)
    {
        butt2[0].style.backgroundImage = "url('../static/img/icons/account-tr.png')";
        butt2[1].style.backgroundImage = "url('../static/img/icons/lock-white.png')";
        butt2[2].style.backgroundImage = "url('../static/img/icons/address-gray.png')";
        butt2[3].style.backgroundImage = "url('../static/img/icons/card-white.png')";
    }
    else if(n == 3)
    {
        butt2[0].style.backgroundImage = "url('../static/img/icons/account-tr.png')";
        butt2[1].style.backgroundImage = "url('../static/img/icons/lock-white.png')";
        butt2[2].style.backgroundImage = "url('../static/img/icons/address-white.png')";
        butt2[3].style.backgroundImage = "url('../static/img/icons/card-gray.png')";
    }
}
function missingAdd1()
{
    if(add1.value.length == 0)
    {
        add1_missing.innerHTML = "&#9888; Required Field.";
        add1_missing.style.opacity = "1";
        add1.style.border = "1px solid red";
        add1.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        add1_missing.style.opacity = "0";
        add1.style.border = "rgba(0,0,0,0)";
        add1.style.background = "white";
        return true;
    }
}
function missingAdd2()
{
    if(add2.value.length == 0)
    {
        add2_missing.innerHTML = "&#9888; Required Field.";
        add2_missing.style.opacity = "1";
        add2.style.border = "1px solid red";
        add2.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        add2_missing.style.opacity = "0";
        add2.style.border = "rgba(0,0,0,0)";
        add2.style.background = "white";
        return true;
    }
}
function missingCode()
{
    if(code.value.length == 0)
    {
        code_missing.innerHTML = "&#9888; Required Field.";
        code_missing.style.opacity = "1";
        code.style.border = "1px solid red";
        code.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        code_missing.style.opacity = "0";
        code.style.border = "rgba(0,0,0,0)";
        code.style.background = "white";
        return true;
    }
}
function missingCity()
{
    if(city.value.length == 0)
    {
        city_missing.innerHTML = "&#9888; Required Field.";
        city_missing.style.opacity = "1";
        city.style.border = "1px solid red";
        city.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        city_missing.style.opacity = "0";
        city.style.border = "rgba(0,0,0,0)";
        city.style.background = "white";
        return true;
    }
}
function missingCountry()
{
    if(country.value.length == 0)
    {
        country_missing.innerHTML = "&#9888; Required Field.";
        country_missing.style.opacity = "1";
        country.style.border = "1px solid red";
        country.style.background = "rgba(255,0,0,.1) !imporant";
        return false;
    }
    else
    {
        country_missing.style.opacity = "0";
        country.style.border = "rgba(0,0,0,0)";
        country.style.background = "white";
        return true;
    }
}
function missingPass0()
{
    if(password0.value.length == 0)
    {
        password0_missing.innerHTML = "&#9888; Required Field.";
        password0_missing.style.opacity = "1";
        password0.style.border = "1px solid red";
        password0.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        password0_missing.style.opacity = "0";
        password0.style.border = "rgba(0,0,0,0)";
        password0.style.background = "white";
        return true;
    }
}
function missingPass3()
{
    if(password.value.length == 0)
    {
        password_missing.innerHTML = "&#9888; Required Field.";
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        password_missing.style.opacity = "0";
        password.style.border = "rgba(0,0,0,0)";
        password.style.background = "white";
        return true;
    }
}
function missingPass4()
{
    if(password2.value.length == 0)
    {
        password2_missing.innerHTML = "&#9888; Required Field.";
        password2_missing.style.opacity = "1";
        password2.style.border = "1px solid red";
        password2.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        password2_missing.style.opacity = "0";
        password2.style.border = "rgba(0,0,0,0)";
        password2.style.background = "white";
        return true;
    }
}
function comparePass2()
{
    if(password2.value != password.value && password.value.length != 0 && password2.value.length != 0)
    {
        password_missing.innerHTML = "&#9888; Passwords do NOT match.";
        password_missing.style.opacity = "1";
        return false;
    }
    else
    {
        passStrength2();
    }
}
function passStrength2()
{
    if(password.value.length < 6 && password.value.length != 0)
    {
        password_missing.innerHTML = "&#9888; New Password should be at least 6 characters."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else if(checkLower()==0)
    {
        password_missing.innerHTML = "&#9888; New Password should contain at least 1 letter [A-Z]."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else if(checkNum()==0)
    {
        password_missing.innerHTML = "&#9888; New Password should contain at least 1 digit [0-9]."
        password_missing.style.opacity = "1";
        password.style.border = "1px solid red";
        password.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        password_missing.innerHTML = "&#9888; Required Field."
        password_missing.style.opacity = "0";
        password.style.border = "rgba(0,0,0,0)";
        password.style.background = "white";
        return true;
    }
}
function validate4()
{
    if(missingPass0()==0 || missingPass3()==0 || missingPass4()==0 || comparePass2()==0 || passStrength2()==0 || compare()==0)
    {
        comparePass2();
        passStrength2();
        missingPass0();
        missingPass3();
        missingPass4();
        compare();
        return false;
    }
    else
    {
        return true;
    }
}
function validate5()
{
    if(missingAdd1()==0 || missingCode()==0 || missingCity()==0 || missingCountry()==0 || codeLen()==0 || add1Len()==0 || add2Len()==0 || cityLen()==0)
    {
        codeLen();
        add1Len();
        add2Len();
        cityLen();
        missingAdd1();
        missingCode();
        missingCity();
        missingCountry();
        return false;
    }
    else
    {
        return true;
    }
}
function checkNum()
{
    if(password.value.length != 0)
    {
        var checked;
        for(var i=0; i<numbers.length; i++)
        {
            if(password.value.includes(numbers[i]))
            {
                checked = 1;
                break;
            }
            else
            {
                checked = 0;
            }
        }
        return checked;
    }
    else
    {
        return 1;
    }
}
function checkLower()
{
    if(password.value.length != 0)
    {
        var checked;
        for(var i=0; i<lowercase.length; i++)
        {
            if(password.value.includes(lowercase[i]))
            {
                checked = 1;
                break;
            }
            else
            {
                checked = 0;
            }
        }
        return checked;
    }
    else
    {
        return 1;
    }
}
function codeLen()
{
    if(code.value.length > 12)
    {
        code_missing.innerHTML = "&#9888; Maximum 12 digits.";
        code_missing.style.opacity = "1";
        code.style.border = "1px solid red";
        code.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        code_missing.innerHTML = "&#9888; Required Field.";
        code_missing.style.opacity = "0";
        code.style.border = "rgba(0,0,0,0)";
        code.style.background = "white";
        return true;
    }
}
function add1Len()
{
    if (add1.value.length > 35)
    {
        add1_missing.innerHTML = "&#9888; Max Characters Exceeded.";
        add1_missing.style.opacity = "1";
        add1.style.border = "1px solid red";
        add1.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        add1_missing.innerHTML = "&#9888; Required Field.";
        add1_missing.style.opacity = "0";
        add1.style.border = "rgba(0,0,0,0)";
        add1.style.background = "white";
        return true;
    }
}
function add2Len()
{
    if (add2.value.length > 35)
    {
        add2_missing.innerHTML = "&#9888; Max Characters Exceeded.";
        add2_missing.style.opacity = "1";
        add2.style.border = "1px solid red";
        add2.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        add2_missing.innerHTML = "&#9888; Required Field.";
        add2_missing.style.opacity = "0";
        add2.style.border = "rgba(0,0,0,0)";
        add2.style.background = "white";
        return true;
    }
}
function cityLen()
{
    if (city.value.length > 35)
    {
        city_missing.innerHTML = "&#9888; Max Characters Exceeded.";
        city_missing.style.opacity = "1";
        city.style.border = "1px solid red";
        city.style.background = "rgba(255,0,0,.1)";
        return false;
    }
    else
    {
        city_missing.innerHTML = "&#9888; Required Field.";
        city_missing.style.opacity = "0";
        city.style.border = "rgba(0,0,0,0)";
        city.style.background = "white";
        return true;
    }
}
function focusOut(namec, namec_missing)
{
    if(compare())
    {
        namec.style.background = "white";
        namec_missing.style.opacity = "0";
    }
}

var del = document.querySelectorAll(".del-confirm");
var snowflake = document.querySelector("#special-snowflake");
var dim = document.querySelector(".dim");
function confirm(i)
{
    dim.style.display = "block";
    if(i != 3)
    {
        del[i].style.display = "flex";
    }
    else
    {
        snowflake.style.display = "flex";
    }
}
function cancel()
{
    dim.style.display = "none";
    del[0].style.display = "none";
    del[1].style.display = "none";
    del[2].style.display = "none";
    snowflake.style.display = "none";
}
var filled = document.querySelectorAll('.filled');
var unfilled = document.querySelector('.unfilled');
function edit()
{
    for(var i=0; i<11; i++)
    {
        filled[i].style.display = "none";
    }
    unfilled.style.display = "flex";
}
function compare()
{
    if((password0.value == password.value) && password0.value.length != 0 && password.value.length != 0)
    {
        password_missing.innerHTML = "&#9888; New password and current password must be different.";
        password_missing.style.opacity = "1";
        return false;
    }
    else if(password0.value.length == 0)
    {
        password_missing.style.opacity = "1";
        return false;
    }
    else
    {
        password_missing.style.opacity = "0";
        return true;
    }
}