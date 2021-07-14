module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.add = function(item, id, qty) {
        var cartItem = this.items[id];
        console.log(item._id);
        if (!cartItem) {
            cartItem = this.items[id] = { item: item, quantity: 0, price: 0, mrp: 0 };
        }
        cartItem.quantity += Number(qty);
        cartItem.mrp = item.price;
        cartItem.price = item.price * cartItem.quantity;
        this.totalItems += Number(qty);
        this.totalPrice += item.price * Number(qty);
    };
    this.remove = function(id, qty) {
        var diff = Number(qty);
        this.totalItems -= diff;
        this.totalPrice -= this.items[id].mrp * diff;
        if (diff == this.items[id].quantity) {
            delete this.items[id];
        } else {
            this.items[id].quantity -= diff;
            this.items[id].price -= this.items[id].mrp * diff;
        }
    };
    this.getItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};