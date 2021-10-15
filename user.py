from nfit import db


class User:
    # Default values, saves only the serial number
    def __init__(self, serial):
        self.serial = serial
        self.subbed = 0
        self.code_timer_date = 0
        self.basic_info = Basic_Info(0,0,0,0)
        self.shipping_info = {}
        self.bag = Bag()
        self.wishlist = Wishlist()
    
    # Modifies the wishlist of a user, count and items
    def modify_wishlist(self, uname, act):
        if uname not in self.wishlist.list:
            if act == 'add':
                self.wishlist.count = self.wishlist.count + 1
                self.wishlist.list.append(uname)
        if uname in self.wishlist.list:
            if act == 'remove':
                self.wishlist.count = self.wishlist.count - 1
                self.wishlist.list.remove(uname)
        return self.wishlist.count, self.wishlist.list

    # Fills the given basic info of the user
    def sign_up(self, i, checked, fname, lname, email, password):
        self.serial = i+1
        self.subbed = checked
        self.basic_info = Basic_Info(fname, lname, email, password)

    # Deletes the account from the database
    def delete_account(self):
        db.users.delete_one({ "serial": self.serial })
        i = 1
        for document in db.users.find():
            document['serial'] = i
            i += 1
        return 1
    
    # Finds a matching document in the database using the serial number and inputs it in the variables, returns self
    def retrieve_user(self):
        result = db.users.find_one({"serial": self.serial})
        #
        self.serial = result['serial']
        self.subbed = result['subbed']
        self.code_timer_date = result['code-timer-date']
        self.basic_info.fill_object(result['basic-info']['first-name'], result['basic-info']['last-name'], \
        result['basic-info']['email-address'], result['basic-info']['password'])
        self.shipping_info = result['shipping-info']
        self.bag.fill_object(result['bag']['count'], result['bag']['list'])
        self.wishlist.fill_object(result['wishlist']['count'], result['wishlist']['list'])
        #
        return self

    # Adds the class to the database, either append a new account or update an existing one
    def write_to_db(self, update):
        new_user = {
            "serial": self.serial, 
            "subbed": self.subbed, 
            "code-timer-date": self.code_timer_date, 
            "basic-info": {
                "first-name": self.basic_info.fname, 
                "last-name": self.basic_info.lname, 
                "email-address": self.basic_info.email, 
                "password": self.basic_info.password, 
            }, 
            "shipping-info": self.shipping_info, 
            "bag": {
                "count": self.bag.count, 
                "list": self.bag.list, 
            }, 
            "wishlist": {
                "count": self.wishlist.count, 
                "list": self.wishlist.list, 
            }, 
        }
        # Check if the User already exists in DB
        same_user = db.users.find_one({"serial": new_user["serial"]})
        if same_user != None and update:
            db.users.replace_one(same_user, new_user)
            return 0
        if same_user == None:
            db.users.insert(new_user)
            return 1
        return "OK"

class Basic_Info:
    # Default values
    def __init__(self, fname, lname, email, password):
        self.fname = fname
        self.lname = lname
        self.email = email
        self.password = password

    # Fills the class with the given arguments
    def fill_object(self, fname, lname, email, password):
        self.fname = fname
        self.lname = lname
        self.email = email
        self.password = password
        return 1

class Bag:
    # Default values
    def __init__(self):
        self.count = 0
        self.list = []

    # Fills the class with the given arguments
    def fill_object(self, count, list):
        self.count = count
        self.list = list
        return 1

class Wishlist:
    # Default values
    def __init__(self):
        self.count = 0
        self.list = []

    # Fills the class with the given arguments
    def fill_object(self, count, list):
        self.count = count
        self.list = list
        return 1