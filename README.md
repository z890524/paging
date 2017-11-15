# 原生分页插件--paging.js #

## 引入paging.js 和 默认paging.css ##
```
<link rel="stylesheet" href="css/paging.css">
<script src="paging.js"></script>
```
## 开始插件 ##
```
var paging = Paging(data, listBox, father, config)
```
> * data (array, 必填): 需要渲染的数据; 
>
> * listBox (dom, 必填): 显示每一页数据的元素;
>
> * father (dom, 必填): 容纳页码的元素;
>
> * config (object, 选填): 配置项:
>
>> + pageSize: 每页显示的条数;
>> default: 20
>> + paginationSize: 页码的最大数
>> default: 10

## API ##

#### update  
```
paging.update (Array)
```
> 更新需要渲染的数据

#### setHeader
```
paging.setHeader (String | Function)
```
> 切换每一页列表,都会显示的表头 <br>
> 使用回调函数时, 该函数返回值必须为 string

#### setTemplate
```
paging.setTemplate (Function)
```
> 设置每条列表的模板 <br>
> 回调函数接收一个参数,data中的单条数据

#### empty
```
paging.empty (String | Function)
```
> 在data为空时,在列表中显示的模板 <br>
> 使用回调函数时, 该函数返回值必须为 string

#### setEvent
```
paging.setEvent (event, selector, handler)
```
> 给每条列表绑定事件 <br>
> 需要传递3个参数<br>
> 1. event: 需绑定的事件名; String
> 2. selector: 需绑定事件的元素选择器; String
> 3. handler: 事件处理函数; Function
>
>>handler 可以接收3个参数 <br>
>> 1. dom: 当前点击的元素
>> 2. index: 当前元素在整个列表中的索引号 (即该条列表在数据中对应的索引号)
>> 3. doms: *当前页*的元素列表

