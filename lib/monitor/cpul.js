var si = require('systeminformation'),
  utils = require('../utils');

var colors = utils.colors;

function Cpul(table) {
  this.table = table;
  
  var updater = function() {
    si.currentLoad(data => {
      this.updateData(data);
    })
  }
  updater();
  this.interval = setInterval(updater, 1000);
}

Cpul.prototype.updateData = function(data) {
  this.table.setData(
   { headers: ['col1', 'col2']
   , data:
      [ [1, 2]
      , [4, 5] ]})
/*
  this.cpuData = data.cpus.forEach((cpu, i) => {
      return {
         title: 'CPU' + (i+1),
         percentage: cpu.load.toFixed(1).toString();
      }
    })
  this.data = cpuData.list.map(p => {
        return [
            p.title,
            p.percentage
        ]
      })

  var headers = ['CPU', '%'];

  this.table.setData({
    headers: headers,
    data: this.data
  })

*/
  this.table.screen.render();
};

module.exports = Cpul;
