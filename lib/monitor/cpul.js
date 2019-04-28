var si = require('systeminformation'),
    utils = require('../utils');

var colors = utils.colors;

var pars = {
    n: 'num',
    p: 'perc'
}

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
    this.cpuData = data.cpus.map((cpu, i) => {
        return [
            'CPU' + (i+1);
            cpu.load
        ]
    })
    var headers = ['name','value'];
    this.table.setData({
        headers: headers,
        data: cpuData
    })
    this.table.screen.render();
}
