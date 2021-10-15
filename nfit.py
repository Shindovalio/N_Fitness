import os, json, random, string, time, requests, stripe, pymongo
from flask import Flask, redirect, render_template, url_for, send_from_directory, jsonify, g, request
from flask_mail import Mail, Message


# APP CONFIGURATION
app = Flask(__name__)
app.config['SECRET_KEY'] = 'Clownworld123!'


# DATABASE CONFIGURATION
cl = pymongo.MongoClient("mongodb://localhost:27017/")
db = cl.main


# OUR OWN OBJECTS
from user import *
from ips import *
from discounts import *


# MAIL CONFIGURATION
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'nfitness.business@gmail.com'
app.config['MAIL_PASSWORD'] = 'djtpjziabrugfjgu'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail= Mail(app)


# RECAPTCHA CONFIGURATION
app.config['RECAPTCHA_USE_SSL'] = True
app.config['RECAPTCHA_PUBLIC_KEY'] = '6Lf6kXMaAAAAANqF5iW4En3JzF2iBnBoUjHH4Aql'
app.config['RECAPTCHA_PRIVATE_KEY'] = '6Lf6kXMaAAAAALgXMTXs17ynB15SIT38x0DXHy6g'
app.config['RECAPTCHA_OPTIONS'] = {'theme':'black'}
public_key = '6Lf6kXMaAAAAANqF5iW4En3JzF2iBnBoUjHH4Aql'
private_key = '6Lf6kXMaAAAAALgXMTXs17ynB15SIT38x0DXHy6g'


# STRIPE SECRET KEY
stripe.api_key = "sk_test_51ISmCpCXeuEBCS5ZKnNxYWApuQANbVf3VUXfZ25ME5Xu5omATylz7weCswdZvYN7dbWVQM6X0IzNaeD6VQSBJS1300rBNrMiYM"
ASSETS_DIR = os.path.dirname(os.path.abspath(__file__))


# BEFORE REQUEST ASSIGNMENTS #
@app.before_request
def before_request():
    if 'static' not in request.path:
        with open("products.json", "r+", encoding="utf-8") as file: products = json.load(file)
        real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
        discount = Discount()
        discount = discount.retrieve_discounts()
        discount.write_to_db(0)
        visitor = IP_Address(real_ip)
        visitor.retrieve_ip()
        visitor.reset_discount(request.path)
        visitor.reset_temp_id()
        visitor.reset_feedback_timeout()
        visitor.reset_popup_timeout()
        visitor.write_to_db(0)
        g.ip = visitor.return_json(real_ip)
        g.subbed, g.ship, g.wishlist, g.user = visitor.add_user_data()
        g.bag = visitor.ip_bag
        g.product = products
        

# HANDLE 404 + 500 ERRORS #
@app.errorhandler(404)
def page_not_found(): return render_template('404.html', errorCode = 404)
@app.errorhandler(500)
def page_not_found(): return render_template('404.html', errorCode = 500)


# ADMIN ONLY PAGE /IN PROGRESS/ #
# @app.route('/control-panel', methods=['GET','POST'])
# def control_panel():
# return 0


# A CALL TO THE PAYPAL API TO GET SOME IMPORTANT VARIABLES #
def paypal_call():
    d = {"grant_type" : "client_credentials"}
    h = {"Accept": "application/json", "Accept-Language": "en_US"}
    cid = "AQhqycS1Q8_5IZmRtjbyfmU4mZPXqVPka-9OAm9LfnE-yjNMiksa52lO9w4XY_IIofFkuX9y_wk4qiaq"
    secret = "EIE8QzmZLcm5HbWEaW7QFwbWWaZW-t_96VKTPvhQZ5u5D32ts6ylHJBA-tK6FePoZMQXEyB7syAnb8pc"
    r = requests.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', auth=(cid, secret), headers=h, data=d).json()
    access_token = r['access_token']
    return cid, access_token


# Referral system - How it works?
# The referral system offers 15% discount code by giving a link to a visitor. 
# If someone else uses this link, it displays two 15% discount codes.
# In order to prevent fraud, the link and the visitor's IP adress are stored and they cannot access the codes on their own.


# REFERRAL PROGRAM STEP 1 #
@app.route('/referral', methods=['GET','POST'])
def referral():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor = visitor.retrieve_ip()
    if request.method == 'POST':
        if request.form['message'] == 'get':
            if visitor.set_gifter():
                discount = Discount()
                discount = discount.retrieve_discounts()
                link = discount.append_gifter(real_ip)
                visitor.write_to_db(1)
                discount.write_to_db(1)
                return link
            return '1'
        if request.form['message'] == 'close':
            visitor.set_pop_timeout()
            visitor.write_to_db(1)
            return '0'
    return redirect(url_for('index'))


