function url()
{
    var key = document.querySelector('#key').value;
    var price = document.querySelector('#product-price').value;
    var quantity = document.querySelector('.quantity').value;
    var properties = document.querySelector('.plug-type').value;
    var message = "function=buy"+"&price="+price+"&quantity="+quantity+"&properties="+properties+"&key="+key;
    document.querySelector('.buy').href = "/buy-now?" + message;
}