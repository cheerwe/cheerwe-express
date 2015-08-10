
module.exports = {
    helper: require('./src/helper'),
    initContext: require('./src/context'),
    then: function (fn, callback) {
        return queue.then(fn, callback);
    }
};