# REFERRAL PROGRAM STEP 2 #
@app.route('/referrals/<link>', methods=['GET','POST'])
def referrals(link): 
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    if '52.114' not in real_ip:
        check = 0
        discount = Discount()
        discount = discount.retrieve_discounts()
        gifter_ip, check, listec = discount.check_links(link)
        visitor = IP_Address(real_ip)
        visitor = visitor.retrieve_ip()
        gifter = IP_Address(gifter_ip)
        gifter = gifter.retrieve_ip()
        if check:
            gifter.gifter = 0
            visitor.receiver = 1
            code1, code2 = discount.finish_discount(listec)
            visitor.write_to_db(1)
            discount.write_to_db(1)
        else:
            code1 = ''
            code2 = ''
        return redirect(url_for('index', code1=code1, code2=code2))
    return redirect(url_for('index'))


# BEFORE CHECKOUT #
@app.route('/buy-now', methods=['GET','POST'])
def buy_now():
    api_key = ''.join(random.choice(string.digits) for i in range(16))
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor = visitor.retrieve_ip()
    visitor.fill_checkout_details(api_key)
    visitor.write_to_db(1)
    return redirect(url_for('.checkout', key=api_key))


# AJAX MODIFY WISHLIST | RETURNS PRODUCT PAGE OR HOMEPAGE IF USER ISN'T LOGGED IN #
@app.route('/mod-wishlist', methods=['GET','POST'])
def mod_wish():
    
    cid, access_token = paypal_call()

    api_key = ''.join(random.choice(string.digits) for i in range(16))
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor = visitor.retrieve_ip()
    
    visitor.api_key = api_key
    visitor.write_to_db(1)
    # If the visitor is logged it, they can modify their wishlist.
    # They can choose to add or remove an item from their wishlist.
    if visitor.user_id != 0:
        reg_user = User(visitor.user_id)
        reg_user = reg_user.retrieve_user()
        uname = request.form['uname']
        act = request.form['act']
        count, wlist = reg_user.modify_wishlist(uname, act)
        reg_user.write_to_db(1)
        # TEMPLATE #
        return render_template(request.form['template'], Api=api_key, Token=access_token, CID=cid, \
        Len = count, w_count = count, \
        w_list = wlist, Wlist = wlist, \
        b_count = visitor.ip_bag.count)
        # TEMPLATE END #
    return redirect(url_for('index'))


# How adding to bag works?
# Adding to bag stores the necessary info and redirects the visitor to the bag page for faster checkout process.
# In the bag page, the visitor can modify the color and quantity of the product or remove it completely using AJAX.


# ADD TO BAG | REDIRECTS TO BAG #
def mod_bag():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    api_key = ''.join(random.choice(string.digits) for i in range(16))
    key = request.form['key']
    price = request.form['product-price']
    properties = request.form['properties']
    quantity = request.form['quantity']
    visitor = IP_Address(real_ip)
    visitor = visitor.retrieve_ip()
    visitor.api_key = api_key
    visitor.add_to_bag(key, price, properties, quantity)
    visitor.write_to_db(1)
    return redirect(url_for('bag', added=1))


# AJAX MODIFY BAG | RETURNS BAG.HTML #
@app.route('/mod-bag', methods=['GET','POST'])
def mod_bag2():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    try: applied_changes = int(request.args['applied_changes'])
    except: applied_changes = 0

    cid, access_token = paypal_call()

    visitor = IP_Address(real_ip)
    visitor = visitor.retrieve_ip()
    
    if visitor.user_id != 0:
        reg_user = User(visitor.user_id)
        reg_user = reg_user.retrieve_user()
        wcount = reg_user.wishlist.count
    else:
        wcount = 0
    uname, act = request.form['uname'], request.form['act']
    if visitor.modify_bag(uname, act):
        visitor.write_to_db(1)
        # TEMPLATE #
        return render_template("bag.html", Len = visitor.ip_bag.count,\
        Bag = visitor.ip_bag.list, w_count = wcount, \
        b_count = visitor.ip_bag.count, Applied = applied_changes, Token=access_token, CID=cid)
        # TEMPLATE END #
    

# HOMEPAGE #
@app.route('/', methods=['GET','POST'])
def index():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor = visitor.retrieve_ip()
    ptmout = visitor.pop_timeout
    try:
        code1 = request.args['code1']
        code2 = request.args['code2']
        if code1 != '' and code2 != '':
            discounts = 1
        else:
            discounts = 0
    except: 
        code1 = ''
        code2 = ''
        discounts = 0
    try: sign_in = int(request.args['sign_in'])
    except: sign_in = 0
    try: logout = int(request.args['logout'])
    except: logout = 0
    try: delete_acc = int(request.args['deleted'])
    except: delete_acc = 0
    return render_template("index.html", Ssigned = sign_in, Ddelete = delete_acc, Llog = logout, PTM = ptmout, \
    code1=code1, code2=code2, discounts=discounts)


