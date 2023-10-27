(()=>{"use strict";var e={756:(e,n,t)=>{t.d(n,{Z:()=>c});var a=t(81),r=t.n(a),o=t(645),i=t.n(o)()(r());i.push([e.id,"body {\n    font-family: 'Arial', sans-serif;\n    height: 100vh;\n    max-height: 100vh; /* Asegura que body no exceda la altura de la ventana */\n    width: 100vw;\n    max-width: 100vw; /* Asegura que body no exceda el ancho de la ventana */\n    background-color: #f5f5f5;\n    margin: 0;\n    overflow: hidden; /* Esconde cualquier desbordamiento */\n}\n\n.mainPage {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    padding: 20px;\n    background-color: #fff;\n    height: 100vh;\n    max-height: 100vh; /* Asegura que mainPage no exceda la altura de la ventana */\n    width: 100vw;\n    max-width: 100vw; /* Asegura que mainPage no exceda el ancho de la ventana */\n    box-sizing: border-box; /* Incluye el padding y el borde en el ancho/alto total */\n}\n\n.title {\n    font-size: 64px;\n    margin-bottom: 40px;\n}\n\n.smallTitle {\n    font-size: 32px; /* Reduce el tamaño de la fuente */\n    margin: 0;\n}\n\n.startGameButton {\n    padding: 20px 40px;\n    border: none;\n    border-radius: 15px;\n    cursor: pointer;\n    background-color: #007BFF;\n    transition: background-color 0.3s ease;\n    font-size: 18px;\n    color: white;\n}\n\n.startGameButton:hover {\n    background-color: #0056b3;\n}\n\n.titleSpace {\n    flex: 1;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.boardsSpace {\n    flex: 2;\n    /* background-color: #f5f5f5; */\n    display: flex;\n    justify-content: space-between; /* Agrega un espacio entre los tableros */\n    align-items: center;\n    margin-bottom: 20px;\n}\n\n.playerBoardContainer, .computerBoardContainer {\n    width: 25vw; /* Ahora, un valor más reducido para cada tablero */\n    height: 25vw; /* El alto es igual al ancho para mantenerlo cuadrado */\n    background-color: #e1e1e1;\n    margin: 0 2.5vw; /* Añade un pequeño margen entre los tableros */\n}\n\n\n\n",""]);const c=i},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",a=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),a&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),a&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,a,r,o){"string"==typeof e&&(e=[[null,e,void 0]]);var i={};if(a)for(var c=0;c<this.length;c++){var s=this[c][0];null!=s&&(i[s]=!0)}for(var d=0;d<e.length;d++){var l=[].concat(e[d]);a&&i[l[0]]||(void 0!==o&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=o),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),n.push(l))}},n}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var n=[];function t(e){for(var t=-1,a=0;a<n.length;a++)if(n[a].identifier===e){t=a;break}return t}function a(e,a){for(var o={},i=[],c=0;c<e.length;c++){var s=e[c],d=a.base?s[0]+a.base:s[0],l=o[d]||0,u="".concat(d," ").concat(l);o[d]=l+1;var p=t(u),f={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==p)n[p].references++,n[p].updater(f);else{var m=r(f,a);a.byIndex=c,n.splice(c,0,{identifier:u,updater:m,references:1})}i.push(u)}return i}function r(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,r){var o=a(e=e||[],r=r||{});return function(e){e=e||[];for(var i=0;i<o.length;i++){var c=t(o[i]);n[c].references--}for(var s=a(e,r),d=0;d<o.length;d++){var l=t(o[d]);0===n[l].references&&(n[l].updater(),n.splice(l,1))}o=s}}},569:e=>{var n={};e.exports=function(e,t){var a=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}},216:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},565:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},795:e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var a="";t.supports&&(a+="@supports (".concat(t.supports,") {")),t.media&&(a+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(a+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),a+=t.css,r&&(a+="}"),t.media&&(a+="}"),t.supports&&(a+="}");var o=t.sourceMap;o&&"undefined"!=typeof btoa&&(a+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),n.styleTagTransform(a,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},589:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},n={};function t(a){var r=n[a];if(void 0!==r)return r.exports;var o=n[a]={id:a,exports:{}};return e[a](o,o.exports,t),o.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var a in n)t.o(n,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:n[a]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.nc=void 0,(()=>{var e=t(379),n=t.n(e),a=t(795),r=t.n(a),o=t(569),i=t.n(o),c=t(565),s=t.n(c),d=t(216),l=t.n(d),u=t(589),p=t.n(u),f=t(756),m={};m.styleTagTransform=p(),m.setAttributes=s(),m.insert=i().bind(null,"head"),m.domAPI=r(),m.insertStyleElement=l(),n()(f.Z,m),f.Z&&f.Z.locals&&f.Z.locals;const v=document.querySelector(".startGameButton"),h=document.querySelector(".title"),g=document.querySelector(".mainPage");v&&v.addEventListener("click",(function(){v&&v.remove();const e=document.createElement("div");e.classList.add("titleSpace"),h&&(h.classList.add("smallTitle"),e.appendChild(h)),g&&g.insertBefore(e,g.firstChild);const n=document.createElement("div");n.classList.add("boardsSpace");const t=document.createElement("div");t.classList.add("playerBoardContainer");const a=document.createElement("div");a.classList.add("computerBoardContainer"),n.appendChild(t),n.appendChild(a),g&&g.appendChild(n)}))})()})();