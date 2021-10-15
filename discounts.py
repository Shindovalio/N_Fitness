import random, string
from nfit import db

# The exists only 1 object of this class, used for giving discount codes

class Discount:
    def __init__(self):
        self.discount_rate = 15
        self.last_taken = 0
        self.pop_links = []

        # The best option is to create a control panel/dashboard that can be accessed only by admins
        # and make a function that adds discount codes automatically, but unfortunately the time frame doesn't allow it
        
        self.list = [
            "GWCQGYL8CUF9VTHV", "GPO8Y6QIPTXKI67U", "5TZI2JLQUC1LNDOF", "ITXA2VUYA4R9BBE6", "BLHDHK033A6VFG1T", "KLOO9SYHRNN0N1PG", 
            "JD2TJ8R9VJM5HMJA", "QHONBWLQ8N37DBWK", "C3TA37BEH55L9WS9", "P7BVI4A2PZLU3VYQ", "WDWELCX1BQ1VLEOH", "WX7D2S8CYBR31G3X", 
            "3URC3AQ3I3BZPFPO", "Q56LQ1GMWJSRLZM5", "47PDPNV1O3V1TT4O", "D9V1Q30AVDW6FMQA", "UAPS5QGMRN7II509", "K2BK9CUE6YDARL8S", 
            "DG0ZPS4RULPMZDNL", "36960IC2CONL61IB", "2KAOXCH912CLVTVA", "Y3M4S3NK88JX1284", "CE447HCFRSG4LU5S", "GNCGXO6H4QLTLF6O", 
            "27O0J2SEDFYMK44Q", "UWDNF5POLV7EKUH7", "9VU4KZOY0Q7YXDW3", "VVZEYHGOYDXLDF4M", "FL5ANHCATCSBEQPM", "VV1ROE4V91SXN447", 
            "GSAO7EFH2EBQRQNO", "MQQ4QR30TLB898NA", "XJ49OKQT609KRIBS", "QSZOL3VW60ECKSB5", "GYLJQZ2Y8LLIVS1N", "LB0IA3A1YPEGSU49", 
            "7HT79CO2D6L677Q8", "MQDOLQM3U5CHAEM0", "4NAUXP4N3X3EEHV0", "UHT9SGNTA6IH0TPA", "4430F9FEOUEV3H5I", "MSTGKHV083LPV6PH", 
            "AOVPE0I9JLAPJBBR", "URORCRMW710QW30A", "ZXYMABQXOHSI31W4", "VJXWMU4A7TIO7KQ5", "NI36F9IN2DAARDJS", "D62T7SEG5MAXQ2PZ", 
            "ZGTAKH0HP29M1LRI", "RM7OPID63XQKFN64", "JCSLYN5C4940XADW", "T5QWQUIC4NN0CZCD", "XL5R77FFK268VJFG", "Q169EL8S63XK5WI6"
        ]
        self.list_give = [ 
            "RBTEUC1YDRD5FXE5", "QAETMRP7G6EZZ6RJ", "5G7OSWHV2VAY4VVZ", "M7QCO9Z17B6OYY19", "0JOJH64VE4RZROZ8", "A9NPFSLJ8WIZEEJG", 
            "C6SG2LX9T78PCCJN", "48CG05KOYI9M6INW", "JSPR1C4RKUS6GCDJ", "KZAW2X9IDHZPZCGT", "UHOPJTRIPDRKZDEG", "FM0UMU8AISNVQJ5O", 
            "NPF3M2KF0YY2PQ8V", "415AQ7TU9NO8MXVU", "S464N32KFZUQYD4O", "N0Y95HS7C72YT0RW", "F5CYYWP5GB37XSZ7", "WLEEEKAYIAZIXU62", 
            "DBYS7I5B9W0WTPOT", "M5W6LCQ6AXZVQB91", "CHTBAC0BRYA6SMJK", "HTNIZREH5QRKECOQ", "AKQ1I8JT8V2HW26E", "86X6F9DCZ5JAVAMS", 
            "BJCLP6MMTZ915QC8", "8E96ND0MU3FZA4XG", "IYERQTB5IK70SGZ4", "HP0CXT8HJMWBM79O", "YGFXA7ZQJP2VWBLB", "TYIKT9UYW5CHSXSW", 
            "2IR66EEB4ZGJUAF2", "UZ6DD0DORKZFA9EC", "4NZT12GHW31CF0IE", "XN0BA3IV9X2JSRBJ", "PVD8LNX3YHLTNA76", "UOK09H2Z414X8C88", 
            "O8HVMMGINUL69Q20", "WXHQPNOWKJQZTB0C", "QY40TNESSO4UN8IC", "YETVSLZDV98MKC0H", "JMQBVRVMRXWO72U4", "7KLENKY2K4JQB89K", 
            "W6GV9HQ2NO5ACCEL", "BN1PA8XLSJ83ZDGZ", "YBP1PNWQ5V0BFNNG", "VE76UM8DB8EQCP6W"
        ]
    
    # Appends the ip and the link of the user who has requested a referral
    def append_gifter(self, ip):
        link = ''.join(random.choice(string.digits) for i in range(16))
        self.pop_links.append([ip, link])
        return link

    # Checks if the link matches the one that has been saved in the gifter list
    def check_links(self, link):
        for i in range(0, len(self.pop_links)):
            if link in self.pop_links[i]:
                gifter_ip = self.pop_links[i][0]
                check = 1
                listec = self.pop_links[i]
                return gifter_ip, check, listec
        return 0,0,0

    # Appends the codes for usage and removes them from the list
    def finish_discount(self, listec):
        self.pop_links.remove(listec)
        code1 = self.list_give[0]
        code2 = self.list_give[1]
        del self.list_give[0]
        del self.list_give[0]
        self.list.append(code1)
        self.list.append(code2)
        return code1, code2

    # Finds the matching document in the database
    def retrieve_discounts(self):
        result = db.discounts.find_one({"discount-rate": self.discount_rate})
        if result == None:
            return self
        self.discount_rate = result['discount-rate']
        self.last_taken = result['last-taken']
        self.pop_links = result['pop-links']
        self.list = result['list']
        self.list_give = result['list-give']
        return self
    
    # Updates the database, if it's a first call of the function it appends the object to the DB
    def write_to_db(self, update):
        new_discount = {
            "discount-rate": self.discount_rate, 
            "last-taken": self.last_taken, 
            "pop-links": self.pop_links, 
            "list": self.list, 
            "list-give": self.list_give
        }
        # Check if the Discount already exists in DB
        same_discount = db.discounts.find_one({"discount-rate": 15})
        if same_discount != None and update:
            db.discounts.replace_one(same_discount, new_discount)
            return 0
        if same_discount == None:
            db.discounts.insert(new_discount)
            return 1
        return "OK"