def product_setup():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    api_key = ''.join(random.choice(string.digits) for i in range(16))
    visitor = IP_Address(real_ip)
    visitor = visitor.retrieve_ip()
    visitor.api_key = api_key
    ptmout = visitor.pop_timeout
    visitor.write_to_db(1)
    return api_key, ptmout, visitor


# PRODUCT 1 #
@app.route('/ngun-classic', methods=['GET','POST'])
def ngun_classic():
    cid, access_token = paypal_call()

    api_key, ptmout, visitor = product_setup()
    if request.method == 'POST': return mod_bag()

    if visitor.user_id != 0:
        reg_user = User(visitor.user_id)
        reg_user = reg_user.retrieve_user()
        wcount = reg_user.wishlist.count
        wlist = reg_user.wishlist.list
    else:
        wcount = 0
        wlist = None
    return render_template("product1.html", Api=api_key, Token=access_token, CID=cid, Added = None, \
    w_count = wcount, w_list = wlist, b_count = visitor.ip_bag.count, PTM = ptmout, fromMB=0)


# PRODUCT 2 #
@app.route('/ngun-mini', methods=['GET','POST'])
def ngun_mini():
    cid, access_token = paypal_call()

    api_key, ptmout, visitor = product_setup()
    if request.method == 'POST': return mod_bag()

    if visitor.user_id != 0:
        reg_user = User(visitor.user_id)
        reg_user = reg_user.retrieve_user()
        wcount = reg_user.wishlist.count
        wlist = reg_user.wishlist.list
    else:
        wcount = 0
        wlist = None
    return render_template("product2.html", Api=api_key, Token=access_token, CID=cid, Added = None, \
    w_count = wcount, w_list = wlist, b_count = visitor.ip_bag.count, PTM = ptmout, fromMB=0)


# PRODUCT 3 #
@app.route('/ngun-pro', methods=['GET','POST'])
def ngun_pro():
    cid, access_token = paypal_call()

    api_key, ptmout, visitor = product_setup()
    if request.method == 'POST': return mod_bag()

    if visitor.user_id != 0:
        reg_user = User(visitor.user_id)
        reg_user = reg_user.retrieve_user()
        wcount = reg_user.wishlist.count
        wlist = reg_user.wishlist.list
    else:
        wcount = 0
        wlist = None
    return render_template("product3.html", Api=api_key, Token=access_token, CID=cid, Added = None, \
    w_count = wcount, w_list = wlist, b_count = visitor.ip_bag.count, PTM = ptmout, fromMB=0)


# PRODUCT 4 #
@app.route('/neck-massager', methods=['GET','POST'])
def neck_massager():
    cid, access_token = paypal_call()

    api_key, ptmout, visitor = product_setup()
    if request.method == 'POST': return mod_bag()

    if visitor.user_id != 0:
        reg_user = User(visitor.user_id)
        reg_user = reg_user.retrieve_user()
        wcount = reg_user.wishlist.count
        wlist = reg_user.wishlist.list
    else:
        wcount = 0
        wlist = None
    return render_template("product4.html", Api=api_key, Token=access_token, CID=cid, Added = None, \
    w_count = wcount, w_list = wlist, b_count = visitor.ip_bag.count, PTM = ptmout, fromMB=0)


# ALL PRODUCTS #
@app.route('/all-products', methods=['GET','POST'])
def all_products():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor = visitor.retrieve_ip()
    ptmout = visitor.pop_timeout
    return render_template("all-products.html", PTM = ptmout)


# OLD PAGES | REDIRECTS NEEDED FOR SEO #
@app.route('/massage-gun', methods=['GET','POST'])
def massage_gun(): return redirect(url_for('ngun_classic'))
@app.route('/n-gun-classic', methods=['GET','POST'])
def n_gun_classic(): return redirect(url_for('ngun_classic'))
@app.route('/back-stretcher', methods=['GET','POST'])
def back_stretcher(): return redirect(url_for('all_products'))
@app.route('/mini-gun', methods=['GET','POST'])
def mini_gun(): return redirect(url_for('ngun_mini'))


# BAG | This is where you modify the color and/or quantity of the products #
@app.route('/bag', methods=['GET','POST'])
def bag():
    cid, access_token = paypal_call()

    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor = visitor.retrieve_ip()
    
    if visitor.user_id != 0: 
        reg_user = User(visitor.user_id)
        reg_user = reg_user.retrieve_user()
        wcnt = reg_user.wishlist.count
    else: wcnt = 0

    if request.method == 'POST':
        props = request.form['properties']
        quant = request.form['quantity']
        index = request.form['index']
        dex = visitor.ip_bag.list.index(index)
        visitor.bag_change_properties(props, quant, dex, index)
        visitor.write_to_db(1)
        return redirect(url_for('bag', applied_changes=1))

    try: applied_changes = int(request.args['applied_changes'])
    except: applied_changes = 0
    try: added = int(request.args['added'])
    except: added = 0
    # TEMPLATE #
    return render_template("bag.html", Len = visitor.ip_bag.count,\
    Bag = visitor.ip_bag.list, w_count = wcnt, Added=added, b_count = visitor.ip_bag.count, \
    Applied = applied_changes, Token=access_token, CID=cid)


