import json, time
from nfit import db


class IP_Address:
    # The default values of the variables, saves only the IP
    def __init__(self, ip_address):
        self.ip_address = ip_address
        self.timeout = 0
        self.date_of_timeout = 0
        self.cookies_message = 1
        self.cookies = 1
        self.pop_timeout = 0
        self.pop_date = 0
        self.gifter = 0
        self.receiver = 0
        self.user_id  = 0
        self.temp_id  = 0
        self.code  = ""
        self.display_email  = ""
        self.verified1  = 0
        self.verified2  = 0
        self.urls  = []
        self.api_key = ""
        self.temp_bag = TempBag()
        self.ip_bag = IP_Bag()
    
    # Finds a matching document in the database using the IP and inputs it in the variables, returns self
    def retrieve_ip(self):
        result = db.ips.find_one({"ip-address": self.ip_address})
        if result == None:
            return 0
        #
        self.timeout = result['timeout']
        self.date_of_timeout = result['date-of-timeout']
        self.cookies_message = result['cookies-message']
        self.cookies = result['cookies']
        self.pop_timeout = result['pop-timeout']
        self.pop_date = result['pop-date']
        self.gifter = result['gifter']
        self.receiver = result['receiver']
        self.user_id  = result['user-id']
        self.temp_id  = result['temp-id']
        self.code  = result['code']
        self.display_email  = result['display-email']
        self.verified1  = result['verified1']
        self.verified2  = result['verified2']
        self.urls  = result['urls']
        self.api_key = result['api-key']
        #
        self.temp_bag.fill_object(result['temp-bag']['price'], result['temp-bag']['quantity'], \
        result['temp-bag']['properties'], result['temp-bag']['p-key'], result['temp-bag']['total'], \
        result['temp-bag']['from-bag'], result['temp-bag']['api-key'], result['temp-bag']['discount'], \
        result['temp-bag']['discount-amount'])
        #
        self.ip_bag.fill_object(result['ip-bag']['count'], result['ip-bag']['list'])
        return self

    # If the product isn't it the bag, it adds it with its properties
    # If the product is in the bag already, it adds quantity and overwrites the properties
    def add_to_bag(self, key, price, properties, quantity):
        if key not in self.ip_bag.list and self.ip_bag.count <= 4:
            tempDict = {
                'key' : key,
                'quantity' : int(quantity),
                'properties' : properties,
                'total-price' : float("%.2f" % (float(price) * int(quantity)))
            }
            self.ip_bag.count += 1
            self.ip_bag.list.append(key)
            self.ip_bag.list.append(tempDict)
        else:
            index = self.ip_bag.list.index(key)
            quan = int(self.ip_bag.list[index + 1]['quantity'])
            quan += int(quantity)
            total = float(price) * quan
            total2 = float("%.2f" % total)
            self.ip_bag.list[index + 1]['quantity'] = quan
            self.ip_bag.list[index + 1]['properties'] = properties
            self.ip_bag.list[index + 1]['total-price'] = total2
        return 1
    
    # Removes an item from the bag
    def modify_bag(self, uname, act):
        if uname in self.ip_bag.list:
            if act == 'remove':
                self.ip_bag.count = self.ip_bag.count - 1
                dex = self.ip_bag.list.index(uname)
                self.ip_bag.list.remove(uname)
                del self.ip_bag.list[dex]
                return 1
        return 0
    
    # Changes the properties to the ones given in the arguments
    def bag_change_properties(self, props, quant, dex, index):
        if int(quant) == 0:
            self.ip_bag.count = self.ip_bag.count - 1
            self.ip_bag.list.remove(index)
            del self.ip_bag.list[dex]
        else:
            with open("products.json", "r+", encoding="utf-8") as file: products = json.load(file)
            self.ip_bag.list[dex + 1]['quantity'] = int(quant)
            self.ip_bag.list[dex + 1]['properties'] = props
            self.ip_bag.list[dex + 1]['total-price'] = float(products[index]['total'])*int(quant)
        return 1

    # Sets a gifter indicator. Once set, the gifter cannot receive discount codes until a receiver clicks on a link to reset it
    # Sets a timeout for the referral popup
    def set_gifter(self):
        if self.gifter == 0:
            self.gifter = 1
            self.pop_timeout = 1
            self.pop_date = int(round(time.time()))
            return 1
        return 0


    # Sets a timeout for the referral popup 
    def set_pop_timeout(self):
        self.pop_timeout = 1
        self.pop_date = int(round(time.time()))
        return 1

    # Fills api_key and total price of the products
    def fill_checkout_details(self, api_key):
        self.temp_bag.api_key = api_key
        blist = self.ip_bag.list
        self.temp_bag.total = 0
        self.temp_bag.from_bag = 1
        for i in range(1,len(blist),2):
            dic = blist[i]
            self.temp_bag.total = float(self.temp_bag.total) + float(dic['total-price'])

    # Reset the discount if the customer exits one of the following pages
    def reset_discount(self, path):
        if 'referral' not in path and 'checkout' not in path and 'thank-you' not in path and \
        'create-payment' not in path and 'ngun-classic' not in path and \
        'neck-massager' not in path and 'ngun-mini' not in path and 'mod-wishlist' not in path:
            self.temp_bag.api_key = ""
            self.temp_bag.discount = 0
            return 1
        return 0

    # Resets temporary id, used for reset password process
    def reset_temp_id(self):
        if self.temp_id != 0:
            self.temp_id = 0
            return 1
        return 0
    
    # Resets the 30 minutes timeout for sending feedback
    def reset_feedback_timeout(self):
        if int(round(time.time())) - self.date_of_timeout > 1800 and self.date_of_timeout != 0:
            self.timeout = 0
            self.date_of_timeout = 0
            return 1
        return 0
    
    # Resets the 1 hour timeout of the popup
    def reset_popup_timeout(self):
        if int(round(time.time())) - self.pop_date > 3600 and self.pop_date != 0:
            self.pop_timeout = 0
            self.pop_date = 0
            return 1
        return 0
    
    # If the user is logged in, it fills their personal details and uses them for display
    def add_user_data(self):
        if self.user_id != 0:
            user = db.users.find_one({"serial": self.user_id})
            subbed = user["subbed"]
            ship = user["shipping-info"]
            wishlist = user["wishlist"]
            basic_info = user["basic-info"]
            return subbed, ship, wishlist, basic_info
        else:
            wishlist = {
                "count": 0, 
                "list": []}
            return None, {}, wishlist, {}

    # Adds the class to the database, either append a new IP or update an existing one
    def write_to_db(self, update):
        new_ip = {
            "ip-address": self.ip_address,
            "timeout": self.timeout,
            "date-of-timeout": self.date_of_timeout,
            "cookies-message": self.cookies_message,
            "cookies": self.cookies,
            "pop-timeout": self.pop_timeout,
            "pop-date": self.pop_date,
            "gifter": self.gifter,
            "receiver": self.receiver,
            "user-id" : self.user_id,
            "temp-id" : self.temp_id,
            "code" : self.code,
            "display-email" : self.display_email,
            "verified1" : self.verified1,
            "verified2" : self.verified2,
            "urls" : self.urls,
            "api-key": self.api_key,
            "temp-bag": {
                "price": self.temp_bag.price,
                "quantity": self.temp_bag.quantity,
                "properties": self.temp_bag.properties,
                "p-key": self.temp_bag.p_key,
                "total": self.temp_bag.total,
                "from-bag": self.temp_bag.from_bag,
                "api-key": self.temp_bag.api_key,
                "discount": self.temp_bag.discount,
                "discount-amount": self.temp_bag.discount_amount
            },
            "ip-bag": {
                "count": self.ip_bag.count, 
                "list": self.ip_bag.list
            }
        }
        # Check if the IP already exists in DB
        same_ip = db.ips.find_one({"ip-address": new_ip["ip-address"]})
        if same_ip != None and update:
            db.ips.replace_one(same_ip, new_ip)
            return 0
        if same_ip == None:
            db.ips.insert(new_ip)
            return 1
        return "OK"

    # Returns the class in a dictionary format
    def return_json(self, ip):
        doc = db.ips.find_one({ "ip-address": ip })
        return doc


