"use strict";
exports.__esModule = true;
const client = require("./database")
exports.runAuction = exports.getHeapBids = exports.getBids = exports.Auction = exports.BiddersHeap = exports.Bid = void 0;
var Bid = /** @class */ (function () {
    function Bid(email, password, dollars, interest) {
        this.email = email;
        this.password = password;
        this.dollars = dollars;
        this.interest = interest;
    }
    Bid.prototype.toString = function () {
        return "Investor: " + this.email + ", is investing: $" + this.dollars + ", and expects an interest of: " + this.interest + "%";
    };
    return Bid;
}());
exports.Bid = Bid;
var BiddersHeap = /** @class */ (function () {
    function BiddersHeap() {
        this.listOfBids = new Array();
    }
    BiddersHeap.prototype.add = function (bid) {
        var index = this.listOfBids.push(bid) - 1;
        while (index > 0) {
            //get parent
            var parent = Math.floor((index - 1) / 2);
            //swap parent if it has higher interest rate
            if (this.listOfBids[index].interest < this.listOfBids[parent].interest) {
                var temp = this.listOfBids[parent];
                this.listOfBids[parent] = this.listOfBids[index];
                this.listOfBids[index] = temp;
            }
            index = parent;
        }
    };
    //removes lowest interest rate bid from the heap and returns it
    BiddersHeap.prototype.pop = function () {
        var bestBid = this.listOfBids[0];
        if (this.listOfBids.length == 1) {
            this.listOfBids = new Array();
            return bestBid;
        }
        this.listOfBids[0] = this.listOfBids.pop();
        var index = 0;
        while (index < this.listOfBids.length) {
            var leftchild = (index + 1) * 2 - 1;
            var rightchild = leftchild + 1;
            var child;
            if (leftchild < this.listOfBids.length || rightchild < this.listOfBids.length) {
                if (leftchild >= this.listOfBids.length) {
                    child = rightchild;
                }
                else if (rightchild >= this.listOfBids.length) {
                    child = leftchild;
                }
                else if (this.listOfBids[leftchild].interest < this.listOfBids[rightchild].interest)
                    child = leftchild;
                else
                    child = rightchild;
            }
            else {
                break;
            }
            //swap if smaller
            if (this.listOfBids[index].interest > this.listOfBids[child].interest) {
                var temp = this.listOfBids[index];
                this.listOfBids[index] = this.listOfBids[child];
                this.listOfBids[child] = temp;
                index = child;
            }
            else
                break;
        }
        return bestBid;
    };
    BiddersHeap.prototype.display = function () {
        console.log("Displaying heap");
        var level = 1;
        var log = "";
        for (var index = 0; index < this.listOfBids.length; index++) {
            var element = this.listOfBids[index];
            if (index >= level) {
                level += 2 * level;
                console.log(log);
                log = "";
            }
            log += element.email + ": " + element.interest + "|";
        }
        console.log(log);
    };
    BiddersHeap.prototype.size = function () {
        return this.listOfBids.length;
    };
    return BiddersHeap;
}());
exports.BiddersHeap = BiddersHeap;
var Auction = /** @class */ (function () {
    function Auction() {
        console.log("Running auction test");
        this.money = 0;
        var bids = this.getHeapBids(this.getBids());
        if (bids == null || bids.size() == 0) {
            console.log("has not fetched data");
            return;
        }
        this.bidders = new Array();
        while (this.money < getCost() && bids.size() > 0) {
            this.bidders.push(bids.pop());
            this.money += this.bidders[this.bidders.length - 1].dollars;
        }
        if (this.money >= getCost())
            return;
        else
            return;
    }
    Auction.prototype.getHeapBids = function (bids) {
        var bidHeap = new BiddersHeap();
        this.getBids().forEach(function (element) {
            bidHeap.add(element);
        });
        return bidHeap;
    };
    Auction.prototype.getBids = function () {
        var bidders = new Array();
        console.log("here");
        client.query('SELECT * FROM users', (err, res) => {
            if (err) { 
                console.log(err);
            } else {
                for (let row of res.rows) {
                    bidders.push(new Bid(row.email, row.password, row.dollars, row.interest));
                    //console.log(row.email);
                }
            }
        });
        //temporary, method for testing and demoing 
        
        bidders.push(new Bid("red", "tie", 500, 3));
        bidders.push(new Bid("Darren", "tie", 200, 13));
        bidders.push(new Bid("Vard", "tie", 300, 1));
        bidders.push(new Bid("Carren", "tie", 5000, 34));
        bidders.push(new Bid("Crin", "tie", 5000, 334));
        bidders.push(new Bid("ealonor", "tie", 5000, 231));
        bidders.push(new Bid("Meg", "tie", 5000, 50));
        return bidders;
    };
    Auction.prototype.getCost = function () {

        document.getElementById("Cost").innerHTML = 5000;
    };
    Auction.prototype.funded = function () {
        if(this.money > getCost())
            document.getElementById("funded").innerHTML = "fully funded";
        else
        document.getElementById("funded").innerHTML = "under funded";
    };
    Auction.prototype.percentComplete = function () {
        document.getElementById("level").innerHTML = this.money / getCost();
    };
    Auction.prototype.getInterestRate = function () {
        console.log(this.bidders[this.bidders.length - 1].interest);
        //if (this.percentComplete() >= 1)
        //    document.getElementById("interest").innerHTML = this.bidders[this.bidders.length - 1].interest;
    };

    return Auction;
}());
exports.Auction = Auction;
//getters
function getCost() {
    return 1000;
}
function getMaxInterest() {
    return 50;
}

var auction = new Auction();
console.log(auction.getHeapBids());

var auction = new Auction();
console.log(auction.getBids());

var auction = new Auction();
console.log(auction.getCost());

var auction = new Auction();
console.log(auction.getInterestRate());

var auction = new Auction();
console.log(auction.getfunded());

var auction = new Auction();
console.log(auction.getInterestRate());