# WISHLIST #
@app.route('/wishlist', methods=['GET','POST'])
def wishlist():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor = visitor.retrieve_ip()
    
    if visitor.user_id != 0:
        length = int()
        reg_user = User(visitor.user_id)
        reg_user = reg_user.retrieve_user()
        with open("products.json", "r+", encoding="utf-8") as file: products = json.load(file)
        for i in range(len(reg_user.wishlist.list)+1):
            try: 
                reg_user.wishlist.list[i]
            except:
                length = i
                break
        return render_template("wishlist.html", w_count = length, \
        Wlist = reg_user.wishlist.list, Products = products, Len = length)

    wish_redirect = 1
    double = 1
    func_name = wishlist.__name__
    return redirect(url_for("sign_in", wish_redirect=wish_redirect, double=double, func_name=func_name))


# ACCOUNT #
@app.route('/account', methods=['GET','POST'])
def account():

    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor = visitor.retrieve_ip()
    
    if visitor.user_id != 0:

        # REQUEST SECTION
        if request.method == "POST":
            reg_user = User(visitor.user_id)
            reg_user = reg_user.retrieve_user()
            
            # ADD SHIPPING ADDRESS
            if request.form['formec'] == 'add-ship':
                add1, add2 = request.form['address-1'],request.form['address-2']
                postcode = request.form['post-code']
                city, country = request.form['city'],request.form['country']
                shipDict = {
                    'address-1': add1,'address-2': add2,'post-code': postcode,
                    'city': city,'country': country}
                reg_user.shipping_info = shipDict
                new_address = 1
            
            # REMOVE SHIP ADDRESS
            if request.form['formec'] == 'remove':
                reg_user.shipping_info = {}
                delete_address = 1
            
            # SUB TO NEWSLETTER
            if request.form['formec'] == 'sub':
                reg_user.subbed = 1
                subscribe = 1
            
            # UNSUB FROM NEWSLETTER
            if request.form['formec'] == 'unsub':
                reg_user.subbed = 0
                unsub = 1
            
            # CHANGE PASSWORD
            if request.form['formec'] == 'change-pass':
                if request.form['curr-pass'] != reg_user.basic_info.password:
                    changed_pass_1 = 2
                else:
                    reg_user.basic_info.password = request.form['new-pass']
                    changed_pass_1 = 1
            
            # DELETE ACCOUNT
            if request.form['formec'] == 'delete-acc':
                reg_user.delete_account()
                visitor.user_id = 0
                visitor.write_to_db(1)
                deleted = 1
                return redirect(url_for("index", deleted=deleted))
            
            reg_user.write_to_db(1)
            try: na = new_address
            except: na = 0
            try: da = delete_address
            except: da = 0
            try: s = subscribe
            except: s = 0
            try: u = unsub
            except: u = 0
            try: cp = changed_pass_1
            except: cp = 0
            return redirect(url_for("account", new_address=na, delete_address=da, subscribe=s, \
            unsub=u, changed_pass_1=cp))

        # RESET VARIABLES
        try: sign_up = int(request.args['sign_up'])
        except: sign_up = 0
        try: changed_pass_1 = int(request.args['changed_pass_1'])
        except: changed_pass_1 = 0
        try: unsub = int(request.args['unsub'])
        except: unsub = 0
        try: subscribe = int(request.args['subscribe'])
        except: subscribe = 0
        try: new_address = int(request.args['new_address'])
        except: new_address = 0
        try: delete_address = int(request.args['delete_address'])
        except: delete_address = 0
        # RESET VARIABLES

        # TEMPLATE
        return render_template("account.html", Sup = sign_up, \
        Aadd = delete_address, Nnew = new_address, Lletter = subscribe, \
        Lletter2 = unsub, Ppass = changed_pass_1)

    acc_redirect = 1
    double = 1
    func_name = account.__name__
    return redirect(url_for("sign_in", acc_redirect=acc_redirect, double=double, func_name=func_name))


