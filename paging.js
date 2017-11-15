/**
 * 分页组件
 * @param data 分页数据 Array
 * @param node 单页列表所在的元素
 * @param father 页码所在的元素
 * @constructor
 */
function Paging(data, node, father, config) {
  return new Paging.prototype.init(data, node, father, config)
}

Paging.prototype =  {
  constructor: Paging,
  pageSize: 5,
  paginationSize: 10,
  init: function(data, node, father, config) {
    this.dom = father
    this.node = node
    this.pageNum = 1
    if(config){
      config.pageSize && (this.pageSize = config.pageSize)
      config.paginationSize && (this.paginationSize = config.paginationSize)
    }
    var eventList = node && node.pagingEventList
    if (eventList) {
      eventList.forEach(function (v) {
        node.removeEventListener(v.event, v.fn)
      })
    }
    node.pagingEventList = []
    var oldUl = father.querySelector('.paging-pagination')
    oldUl && father.removeChild(oldUl)
    if (data && data.length > 0) {
      this.data = data
      this.maxPage = Math.ceil(data.length / this.pageSize)
      this.initPagination()
    } else {
      this.isEmpty = true
    }
    return this
  },
  getData: function (num) {
    var self = this
    if (num > 0 && num <= self.maxPage) {
      var arr = []
      self.pageNum = num
      for (var i = self.pageSize * (num - 1); i < self.pageSize * num; i++) {
        if (self.data[i]) {
          arr.push(self.data[i])
        } else {
          break
        }
      }
      self.ul.innerHTML = self.setPagination()
      Array.prototype.forEach.call(self.ul.getElementsByTagName('li'), function (v) {
        if (v.innerHTML === self.pageNum + '') {
          v.className += ' current'
        }
      })
      return arr
    } else if (num === 0) {
      alert('已经是第一页了')
    } else {
      alert('已经是最后一页了')
    }
  },
  update: function(data) {
    this.pageNum = 1
    var oldUl = this.dom.querySelector('.paging-pagination')
    oldUl && this.dom.removeChild(oldUl)
    if (data && data.length > 0) {
      this.data = data
      this.maxPage = Math.ceil(data.length / this.pageSize)
      this.isEmpty = false
      this.initPagination()
      this.template && this.showPage(1)
    } else {
      this.isEmpty = true
    }
    return this
  },
  initPagination: function () {
    this.ul = document.createElement('ul')
    this.ul.className = 'paging-pagination'
    this.dom.appendChild(this.ul)
    var self = this
    this.ul.onclick = function (e) {
      var i = Array.prototype.indexOf.call(this.getElementsByTagName('li'), e.target)
      if (i === -1) return
      self.showPage(e.target.innerHTML, i)
    }
  },
  showPage: function (page, i) {
    var self = this
    var pageNum = self.pageNum * 1
    var strArr = []
    var length = this.dom.querySelectorAll('.paging-pagination li').length
    strArr.push(self.header || '')
    if (i === undefined) {
      strArr.push(self.template(self.getData(page)))
    } else {
      switch (i) {
        case 0:
          strArr.push(self.template(self.getData(1)))
          break
        case 1:
          strArr.push(self.template(self.getData(pageNum - 1)))
          break
        case length - 2:
          strArr.push(self.template(self.getData(pageNum + 1)))
          break
        case length - 1:
          strArr.push(self.template(self.getData(self.maxPage)))
          break
        default:
          strArr.push(self.template(self.getData(page)))
      }
    }
    if (strArr.length <= 1 || !strArr[1]) {
      return false
    }
    self.node.innerHTML = strArr.join('')
    return self
  },
  setPagination: function () {
    var list = [],
      pageNum = this.pageNum * 1
    list.push('<li class="paging-pagenum paging-arrow"></li>')
    list.push('<li class="paging-pagenum paging-arrow"></li>')
    if (this.maxPage <= this.paginationSize) {
      for (var i = 0; i < this.maxPage; i++) {
        list.push('<li class="paging-pagenum">' + (i + 1) + '</li>')
      }
    } else if (pageNum + this.paginationSize > this.maxPage) {
      for (var i = this.maxPage - this.paginationSize; i < this.maxPage; i++) {
        list.push('<li class="paging-pagenum">' + (i + 1) + '</li>')
      }
    } else {
      var start = pageNum - this.paginationSize / 2 <= 0 ? 1 : pageNum - this.paginationSize / 2
      for (var i = start; i < start + this.paginationSize; i++) {
        list.push('<li class="paging-pagenum">' + i + '</li>')
      }
    }
    list.push('<li class="paging-pagenum paging-arrow"></li>')
    list.push('<li class="paging-pagenum paging-arrow"></li>')
    return list.join('')
  },
  setTemplate: function (cb) {
    this.template = function (data) {
      var arr = []
      data && data.forEach(function (v) {
        arr.push(cb(v))
      })
      return arr.join('')
    }
    this.isEmpty || this.showPage(1)
    return this
  },
  setHeader: function (cb) {
    var type = typeof cb
    if (type === 'string') {
      this.header = cb
    } else if (type === 'function') {
      var str = cb()
      typeof str === 'string' && (this.header = str)
    }
    return this
  },
  setEvent: function (event, el, cb) {
    var node = this.node
    var eventFn = this.bindEvent(el, cb)
    this.node.pagingEventList.push({
      event: event,
      fn: eventFn
    })
    node.addEventListener(event, eventFn)
    return this
  },
  bindEvent: function (el, cb) {
    var self = this
    return function (e) {
      var indexOf = Array.prototype.indexOf
      var doms = this.querySelectorAll(el)
      var index = -1
      for (var i = 0; i < e.path.length; i++) {
        index = indexOf.call(doms, e.path[i])
        if (index > -1) break
      }
      if (index === -1) return
      cb(doms[index], index + (self.pageNum - 1) * self.pageSize, doms)
    }
  },
  empty: function (cb) {
    if (this.isEmpty) {
      var header = this.header || ''
      var type = typeof cb
      if (type === 'string') {
        this.node.innerHTML = header + cb
      } else if (type === 'function') {
        var str = cb()
        typeof str === 'string' && (this.node.innerHTML = header + str)
      }
    }
    return this
  }
}

Paging.prototype.init.prototype = Paging.prototype