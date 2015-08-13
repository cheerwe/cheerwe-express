var helper = require('./helper');
var Util = require('cheerwe-util');


var resContext = {
    /**
     * 写JSON
     * @param [Boolean] succ 异步交互是否成功
     * @param [Object] data 需要异步返回的数据
     * @param [string] msg 前台返回的消息
     */
    sendJson: function (succ, data, msg) {
        var json = helper.resJson(succ, data, msg);
        this.send(json)
    },
    sendSucc: function (data, msg) {
        this.sendJson(true, data, msg);
    },
    sendFail: function (data, msg) {
        this.sendJson(false, data, msg);
    },
    sendError: function (error) {
        this.sendJson(false, error, error.message);
    },
    /**
     * 设置PageMode
     * @param pm 需要设置的PageMode，使用覆盖的方式
     */
    setPM: function (pm, applyIf) {
        this.pageMode = this.pageMode || {};
        if (applyIf) {
            Util.applyIf(this.pageMode, pm);
        } else {
            Util.apply(this.pageMode, pm);
        }
    }
};

var reqContext = {
    /**
     * 获取参数名为ID的URL参数
     */
    getId: function () {
        return this.param('id');
    },
    /**
     * 根据mode指定的变量值，获取一个对象
     * @mode ['username','password']
     */
    getMode: function (mode) {
        return helper.getReqMode(this, mode);
    },
    /**
     * 获取参数名称为condition的JSON字符串表单数据，并转换成对象
     */
    getCondition: function () {
        return helper.getReqCondition(this);
    }
}
module.exports = function (req, res) {
    Util.apply(req, reqContext);
    Util.apply(res, resContext);
};