# SIGN IN #
@app.route('/sign-in', methods=['GET','POST'])
def sign_in():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor = visitor.retrieve_ip()
    if visitor.user_id != 0:
        sign_in = 1
        return redirect(url_for('index', sign_in=sign_in))
    if request.method == 'POST':
        email, password = request.form['sign-in-email'], request.form['sign-in-password']
        
        # GOOGLE RECAPTCHA CALL
        url = 'https://www.google.com/recaptcha/api/siteverify'
        secret = private_key
        response = request.form['g-recaptcha-response']
        response2 = (requests.post(url, data={"secret": secret, "response": response})).json()
        if response2['success'] == 0: return render_template("sign-in.html", Respond = 1, PubKey = public_key)

        # AUTHENTICATE ACCOUNT
        the_user = db.users.find_one({ "basic-info.email-address": email, "basic-info.password": password })
        if the_user:
            visitor.user_id = the_user['serial']
            visitor.write_to_db(1)
            try:
                if request.args['double']:
                    func_name = request.args['func_name']
                    return redirect(url_for(func_name))
            except: return redirect(url_for('index', sign_in=1))
        else: return redirect(url_for('sign_in', sign_in_error=1))

    # RESET SESSION #
    try: product_redirect = int(request.args['product_redirect'])
    except: product_redirect = 0
    try: changed_pass_2 = int(request.args['changed_pass_2'])
    except: changed_pass_2 = 0
    try: bag_redirect = int(request.args['bag_redirect'])
    except: bag_redirect = 0
    try: wish_redirect = int(request.args['wish_redirect'])
    except: wish_redirect = 0
    try: acc_redirect = int(request.args['acc_redirect'])
    except: acc_redirect = 0
    try: sign_in_error = int(request.args['sign_in_error'])
    except: sign_in_error = 0
    try: logout = int(request.args['logout'])
    except: logout = 0

    # TEMPLATE #
    return render_template("sign-in.html", Respond = None, Llog = logout, Eerror = sign_in_error, \
    Changed = changed_pass_2, Red = wish_redirect, Red2 = bag_redirect, Red3 = acc_redirect, \
    Red4 = product_redirect, PubKey = public_key)


# SIGN UP #
@app.route('/sign-up', methods=['GET','POST'])
def sign_up():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor = visitor.retrieve_ip()
    visitor.user_id = 0
    sign_up_error = 0

    # REQUEST SECTION
    if request.method == 'POST':
        fname, lname = request.form['first-name'], request.form['last-name']
        email, password = request.form['sign-up-email'], request.form['sign-up-password']
        
        # GOOGLE RECAPTCHA CALL
        url = 'https://www.google.com/recaptcha/api/siteverify'
        secret = private_key
        response = request.form['g-recaptcha-response']
        response2 = (requests.post(url, data={"secret": secret, "response": response})).json()
        if response2['success'] == 0: return render_template("sign-up.html", Respond = 1, PubKey = public_key)

        # AUTHENTICATE ACCOUNT | IF YOU HAVE AN EXISTING ACCOUNT, IT WILL LOG YOU IN
        the_user = db.users.find_one({ "basic-info.email-address": email, "basic-info.password": password })
        if the_user:
            visitor.user_id = the_user['serial']
            visitor.write_to_db(1)
            try:
                if request.args['double']:
                    func_name = request.args['func_name']
                    return redirect(url_for(func_name))
            except: return redirect(url_for('index', sign_in=1))
        
        # SIGN UP PROCESS
        try: 
            checked = request.values['checkbox1']
            checked = 1
        except: checked = 0
        if db.users.find_one({ "basic-info.email-address": email }): sign_up_error = 1
        for document in db.users.find(): i = document['serial']
        try: serial = i
        except: serial = 0
        if sign_up_error != 1:
            new_user = User(serial)
            new_user.sign_up(serial, checked, fname, lname, email, password)
            visitor.user_id = int(serial+1)
            new_user.write_to_db(1)
            visitor.write_to_db(1)
            sign_up = 1
            return redirect(url_for(".account", sign_up=sign_up))
    return render_template("sign-up.html", ssError = sign_up_error, PubKey = public_key, Respond = None)


# SIGN OUT #
@app.route('/sign-out')
def sign_out():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor = visitor.retrieve_ip()
    visitor.user_id = 0
    visitor.write_to_db(1)
    return redirect(url_for("index", logout=1))


# TERMS OF USE #
@app.route('/terms-of-use', methods=['GET','POST'])
def terms_of_use(): return render_template("terms-of-use.html")


# PRIVACY POLICY #
@app.route('/privacy-policy', methods=['GET','POST'])
def privacy_policy(): return render_template("privacy-policy.html")


# OUR MISSION #
@app.route('/our-mission', methods=['GET','POST'])
def our_mission(): return render_template("our-mission.html")


# THE REASON THAT THERE ARE 2 PAGES BELOW WITH THE SAME FUNCTION IS THAT IN REAL SITUATION
# PEOPLE USUALLY DON'T KNOW WHICH TO USE, THAT'S WHY THEY CAN SEND THEIR MESSAGE THROUGH 2 ROUTES
# YOU CAN CONTACT US / SEND FEEDBACK EVERY 30 MINUTES TO PREVENT SPAM


