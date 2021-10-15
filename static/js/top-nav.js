window.onscroll = function(){scrollFunction2()};
function scrollFunction2()
{
        if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50)
        {
            top_nav.style.background = 'rgba(0, 162, 232, 1)';
            top_nav_mobile.style.background = 'rgba(0, 162, 232, 1)';
            triangle.style.borderBottom = '2vh solid rgba(0, 162, 232, 1)';
            cartmenu.style.background = 'rgba(0, 162, 232, 1)';
            butt_menu.style.background = 'rgba(0, 162, 232, 1)';
            document.querySelectorAll('.search-field')[1].style.background = 'rgba(81, 197, 247, 1)';
            if(top_nav_2 != null && top_nav_2_mobile != null)
            {
                top_nav_2.style.background = 'rgba(2, 177, 2, 1)';
                top_nav_2_mobile.style.background = 'rgba(2, 177, 2, 1)';
                top_nav_2.style.color = 'white';
                top_nav_2_mobile.style.color = 'white';
            }
        }
        else
        {
            top_nav.style.background = 'rgba(0, 162, 232, 0)';
            top_nav_mobile.style.background = 'rgba(0, 162, 232, 0)';
            triangle.style.borderBottom = 'rgba(0, 162, 232, 0)';
            cartmenu.style.background = 'rgba(0, 162, 232, 0)';
            butt_menu.style.background = 'rgba(0, 162, 232, 0)';
            document.querySelectorAll('.search-field')[1].style.background = 'rgba(81, 197, 247, 0)';
            if(top_nav_2 != null && top_nav_2_mobile != null)
            {
                top_nav_2.style.background = 'rgba(2, 177, 2, 0)';
                top_nav_2_mobile.style.background = 'rgba(2, 177, 2, 0)';
                top_nav_2.style.color = 'rgba(2, 177, 2, 1)';
                top_nav_2_mobile.style.color = 'rgba(2, 177, 2, 1)';
            }
        }
}