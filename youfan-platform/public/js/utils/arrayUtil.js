if (!Array.targetIndexOf) {
    Array.prototype.targetIndexOf = function (Object) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == Object) {
                return i;
            }
        }
        return -1;
    }
}