# SEND FEEDBACK #
@app.route('/send-feedback', methods=['GET','POST'])
def send_feedback():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor.retrieve_ip()
    if request.method == 'POST':
        if visitor.timeout == 1:
            confirm_feedback = 2
        else:
            feedback_text = request.form['feedback']
            name1 = request.form['first-name']
            name2 = request.form['last-name']
            email1 = request.form['sign-up-email']
            if visitor.user_id != 0: acc = 'Registered client'
            else: acc = 'NON registered client'

            # SEND MAIL
            msg = Message('Feedback from: '+name1+" "+name2 , \
            sender = ('N Fit', 'nfitness.business@gmail.com') , recipients = ['<nfitness.business@gmail.com>'])
            msg.body = f'From: {email1}\nType: {acc}\nFeedback message:\n{feedback_text}'
            mail.send(msg)

            confirm_feedback = 1
            visitor.timeout = 1
            visitor.date_of_timeout = int(round(time.time()))
        visitor.write_to_db(1)
        return redirect(url_for('send_feedback', confirm_feedback=confirm_feedback))
    try: confirm_feedback = int(request.args['confirm_feedback'])
    except: confirm_feedback = 0
    return render_template("send-feedback.html", Sent = confirm_feedback)


# CONTACT US #
@app.route('/contact-us', methods=['GET','POST'])
def contact_us():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor.retrieve_ip()
    if request.method == 'POST':
        if visitor.timeout == 1:
            confirm_feedback = 2
        else:
            feedback_text = request.form['feedback']
            name1 = request.form['first-name']
            name2 = request.form['last-name']
            email1 = request.form['sign-up-email']
            if visitor.user_id != 0: acc = 'Registered client'
            else: acc = 'NON registered client'

            # SEND MAIL
            msg = Message('Feedback from: '+name1+" "+name2 , \
            sender = ('N Fit', 'nfitness.business@gmail.com') , recipients = ['<nfitness.business@gmail.com>'])
            msg.body = f'From: {email1}\nType: {acc}\nFeedback message:\n{feedback_text}'
            mail.send(msg)

            confirm_feedback = 1
            visitor.timeout = 1
            visitor.date_of_timeout = int(round(time.time()))
        visitor.write_to_db(1)
        return redirect(url_for('send_feedback', confirm_feedback=confirm_feedback))
    try: confirm_feedback = int(request.args['confirm_feedback'])
    except: confirm_feedback = 0
    return render_template("contact-us.html", Sent = confirm_feedback)


# How to reset your password?
# Fill in your email address and the API will send you a message with your verification code.
# If your email doesn't exist, it will ask you again. You can send a new code every 5 minutes.
# Fill in your new password.


# RESET PASSWORD #
@app.route('/reset-password', methods=['GET','POST'])
def reset_password():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor.retrieve_ip()
    visitor.code = ''
    if visitor.user_id == 0:
        if request.method == 'POST':
            visitor.display_email = "<" + request.form['reset'] + ">"
            lost_user = db.users.find_one({ "basic-info.email-address": request.form['reset'] })
            if lost_user == None:
                email_fail = 1
                return redirect(url_for('reset_password', email_fail=email_fail))
            else:
                visitor.code = ''.join(random.choice(string.digits) for i in range(6))
                cod = visitor.code
                visitor.write_to_db(1)

                # SEND MAIL
                msg = Message(f'Reset Code' , \
                sender = ('N Fit', 'nfitness.business@gmail.com') , \
                recipients = [visitor.display_email])
                msg.html = f'<p style="font-size: 25px;">Your code of confirmation is: <b>{cod}</b></p>'
                mail.send(msg)

                visitor.verified1 = 1
                visitor.temp_id = lost_user['serial']
            visitor.write_to_db(1)
            return redirect(url_for('next'))
        try: email_fail = int(request.args['email_fail'])
        except: email_fail = 0
        return render_template("reset-password.html", Fail = email_fail)
    return redirect(url_for('index'))


