# 原生分页插件--paging.js #

## 引入paging.js 和 默认index.css ##
```
<link rel="stylesheet" href="css/index.css">
<script src="paging.js"></script>
```
## 开始插件 ##
```
var getId = document.getElementById.bind(document)
var data = []
var ulPaging = Paging(data, getId('ul'), getId('div1'))
```
> ## 代码解析:
> * document.getElementById.bind(document): 
>      >使用.bind()方法,将getId方法放到this由window改成document;
> * data: 
>      >初始数据;
> * getId('ul'):
>      >使用浏览器原生document.getElementById()方法,获取页面上id = 'ul'的元素;
> * getId('div1'):
>      >使用浏览器原生document.getElementById()方法,获取页面上id = 'div1'的元素;
