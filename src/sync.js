var Asyn = function() {
    this.list = [];
    this._endItem = null;
    this.isRunning = false;
};
Asyn.prototype.then = function(fn, callback) {
    this.list.push({
        fn: fn,
        callback: callback
    });
    this.run();
    return this;
}
Asyn.prototype.run = function() {
    if (this.isRunning) {
        return;
    }
    this.isRunning = true;
    var item = this.list.shift();

    this._runItem(item);
};
Asyn.prototype.end = function(fn, callback) {
    this._endItem = {
        fn: fn,
        callback: callback
    };
    return this;
};
Asyn.prototype._runEnd = function() {
    this._runItem(this._endItem, true);
};
Asyn.prototype._runItem = function(item, isEnd) {
    if (item) {
        var callback = (function(callback, isEnd, err, data) {
            var ret = true;
            if (callback) {
                var args = Array.prototype.slice.call(arguments);
                args.shift();

                ret = callback.apply(item.scope || this, args);
            }
            this.isRunning = false;

            if (!isEnd) {
                //如果上一个callback的执行结果不是false，则继续执行下一个异步
                if (ret !== false) {
                    this.run();
                } else {
                    this._runEnd();
                }
            }
        }).bind(this, item.callback, isEnd);

        item.fn(callback);
    } else {
        this.isRunning = false;
    }
};

module.exports.runAsyn = function(fn, callback) {
    var ins = new Asyn();
    ins.then(fn, callback);
    return ins;
};