# RESET PASSWORD NEXT #
@app.route('/next', methods=['GET','POST'])
def next():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor.retrieve_ip()
    if visitor.user_id == 0 and visitor.verified1 == 1 and visitor.temp_id != 0:
        reloaded = 0
        reg_user = User(visitor.temp_id)
        reg_user = reg_user.retrieve_user()
        if int(time.time()) - reg_user.code_timer_date > 0:
            reg_user.code_timer_date = 0
        reg_user.write_to_db(1)
        if request.method == 'POST':
            try:
                if request.form['resend'] == 'yes':
                    visitor.code = ''.join(random.choice(string.digits) for i in range(6))
                    cod = visitor.code
                    visitor.write_to_db(1)

                    # SEND MAIL
                    msg = Message(f'Reset Code' , \
                    sender = ('N Fit', 'nfitness.business@gmail.com') , \
                    recipients = [visitor.display_email])
                    msg.html = f'<p style="font-size: 25px;">Your code of confirmation is: <b>{cod}</b></p>'
                    mail.send(msg)

                    reg_user.code_timer_date = int(round(time.time()*1000) + 300000)
                    reg_user.write_to_db(1)
                    reloaded = 1
            except:
                if request.form['code'] == visitor.code:
                    visitor.verified1 = 0
                    visitor.verified2 = 1
                    visitor.code = ''
                    visitor.write_to_db(1)
                    return redirect(url_for('new_password'))
                else:
                    wrong_code = 1
                    visitor.verified1 = 1
                    visitor.write_to_db(1)
                    return redirect(url_for('next', wrong_code=wrong_code))
        try: wrong_code = int(request.args['wrong_code'])
        except: wrong_code = 0
        timerdate = reg_user.code_timer_date
        return render_template("next.html", Email = visitor.display_email, \
        WrCode = wrong_code, Timer = timerdate, Reloaded = reloaded)
    return redirect(url_for('reset_password'))


# RESET NEW PASS #
@app.route('/new-password', methods=['GET','POST'])
def new_password():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor.retrieve_ip()
    if visitor.user_id == 0 and visitor.temp_id != 0:
        if visitor.verified2 == 1:
            visitor.verified1 = 0
            visitor.write_to_db(1)
            if request.method == 'POST':
                visitor.verified2 = 0
                reg_user = User(visitor.temp_id)
                reg_user = reg_user.retrieve_user()
                reg_user.basic_info.password = request.form['new-pass']
                changed_pass_2 = 1
                visitor.temp_id = 0
                visitor.write_to_db(1)
                reg_user.write_to_db(1)
                return redirect(url_for('sign_in', changed_pass_2=changed_pass_2))
            try: changed_pass_2 = int(request.args['changed_pass_2'])
            except: changed_pass_2 = 0
            return render_template("new-password.html", Changed = changed_pass_2)
        return redirect(url_for('reset_password'))
    return redirect(url_for('reset_password'))


# STRIPE - CALCULATE TOTAL PRICE #
def calculate_order_amount():
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor.retrieve_ip()
    t = visitor.temp_bag.total
    return int(float(t)*100)


# STRIPE - CREATE PAYMENT INTENT #
@app.route('/create-payment-intent', methods=['POST'])
def create_payment():
    try:
        intent = stripe.PaymentIntent.create(
            amount=calculate_order_amount(),
            currency='gbp'
        )
        return jsonify( {'clientSecret': intent['client_secret']} )
    except Exception as e:
        return jsonify(error=str(e)), 403


# How the checkout works?
# Every time a user goes to checkout, a 16 digit key will be generated to secure the checkout process.
# Stripe provides with a credit/debit card field.
# You fill your address and details and proceed to the thank you page.
# Email gets send with the checkout details, so the merchant can send them to the supplier.


# CHECKOUT PROCESS #
@app.route('/checkout/<key>', methods=['GET','POST'])
def checkout(key):
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor.retrieve_ip()
    discount = Discount()
    discount = discount.retrieve_discounts()
    if key == visitor.temp_bag.api_key:
        cid, access_token = paypal_call()

        # If you've entered a discount code, this will change the overall price
        try:
            if request.method == 'POST':
                codec = request.form['dc-code']
                discount.list.remove(codec)
                discount.write_to_db(1)
                visitor.temp_bag.discount_amount = float(visitor.temp_bag.total) * 0.15
                visitor.temp_bag.total = float(visitor.temp_bag.total) - visitor.temp_bag.discount_amount
                visitor.temp_bag.discount = 1
                visitor.write_to_db(1)
        except: pass

        # Input the data of the products
        di = float(visitor.temp_bag.discount_amount)
        discount2 = visitor.temp_bag.discount
        if int(visitor.temp_bag.from_bag) == 0:

            p = float(visitor.temp_bag.price)
            q = int(visitor.temp_bag.quantity)
            props = visitor.temp_bag.properties
            pn = visitor.temp_bag.p_key
            t = float(visitor.temp_bag.total)

            # TEMPLATE
            return render_template('checkout.html', Token=access_token, CID=cid, FromBag=0, Price=p, \
            Quantity=q, Props=props, PName=pn, Total=t, Api=key, Discount=discount2, Damount=di, GDiscount = discount)

        t = float(visitor.temp_bag.total)

        # TEMPLATE
        return render_template('checkout.html', Token=access_token, CID=cid, FromBag=1, \
        Total=t, Api=key, Discount=discount2, Damount=di, GDiscount = discount)

    return redirect(url_for('index'))


