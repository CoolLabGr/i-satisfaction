# i-satisfaction

i-satisfaction is a custom Element 

Why usa i-satisfaction:

 * Easy to add to your site
 * Have an idea of what your users like.

 ```html
<script src="https://rawgit.com/CoolLabGr/i-satisfaction/master/i-satisfaction.js">

<i-satisfation
    id="q1"
    question="Was the food OK?"></i-satisfaction>
```
### And in the javascript

```javascript
let q1 = document.getElementById('q1');

let x = setInterval(() => {
  iSat.show();
  clearInterval(x);
}, 5000);
```