class TempBag:
    # Default values
    def __init__(self):
        self.price = 0
        self.quantity = 0
        self.properties = ""
        self.p_key = ""
        self.total = 0
        self.from_bag = 0
        self.api_key = ""
        self.discount = 0
        self.discount_amount = 0

    # Fills the class with the given arguments
    def fill_object(self, price, quantity, properties, p_key, total, from_bag, api_key, discount, discount_amount):
        self.price = price
        self.quantity = quantity
        self.properties = properties
        self.p_key = p_key
        self.total = total
        self.from_bag = from_bag
        self.api_key = api_key
        self.discount = discount
        self.discount_amount = discount_amount
        return 1
    
    # Returns a dictionary format of the object
    def return_json(self):
        tb = {
            "price": self.price,
            "quantity": self.quantity,
            "properties": self.properties,
            "p-key": self.p_key,
            "total": self.total,
            "from-bag": self.from_bag,
            "api-key": self.api_key,
            "discount": self.discount,
            "discount-amount": self.discount_amount
        }
        return tb


class IP_Bag:
    # Default values
    def __init__(self):
        self.count = 0
        self.list = []
    
    # Fills the class with the given arguments
    def fill_object(self, count, list):
        self.count = count
        self.list = list
        return 1
    
    # Returns a dictionary format of the object
    def return_json(self):
        ib = {
            "count": self.count,
            "list": self.list
        }
        return ib