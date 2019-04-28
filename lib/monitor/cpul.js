var si = require('systeminformation'),
    utils = require('../utils');

var colors = utils.colors;

function Cpul(table) {
    this.table = table;
    var that = this;

    var updater = function() {
        si.currentLoad(data => {
            that.updateData(data);
        })
    }
    updater();
    this.interval = setInterval(updater, 1000);
}

Cpul.prototype.updateData = function(data) {
    this.cpuData = data.cpus
        .map((cpu, i) => {
            return [
                'CPU' + (i+1),
                cpu.load.toFixed(1)
            ]
        })
        .sort(function(a, b) {
            return b[1] - a[1];
        })
    var headers = ['CPU','(%)'];
    this.table.setData(
        { headers: headers
        , data: this.cpuData })
    this.table.screen.render();
};

module.exports = Cpul;
