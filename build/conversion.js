"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t,e){"object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.imageConversion=e()}(void 0,function(){var t={urltoImage:function(t){return new Promise(function(e,a){var o=new Image;o.onload=function(){return e(o)},o.onerror=function(){return a("urltoImage(): Image failed to load, please check the image URL")},o.src=t})},urltoBlob:function(t){return fetch(t).then(function(t){return t.blob()})},imagetoCanvas:async function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=document.createElement("canvas"),o=a.getContext("2d"),n=void 0,r=void 0;if(e.scale){var i=e.scale>0&&e.scale<10?e.scale:1;r=t.width*i,n=t.height*i}else r=e.width||t.width,n=e.height||t.height;switch([5,6,7,8].some(function(t){return t===e.orientation})?(a.height=r,a.width=n):(a.height=n,a.width=r),e.orientation){case 3:o.rotate(180*Math.PI/180),o.drawImage(t,-a.width,-a.height,a.width,a.height);break;case 6:o.rotate(90*Math.PI/180),o.drawImage(t,0,-a.width,a.height,a.width);break;case 8:o.rotate(270*Math.PI/180),o.drawImage(t,-a.height,0,a.height,a.width);break;case 2:o.translate(a.width,0),o.scale(-1,1),o.drawImage(t,0,0,a.width,a.height);break;case 4:o.translate(a.width,0),o.scale(-1,1),o.rotate(180*Math.PI/180),o.drawImage(t,-a.width,-a.height,a.width,a.height);break;case 5:o.translate(a.width,0),o.scale(-1,1),o.rotate(90*Math.PI/180),o.drawImage(t,0,-a.width,a.height,a.width);break;case 7:o.translate(a.width,0),o.scale(-1,1),o.rotate(270*Math.PI/180),o.drawImage(t,-a.height,0,a.height,a.width);break;default:o.drawImage(t,0,0,a.width,a.height)}return a},canvastoFile:function(t,e){return new Promise(function(a){return t.toBlob(function(t){return a(t)},"image/jpeg",e)})},canvastoDataURL:async function(t,e){return t.toDataURL("image/jpeg",e)},filetoDataURL:function(t){return new Promise(function(e){var a=new FileReader;a.onloadend=function(t){return e(t.target.result)},a.readAsDataURL(t)})},dataURLtoImage:function(t){return new Promise(function(e,a){var o=new Image;o.onload=function(){return e(o)},o.onerror=function(){return a("dataURLtoImage(): dataURL is illegal")},o.src=t})},dataURLtoFile:async function(t,e){for(var a=t.split(","),o=a[0].match(/:(.*?);/)[1],n=atob(a[1]),r=n.length,i=new Uint8Array(r);r--;)i[r]=n.charCodeAt(r);return new Blob([i],{type:e||o})},downloadFile:function(t,e){var a=document.createElement("a");a.href=window.URL.createObjectURL(t),a.download=e||Date.now().toString(36),document.body.appendChild(a);var o=document.createEvent("MouseEvents");o.initEvent("click",!1,!1),a.dispatchEvent(o),document.body.removeChild(a)},compress:async function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!(e instanceof Blob))throw new Error("compress(): First arg must be a Blob object or a File object.");"number"==typeof a&&(a=Object.assign({quality:a}));var o=await t.filetoDataURL(e),n=o.split(",")[0].match(/:(.*?);/)[1],r=await t.dataURLtoImage(o),i=await t.imagetoCanvas(r,a),c=await t.canvastoDataURL(i,a.quality);return await t.dataURLtoFile(c,n)},compressAccurately:async function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!(e instanceof Blob))throw new Error("compressAccurately(): First arg must be a Blob object or a File object.");if("number"==typeof a&&(a=Object.assign({size:a})),1024*a.size>e.size)return e;(!a.accuracy||_typeof(a.accuracy)!==number||a.accuracy<.8||a.accuracy>.99)&&(a.accuracy=.95);var o={max:a.size*(2-a.accuracy)*1024,accurate:1024*a.size,min:a.size*a.accuracy*1024},n=await t.filetoDataURL(e),r=n.split(",")[0].match(/:(.*?);/)[1],i=e.size;console.log("原始图像尺寸：",i),console.log("目标尺寸：",1024*a.size),console.log("目标尺寸max：",o.max),console.log("目标尺寸min：",o.min);for(var c=await t.dataURLtoImage(n),l=await t.imagetoCanvas(c,a),s=.5,u=void 0,h=[null,null],d=1;d<=7;d++){console.group(),console.log("循环次数：",d),console.log("当前图片质量",s);var m=.75*(u=await t.canvastoDataURL(l,s)).length;if(console.log("当前图片尺寸",m),console.log("当前压缩率",m/i),console.log("与目标体积偏差",m/(1024*a.size)-1),console.groupEnd(),7===d){(o.max<m||o.min>m)&&(u=[u].concat(h).filter(function(t){return t}).sort(function(t,e){return Math.max(.75*e.length-o.accurate)-Math.max(.75*t.length-o.accurate)})[0]);break}if(o.max<m)h[1]=u,s-=Math.pow(.5,d+1);else{if(!(o.min>m))break;h[0]=u,s+=Math.pow(.5,d+1)}}var f=await t.dataURLtoFile(u,r);return console.log("最终图片大小：",f.size),f}};return t});