# THANK YOU PAGE #
@app.route('/thank-you/<key>', methods=['GET','POST'])
def thank_you(key):
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor.retrieve_ip()
    prods = visitor.temp_bag.return_json()
    prods2 = visitor.ip_bag.return_json()
    if key == visitor.api_key:
        try:
            try: express = int(request.args['express'])
            except: express = 0
            try: direct = int(request.args['direct'])
            except: direct = 0

            # If user is logged it, it will fill the details from their bag and empty them after completing order
            if visitor.user_id != 0:
                reg_user = User(visitor.user_id)
                reg_user = reg_user.retrieve_user()
                if reg_user.bag.list != []: prods = reg_user.bag.list
                reg_user.bag.list = []
                reg_user.bag.count = 0
                reg_user.wishlist.list = []
                reg_user.wishlist.count = 0
                reg_user.write_to_db(1)

            # If the customer uses the paypal option, only a notification will be send, the details are in your paypal account
            if express:

                if direct:
                    price1 = request.args['price']
                    quan1 = request.args['quantity']
                    props1 = request.args['props']
                    msg = Message(f'Shipping Order via PayPal' , \
                    sender = ('N Fit', 'nfitness.business@gmail.com') , recipients = ['<nfitness.business@gmail.com>'])
                    msg.body = \
                    f'Product Details: {price1} + {quan1} + {props1}'
                    mail.send(msg)
                    return redirect(url_for('thank_you', key=key))

                msg = Message(f'Shipping Order via PayPal' , \
                sender = ('N Fit', 'nfitness.business@gmail.com') , recipients = ['<nfitness.business@gmail.com>'])
                msg.body = \
                f'Product Details: {prods}\nProduct Details 2: {prods2}'
                mail.send(msg)
                return redirect(url_for('thank_you', key=key))

            # If the user chooses Stripe checkout, it will input the requested details, then empty them
            fname = request.args['fname']
            lname = request.args['lname']
            email = request.args['email']
            address = request.args['address']
            address2 = request.args['address2']
            postcode = request.args['postcode']
            city = request.args['city']
            country = request.args['country']
            comment = request.args['comment']
            msg = Message(f'Shipping Order from: {email}' , \
            sender = ('N Fit', 'nfitness.business@gmail.com') , recipients = ['<nfitness.business@gmail.com>'])
            msg.body = \
            f'First Name: {fname}\nLast Name: {lname}\nEmail: {email}\nAddress 1: {address}\nAddress 2: {address2}\nPostal Code: {postcode}\nCity: {city}\nCountry: {country}\nProduct Details: {prods}\nProduct Details 2: {prods2}\nComment: {comment}'
            mail.send(msg)

            visitor.temp_bag.price = 0
            visitor.temp_bag.quantity = 0
            visitor.temp_bag.properties = ""
            visitor.temp_bag.p_key = ""
            visitor.temp_bag.total = 0
            visitor.temp_bag.from_bag = 0
            visitor.temp_bag.discount = 0
            visitor.temp_bag.discount_amount = 0
            visitor.ip_bag.list = []
            visitor.ip_bag.count = 0
            visitor.write_to_db(1)
            return redirect(url_for('thank_you', key=key))
        except:

            # This is the final form the customer can use to express their satisfaction
            if request.method == 'POST':
                happy = request.form['happy']
                neutral = request.form['neutral']
                sad = request.form['sad']
                feedback = request.form['feedback']
                msg = Message(f'Thank You Page Feedback from {key}' , \
                sender = ('N Fit', '<nfitness.business@gmail.com>') , recipients = ['<nfitness.business@gmail.com>'])
                msg.body = \
                f'Happy: {happy}\nNeutral: {neutral}\nSad: {sad}\nFeedback: {feedback}'
                mail.send(msg)
                visitor.temp_bag.api_key = ""
                visitor.write_to_db(1)
                return redirect(url_for('index'))
            return render_template('thank-you.html')
    return redirect(url_for('index'))


# COOKIE PAGE | TELLS THE API YOUR COOKIE PREFERENCES # 
@app.route('/reject', methods=['GET','POST'])
def reject():
    func = request.args['page']
    real_ip = request.environ.get('HTTP_X_REAL_IP' , request.remote_addr)
    visitor = IP_Address(real_ip)
    visitor.retrieve_ip()
    visitor.cookies_message = 0
    if request.args['cookies'] == '1': visitor.cookies = 1
    else: visitor.cookies = 0
    visitor.write_to_db(1)
    return redirect(url_for(func))


# SEO TOOLS #
@app.route("/sitemap.xml")
def sitemap_xml(): return render_template('sitemap.xml')
@app.route("/robots.txt")
def robots_txt(): return render_template("robots.txt")
@app.route('/favicon.ico')
def favicon(): return send_from_directory(os.path.join(app.root_path,'static'),'favicon.ico',mimetype='image/vnd.microsoft.icon')


# DEVELOPMENT MODE #
if __name__ == "__main__": app.run(debug=True)
