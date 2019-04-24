var si = require('systeminformation'),
  utils = require('../utils');

var colors = utils.colors;

function Cpul(table) {
  this.table = table;
  
  var updater = function() {
      si.processes(data => {
      //si.currentLoad(data => {
          this.updateData(data);
      })
  }
  updater();
  this.interval = setInterval(updater, 1000);
}

Cpul.prototype.updateData = function(data) {
  var data = data.list
    .map(p => {
      return [
        p.pid,
        p.command, //.slice(0,10),
        ' ' + p.pcpu.toFixed(1),
        p.pmem.toFixed(1)
      ]
    })

  var headers = ['PID', 'Command', '%CPU', '%MEM'];

  headers[{
    pid: 0,
    pcpu: 2,
    pmem: 3
  }[this.pSort]] += this.reverse ? '▲' : '▼';


  this.table.setData({
    headers: headers,
    data: this.reverse ? data.reverse() : data
  })

  if (this.reIndex) {
    this.table.rows.select(0);
    this.reIndex = false;
  }

  this.table.screen.render();
};
/*
  var data = data.list
    .sort()

  this.table.setData(
   { data: data })

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

  this.table.screen.render();
};
*/
module.exports = Cpul;
