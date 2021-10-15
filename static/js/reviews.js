var slider2 = document.querySelector('.reviews-ss');
slider2.style.left = "0%";
var prev1 = document.querySelector('.reviews-previous');
var next1 = document.querySelector('.reviews-next');
var bubbles = document.querySelectorAll('.bubbles');
bubbles[0].style.background = "lightgray";
function changeSlide(n)
{
    if (n==1)
    {
        if (slider2.style.left == "0%")
        {
            prev1.style.display = "block";
            slider2.style.left = "-100%";
            bubbles[0].style.background = "white";
            bubbles[1].style.background = "lightgray";
            bubbles[2].style.background = "white";
            return 0;
        }
        if (slider2.style.left == "-100%")
        {
            next1.style.display = "none";
            slider2.style.left = "-200%";
            bubbles[0].style.background = "white";
            bubbles[1].style.background = "white";
            bubbles[2].style.background = "lightgray";
            return 0;
        }
    }
    else
    {
        if (slider2.style.left == "-100%")
        {
            prev1.style.display = "none";
            slider2.style.left = "0%";
            bubbles[0].style.background = "lightgray";
            bubbles[1].style.background = "white";
            bubbles[2].style.background = "white";
            return 0;
        }
        if (slider2.style.left == "-200%")
        {
            next1.style.display = "block";
            slider2.style.left = "-100%";
            bubbles[0].style.background = "white";
            bubbles[1].style.background = "lightgray";
            bubbles[2].style.background = "white";
            return 0;
        }
    }
}
function changeBub(n)
{
    if(n==1)
    {
        prev1.style.display = "none";
        next1.style.display = "block";
        slider2.style.left = "0%";
        bubbles[0].style.background = "lightgray";
        bubbles[1].style.background = "white";
        bubbles[2].style.background = "white";
        return 0;
    }
    else if(n==2)
    {
        prev1.style.display = "block";
        next1.style.display = "block";
        slider2.style.left = "-100%";
        bubbles[0].style.background = "white";
        bubbles[1].style.background = "lightgray";
        bubbles[2].style.background = "white";
        return 0;
    }
    else
    {
        prev1.style.display = "block";
        next1.style.display = "none";
        slider2.style.left = "-200%";
        bubbles[0].style.background = "white";
        bubbles[1].style.background = "white";
        bubbles[2].style.background = "lightgray";
        return 0;
    }
}