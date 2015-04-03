//XRegExp 2.0.0 <xregexp.com> MIT License
var XRegExp;XRegExp=XRegExp||function(n){"use strict";function v(n,i,r){var u;for(u in t.prototype)t.prototype.hasOwnProperty(u)&&(n[u]=t.prototype[u]);return n.xregexp={captureNames:i,isNative:!!r},n}function g(n){return(n.global?"g":"")+(n.ignoreCase?"i":"")+(n.multiline?"m":"")+(n.extended?"x":"")+(n.sticky?"y":"")}function o(n,r,u){if(!t.isRegExp(n))throw new TypeError("type RegExp expected");var f=i.replace.call(g(n)+(r||""),h,"");return u&&(f=i.replace.call(f,new RegExp("["+u+"]+","g"),"")),n=n.xregexp&&!n.xregexp.isNative?v(t(n.source,f),n.xregexp.captureNames?n.xregexp.captureNames.slice(0):null):v(new RegExp(n.source,f),null,!0)}function a(n,t){var i=n.length;if(Array.prototype.lastIndexOf)return n.lastIndexOf(t);while(i--)if(n[i]===t)return i;return-1}function s(n,t){return Object.prototype.toString.call(n).toLowerCase()==="[object "+t+"]"}function d(n){return n=n||{},n==="all"||n.all?n={natives:!0,extensibility:!0}:s(n,"string")&&(n=t.forEach(n,/[^\s,]+/,function(n){this[n]=!0},{})),n}function ut(n,t,i,u){var o=p.length,s=null,e,f;y=!0;try{while(o--)if(f=p[o],(f.scope==="all"||f.scope===i)&&(!f.trigger||f.trigger.call(u))&&(f.pattern.lastIndex=t,e=r.exec.call(f.pattern,n),e&&e.index===t)){s={output:f.handler.call(u,e,i),match:e};break}}catch(h){throw h;}finally{y=!1}return s}function b(n){t.addToken=c[n?"on":"off"],f.extensibility=n}function tt(n){RegExp.prototype.exec=(n?r:i).exec,RegExp.prototype.test=(n?r:i).test,String.prototype.match=(n?r:i).match,String.prototype.replace=(n?r:i).replace,String.prototype.split=(n?r:i).split,f.natives=n}var t,c,u,f={natives:!1,extensibility:!1},i={exec:RegExp.prototype.exec,test:RegExp.prototype.test,match:String.prototype.match,replace:String.prototype.replace,split:String.prototype.split},r={},k={},p=[],e="default",rt="class",it={"default":/^(?:\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9]\d*|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S])|\(\?[:=!]|[?*+]\?|{\d+(?:,\d*)?}\??)/,"class":/^(?:\\(?:[0-3][0-7]{0,2}|[4-7][0-7]?|x[\dA-Fa-f]{2}|u[\dA-Fa-f]{4}|c[A-Za-z]|[\s\S]))/},et=/\$(?:{([\w$]+)}|(\d\d?|[\s\S]))/g,h=/([\s\S])(?=[\s\S]*\1)/g,nt=/^(?:[?*+]|{\d+(?:,\d*)?})\??/,ft=i.exec.call(/()??/,"")[1]===n,l=RegExp.prototype.sticky!==n,y=!1,w="gim"+(l?"y":"");return t=function(r,u){if(t.isRegExp(r)){if(u!==n)throw new TypeError("can't supply flags when constructing one RegExp from another");return o(r)}if(y)throw new Error("can't call the XRegExp constructor within token definition functions");var l=[],a=e,b={hasNamedCapture:!1,captureNames:[],hasFlag:function(n){return u.indexOf(n)>-1}},f=0,c,s,p;if(r=r===n?"":String(r),u=u===n?"":String(u),i.match.call(u,h))throw new SyntaxError("invalid duplicate regular expression flag");for(r=i.replace.call(r,/^\(\?([\w$]+)\)/,function(n,t){if(i.test.call(/[gy]/,t))throw new SyntaxError("can't use flag g or y in mode modifier");return u=i.replace.call(u+t,h,""),""}),t.forEach(u,/[\s\S]/,function(n){if(w.indexOf(n[0])<0)throw new SyntaxError("invalid regular expression flag "+n[0]);});f<r.length;)c=ut(r,f,a,b),c?(l.push(c.output),f+=c.match[0].length||1):(s=i.exec.call(it[a],r.slice(f)),s?(l.push(s[0]),f+=s[0].length):(p=r.charAt(f),p==="["?a=rt:p==="]"&&(a=e),l.push(p),++f));return v(new RegExp(l.join(""),i.replace.call(u,/[^gimy]+/g,"")),b.hasNamedCapture?b.captureNames:null)},c={on:function(n,t,r){r=r||{},n&&p.push({pattern:o(n,"g"+(l?"y":"")),handler:t,scope:r.scope||e,trigger:r.trigger||null}),r.customFlags&&(w=i.replace.call(w+r.customFlags,h,""))},off:function(){throw new Error("extensibility must be installed before using addToken");}},t.addToken=c.off,t.cache=function(n,i){var r=n+"/"+(i||"");return k[r]||(k[r]=t(n,i))},t.escape=function(n){return i.replace.call(n,/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},t.exec=function(n,t,i,u){var e=o(t,"g"+(u&&l?"y":""),u===!1?"y":""),f;return e.lastIndex=i=i||0,f=r.exec.call(e,n),u&&f&&f.index!==i&&(f=null),t.global&&(t.lastIndex=f?e.lastIndex:0),f},t.forEach=function(n,i,r,u){for(var e=0,o=-1,f;f=t.exec(n,i,e);)r.call(u,f,++o,n,i),e=f.index+(f[0].length||1);return u},t.globalize=function(n){return o(n,"g")},t.install=function(n){n=d(n),!f.natives&&n.natives&&tt(!0),!f.extensibility&&n.extensibility&&b(!0)},t.isInstalled=function(n){return!!f[n]},t.isRegExp=function(n){return s(n,"regexp")},t.matchChain=function(n,i){return function r(n,u){for(var o=i[u].regex?i[u]:{regex:i[u]},f=[],s=function(n){f.push(o.backref?n[o.backref]||"":n[0])},e=0;e<n.length;++e)t.forEach(n[e],o.regex,s);return u===i.length-1||!f.length?f:r(f,u+1)}([n],0)},t.replace=function(i,u,f,e){var c=t.isRegExp(u),s=u,h;return c?(e===n&&u.global&&(e="all"),s=o(u,e==="all"?"g":"",e==="all"?"":"g")):e==="all"&&(s=new RegExp(t.escape(String(u)),"g")),h=r.replace.call(String(i),s,f),c&&u.global&&(u.lastIndex=0),h},t.split=function(n,t,i){return r.split.call(n,t,i)},t.test=function(n,i,r,u){return!!t.exec(n,i,r,u)},t.uninstall=function(n){n=d(n),f.natives&&n.natives&&tt(!1),f.extensibility&&n.extensibility&&b(!1)},t.union=function(n,i){var l=/(\()(?!\?)|\\([1-9]\d*)|\\[\s\S]|\[(?:[^\\\]]|\\[\s\S])*]/g,o=0,f,h,c=function(n,t,i){var r=h[o-f];if(t){if(++o,r)return"(?<"+r+">"}else if(i)return"\\"+(+i+f);return n},e=[],r,u;if(!(s(n,"array")&&n.length))throw new TypeError("patterns must be a nonempty array");for(u=0;u<n.length;++u)r=n[u],t.isRegExp(r)?(f=o,h=r.xregexp&&r.xregexp.captureNames||[],e.push(t(r.source).source.replace(l,c))):e.push(t.escape(r));return t(e.join("|"),i)},t.version="2.0.0",r.exec=function(t){var r,f,e,o,u;if(this.global||(o=this.lastIndex),r=i.exec.apply(this,arguments),r){if(!ft&&r.length>1&&a(r,"")>-1&&(e=new RegExp(this.source,i.replace.call(g(this),"g","")),i.replace.call(String(t).slice(r.index),e,function(){for(var t=1;t<arguments.length-2;++t)arguments[t]===n&&(r[t]=n)})),this.xregexp&&this.xregexp.captureNames)for(u=1;u<r.length;++u)f=this.xregexp.captureNames[u-1],f&&(r[f]=r[u]);this.global&&!r[0].length&&this.lastIndex>r.index&&(this.lastIndex=r.index)}return this.global||(this.lastIndex=o),r},r.test=function(n){return!!r.exec.call(this,n)},r.match=function(n){if(t.isRegExp(n)){if(n.global){var u=i.match.apply(this,arguments);return n.lastIndex=0,u}}else n=new RegExp(n);return r.exec.call(n,this)},r.replace=function(n,r){var e=t.isRegExp(n),u,f,h,o;return e?(n.xregexp&&(u=n.xregexp.captureNames),n.global||(o=n.lastIndex)):n+="",s(r,"function")?f=i.replace.call(String(this),n,function(){var t=arguments,i;if(u)for(t[0]=new String(t[0]),i=0;i<u.length;++i)u[i]&&(t[0][u[i]]=t[i+1]);return e&&n.global&&(n.lastIndex=t[t.length-2]+t[0].length),r.apply(null,t)}):(h=String(this),f=i.replace.call(h,n,function(){var n=arguments;return i.replace.call(String(r),et,function(t,i,r){var f;if(i){if(f=+i,f<=n.length-3)return n[f]||"";if(f=u?a(u,i):-1,f<0)throw new SyntaxError("backreference to undefined group "+t);return n[f+1]||""}if(r==="$")return"$";if(r==="&"||+r==0)return n[0];if(r==="`")return n[n.length-1].slice(0,n[n.length-2]);if(r==="'")return n[n.length-1].slice(n[n.length-2]+n[0].length);if(r=+r,!isNaN(r)){if(r>n.length-3)throw new SyntaxError("backreference to undefined group "+t);return n[r]||""}throw new SyntaxError("invalid token "+t);})})),e&&(n.lastIndex=n.global?0:o),f},r.split=function(r,u){if(!t.isRegExp(r))return i.split.apply(this,arguments);var e=String(this),h=r.lastIndex,f=[],o=0,s;return u=(u===n?-1:u)>>>0,t.forEach(e,r,function(n){n.index+n[0].length>o&&(f.push(e.slice(o,n.index)),n.length>1&&n.index<e.length&&Array.prototype.push.apply(f,n.slice(1)),s=n[0].length,o=n.index+s)}),o===e.length?(!i.test.call(r,"")||s)&&f.push(""):f.push(e.slice(o)),r.lastIndex=h,f.length>u?f.slice(0,u):f},u=c.on,u(/\\([ABCE-RTUVXYZaeg-mopqyz]|c(?![A-Za-z])|u(?![\dA-Fa-f]{4})|x(?![\dA-Fa-f]{2}))/,function(n,t){if(n[1]==="B"&&t===e)return n[0];throw new SyntaxError("invalid escape "+n[0]);},{scope:"all"}),u(/\[(\^?)]/,function(n){return n[1]?"[\\s\\S]":"\\b\\B"}),u(/(?:\(\?#[^)]*\))+/,function(n){return i.test.call(nt,n.input.slice(n.index+n[0].length))?"":"(?:)"}),u(/\\k<([\w$]+)>/,function(n){var t=isNaN(n[1])?a(this.captureNames,n[1])+1:+n[1],i=n.index+n[0].length;if(!t||t>this.captureNames.length)throw new SyntaxError("backreference to undefined group "+n[0]);return"\\"+t+(i===n.input.length||isNaN(n.input.charAt(i))?"":"(?:)")}),u(/(?:\s+|#.*)+/,function(n){return i.test.call(nt,n.input.slice(n.index+n[0].length))?"":"(?:)"},{trigger:function(){return this.hasFlag("x")},customFlags:"x"}),u(/\./,function(){return"[\\s\\S]"},{trigger:function(){return this.hasFlag("s")},customFlags:"s"}),u(/\(\?P?<([\w$]+)>/,function(n){if(!isNaN(n[1]))throw new SyntaxError("can't use integer as capture name "+n[0]);return this.captureNames.push(n[1]),this.hasNamedCapture=!0,"("}),u(/\\(\d+)/,function(n,t){if(!(t===e&&/^[1-9]/.test(n[1])&&+n[1]<=this.captureNames.length)&&n[1]!=="0")throw new SyntaxError("can't use octal escape or backreference to undefined group "+n[0]);return n[0]},{scope:"all"}),u(/\((?!\?)/,function(){return this.hasFlag("n")?"(?:":(this.captureNames.push(null),"(")},{customFlags:"n"}),typeof exports!="undefined"&&(exports.XRegExp=t),t}();

/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

if(typeof SyntaxHighlighter=="undefined")var SyntaxHighlighter=function(){function t(e,t){return e.className.indexOf(t)!=-1}function n(e,n){if(!t(e,n))e.className+=" "+n}function r(e,t){e.className=e.className.replace(t,"")}function i(e){var t=[];for(var n=0,r=e.length;n<r;n++)t.push(e[n]);return t}function s(e){return e.split(/\r?\n/)}function o(e){var t="highlighter_";return e.indexOf(t)==0?e:t+e}function u(t){return e.vars.highlighters[o(t)]}function a(e){return document.getElementById(o(e))}function f(t){e.vars.highlighters[o(t.id)]=t}function l(e,t,n){if(e==null)return null;var r=n!=true?e.childNodes:[e.parentNode],i={"#":"id",".":"className"}[t.substr(0,1)]||"nodeName",s,o;s=i!="nodeName"?t.substr(1):t.toUpperCase();if((e[i]||"").indexOf(s)!=-1)return e;for(var u=0,a=r.length;r&&u<a&&o==null;u++)o=l(r[u],t,n);return o}function c(e,t){return l(e,t,true)}function h(e,t,n){n=Math.max(n||0,0);for(var r=n,i=e.length;r<i;r++)if(e[r]==t)return r;return-1}function p(e){return(e||"")+Math.round(Math.random()*1e6).toString()}function d(e,t){var n={},r;for(r in e)n[r]=e[r];for(r in t)n[r]=t[r];return n}function v(e){var t={"true":true,"false":false}[e];return t==null?e:t}function m(e,t,n,r,i){var s=(screen.width-n)/2,o=(screen.height-r)/2;i+=", left="+s+", top="+o+", width="+n+", height="+r;i=i.replace(/^,/,"");var u=window.open(e,t,i);u.focus();return u}function g(e,t,n,r){function i(e){e=e||window.event;if(!e.target){e.target=e.srcElement;e.preventDefault=function(){this.returnValue=false}}n.call(r||window,e)}if(e.attachEvent){e.attachEvent("on"+t,i)}else{e.addEventListener(t,i,false)}}function y(t){window.alert(e.config.strings.alert+t)}function b(t,n){var r=e.vars.discoveredBrushes,i=null;if(r==null){r={};for(var s in e.brushes){var o=e.brushes[s],u=o.aliases;if(u==null)continue;o.brushName=s.toLowerCase();for(var a=0,f=u.length;a<f;a++)r[u[a]]=s}e.vars.discoveredBrushes=r}i=e.brushes[r[t]];if(i==null&&n)y(e.config.strings.noBrush+t);return i}function w(e,t){var n=s(e);for(var r=0,i=n.length;r<i;r++)n[r]=t(n[r],r);return n.join("\r\n")}function E(e){return e.replace(/^[ ]*[\n]+|[\n]*[ ]*$/g,"")}function S(e){var t,n={},r=XRegExp("^\\[(?<values>(.*?))\\]$"),i=0,s=XRegExp("(?<name>[\\w-]+)"+"\\s*:\\s*"+"(?<value>"+"[\\w%#-]+|"+"\\[.*?\\]|"+'".*?"|'+"'.*?'"+")\\s*;?","g");while((t=XRegExp.exec(e,s,i))!=null){var o=t.value.replace(/^['"]|['"]$/g,"");if(o!=null&&r.test(o)){var u=XRegExp.exec(o,r);o=u.values.length>0?u.values.split(/\s*,\s*/):[]}n[t.name]=o;i=t.index+t[0].length}return n}function x(t,n){if(t==null||t.length==0||t=="\n")return t;t=t.replace(/</g,"&lt;");t=t.replace(/ {2,}/g,function(t){var n="";for(var r=0,i=t.length;r<i-1;r++)n+=e.config.space;return n+" "});if(n!=null)t=w(t,function(e){if(e.length==0)return"";var t="";e=e.replace(/^(&nbsp;| )+/,function(e){t=e;return""});if(e.length==0)return t;return t+'<code class="'+n+'">'+e+"</code>"});return t}function T(e,t){var n=e.toString();while(n.length<t)n="0"+n;return n}function N(e,t){var n="";for(var r=0;r<t;r++)n+=" ";return e.replace(/\t/g,n)}function C(e,t){function u(e,t,n){return e.substr(0,t)+i.substr(0,n)+e.substr(t+1,e.length)}var n=s(e),r="	",i="";for(var o=0;o<50;o++)i+="                    ";e=w(e,function(e){if(e.indexOf(r)==-1)return e;var n=0;while((n=e.indexOf(r))!=-1){var i=t-n%t;e=u(e,n,i)}return e});return e}function k(t){var n=/<br\s*\/?>|&lt;br\s*\/?&gt;/gi;if(e.config.bloggerMode==true)t=t.replace(n,"\n");if(e.config.stripBrs==true)t=t.replace(n,"");return t}function L(e){return e.replace(/^\s+|\s+$/g,"")}function A(e){var t=s(k(e)),n=new Array,r=/^\s*/,i=1e3;for(var o=0,u=t.length;o<u&&i>0;o++){var a=t[o];if(L(a).length==0)continue;var f=r.exec(a);if(f==null)return e;i=Math.min(f[0].length,i)}if(i>0)for(var o=0,u=t.length;o<u;o++)t[o]=t[o].substr(i);return t.join("\n")}function O(e,t){if(e.index<t.index)return-1;else if(e.index>t.index)return 1;else{if(e.length<t.length)return-1;else if(e.length>t.length)return 1}return 0}function M(t,n){function r(e,t){return e[0]}var i=0,s=null,o=[],u=n.func?n.func:r;pos=0;while((s=XRegExp.exec(t,n.regex,pos))!=null){var a=u(s,n);if(typeof a=="string")a=[new e.Match(a,s.index,n.css)];o=o.concat(a);pos=s.index+s[0].length}return o}function _(t){var n=/(.*)((&gt;|&lt;).*)/;return t.replace(e.regexLib.url,function(e){var t="",r=null;if(r=n.exec(e)){e=r[1];t=r[2]}return'<a href="'+e+'">'+e+"</a>"+t})}function D(){var e=document.getElementsByTagName("script"),t=[];for(var n=0,r=e.length;n<r;n++)if(e[n].type=="syntaxhighlighter")t.push(e[n]);return t}function P(e){var t="<![CDATA[",n="]]>",r=L(e),i=false,s=t.length,o=n.length;if(r.indexOf(t)==0){r=r.substring(s);i=true}var u=r.length;if(r.indexOf(n)==u-o){r=r.substring(0,u-o);i=true}return i?r:e}function H(e){var t=e.target,i=c(t,".syntaxhighlighter"),s=c(t,".container"),o=document.createElement("textarea"),a;if(!s||!i||l(s,"textarea"))return;a=u(i.id);n(i,"source");var f=s.childNodes,h=[];for(var p=0,d=f.length;p<d;p++)h.push(f[p].innerText||f[p].textContent);h=h.join("\r");h=h.replace(/\u00a0/g," ");o.appendChild(document.createTextNode(h));s.appendChild(o);o.focus();o.select();g(o,"blur",function(e){o.parentNode.removeChild(o);r(i,"source")})}if(typeof require!="undefined"&&typeof XRegExp=="undefined"){XRegExp=require("xregexp").XRegExp}var e={defaults:{"class-name":"","first-line":1,"pad-line-numbers":false,highlight:null,title:null,"smart-tabs":true,"tab-size":4,gutter:true,toolbar:true,"quick-code":true,collapse:false,"auto-links":true,light:false,unindent:true,"html-script":false},config:{space:"&nbsp;",useScriptTags:true,bloggerMode:false,stripBrs:false,tagName:"pre",strings:{expandSource:"expand source",help:"?",alert:"SyntaxHighlighter\n\n",noBrush:"Can't find brush for: ",brushNotHtmlScript:"Brush wasn't configured for html-script option: ",aboutDialog:"<%- about %>"}},vars:{discoveredBrushes:null,highlighters:{}},brushes:{},regexLib:{multiLineCComments:XRegExp("/\\*.*?\\*/","gs"),singleLineCComments:/\/\/.*$/gm,singleLinePerlComments:/#.*$/gm,doubleQuotedString:/"([^\\"\n]|\\.)*"/g,singleQuotedString:/'([^\\'\n]|\\.)*'/g,multiLineDoubleQuotedString:XRegExp('"([^\\\\"]|\\\\.)*"',"gs"),multiLineSingleQuotedString:XRegExp("'([^\\\\']|\\\\.)*'","gs"),xmlComments:XRegExp("(&lt;|<)!--.*?--(&gt;|>)","gs"),url:/\w+:\/\/[\w-.\/?%&=:@;#]*/g,phpScriptTags:{left:/(&lt;|<)\?(?:=|php)?/g,right:/\?(&gt;|>)/g,eof:true},aspScriptTags:{left:/(&lt;|<)%=?/g,right:/%(&gt;|>)/g},scriptScriptTags:{left:/(&lt;|<)\s*script.*?(&gt;|>)/gi,right:/(&lt;|<)\/\s*script\s*(&gt;|>)/gi}},toolbar:{getHtml:function(t){function s(t,n){return e.toolbar.getButtonHtml(t,n,e.config.strings[n])}var n='<div class="toolbar">',r=e.toolbar.items,i=r.list;for(var o=0,u=i.length;o<u;o++){n+=(r[i[o]].getHtml||s)(t,i[o])}n+="</div>";return n},getButtonHtml:function(e,t,n){return'<span><a href="#" class="toolbar_item'+" command_"+t+" "+t+'">'+n+"</a></span>"},handler:function(t){function i(e){var t=new RegExp(e+"_(\\w+)"),n=t.exec(r);return n?n[1]:null}var n=t.target,r=n.className||"";var s=u(c(n,".syntaxhighlighter").id),o=i("command");if(s&&o)e.toolbar.items[o].execute(s);t.preventDefault()},items:{list:["expandSource","help"],expandSource:{getHtml:function(t){if(t.getParam("collapse")!=true)return"";var n=t.getParam("title");return e.toolbar.getButtonHtml(t,"expandSource",n?n:e.config.strings.expandSource)},execute:function(e){var t=a(e.id);r(t,"collapsed")}},help:{execute:function(t){var n=m("","_blank",500,250,"scrollbars=0"),r=n.document;r.write(e.config.strings.aboutDialog);r.close();n.focus()}}}},findElements:function(t,n){var r=n?[n]:i(document.getElementsByTagName(e.config.tagName)),s=e.config,o=[];if(s.useScriptTags)r=r.concat(D());if(r.length===0)return o;for(var u=0,a=r.length;u<a;u++){var f={target:r[u],params:d(t,S(r[u].className))};if(f.params["brush"]==null)continue;o.push(f)}return o},highlight:function(t,n){var r=this.findElements(t,n),i="innerHTML",s=null,o=e.config;if(r.length===0)return;for(var u=0,a=r.length;u<a;u++){var n=r[u],f=n.target,l=n.params,c=l.brush,h;if(c==null)continue;if(l["html-script"]=="true"||e.defaults["html-script"]==true){s=new e.HtmlScript(c);c="htmlscript"}else{var p=b(c);if(p)s=new p;else continue}h=f[i];if(o.useScriptTags)h=P(h);if((f.title||"")!="")l.title=f.title;l["brush"]=c;s.init(l);n=s.getDiv(h);if((f.id||"")!="")n.id=f.id;f.parentNode.replaceChild(n,f)}},all:function(t){g(window,"load",function(){e.highlight(t)})}};e.Match=function(e,t,n){this.value=e;this.index=t;this.length=e.length;this.css=n;this.brushName=null};e.Match.prototype.toString=function(){return this.value};e.HtmlScript=function(t){function l(e,t){for(var n=0,r=e.length;n<r;n++)e[n].index+=t}function c(e,t){var i=e.code,s=[],o=r.regexList,u=e.index+e.left.length,a=r.htmlScript,f;for(var c=0,h=o.length;c<h;c++){f=M(i,o[c]);l(f,u);s=s.concat(f)}if(a.left!=null&&e.left!=null){f=M(e.left,a.left);l(f,e.index);s=s.concat(f)}if(a.right!=null&&e.right!=null){f=M(e.right,a.right);l(f,e.index+e[0].lastIndexOf(e.right));s=s.concat(f)}for(var p=0,h=s.length;p<h;p++)s[p].brushName=n.brushName;return s}var n=b(t),r,i=new e.brushes.Xml,s=null,o=this,u="getDiv getHtml init".split(" ");if(n==null)return;r=new n;for(var a=0,f=u.length;a<f;a++)(function(){var e=u[a];o[e]=function(){return i[e].apply(i,arguments)}})();if(r.htmlScript==null){y(e.config.strings.brushNotHtmlScript+t);return}i.regexList.push({regex:r.htmlScript.code,func:c})};e.Highlighter=function(){};e.Highlighter.prototype={getParam:function(e,t){var n=this.params[e];return v(n==null?t:n)},create:function(e){return document.createElement(e)},findMatches:function(e,t){var n=[];if(e!=null)for(var r=0,i=e.length;r<i;r++)if(typeof e[r]=="object")n=n.concat(M(t,e[r]));return this.removeNestedMatches(n.sort(O))},removeNestedMatches:function(e){for(var t=0,n=e.length;t<n;t++){if(e[t]===null)continue;var r=e[t],i=r.index+r.length;for(var s=t+1,n=e.length;s<n&&e[t]!==null;s++){var o=e[s];if(o===null)continue;else if(o.index>i)break;else if(o.index==r.index&&o.length>r.length)e[t]=null;else if(o.index>=r.index&&o.index<i)e[s]=null}}return e},figureOutLineNumbers:function(e){var t=[],n=parseInt(this.getParam("first-line"));w(e,function(e,r){t.push(r+n)});return t},isLineHighlighted:function(e){var t=this.getParam("highlight",[]);if(typeof t!="object"&&t.push==null)t=[t];return h(t,e.toString())!=-1},getLineHtml:function(e,t,n){var r=["line","number"+t,"index"+e,"alt"+(t%2==0?1:2).toString()];if(this.isLineHighlighted(t))r.push("highlighted");if(t==0)r.push("break");return'<div class="'+r.join(" ")+'">'+n+"</div>"},getLineNumbersHtml:function(t,n){var r="",i=s(t).length,o=parseInt(this.getParam("first-line")),u=this.getParam("pad-line-numbers");if(u==true)u=(o+i-1).toString().length;else if(isNaN(u)==true)u=0;for(var a=0;a<i;a++){var f=n?n[a]:o+a,t=f==0?e.config.space:T(f,u);r+=this.getLineHtml(a,f,t)}return r},getCodeLinesHtml:function(t,n){t=L(t);var r=s(t),i=this.getParam("pad-line-numbers"),o=parseInt(this.getParam("first-line")),t="",u=this.getParam("brush");for(var a=0,f=r.length;a<f;a++){var l=r[a],c=/^(&nbsp;|\s)+/.exec(l),h=null,p=n?n[a]:o+a;if(c!=null){h=c[0].toString();l=l.substr(h.length);h=h.replace(" ",e.config.space)}l=L(l);if(l.length==0)l=e.config.space;t+=this.getLineHtml(a,p,(h!=null?'<code class="'+u+' spaces">'+h+"</code>":"")+l)}return t},getTitleHtml:function(e){return e?"<caption>"+e+"</caption>":""},getMatchesHtml:function(e,t){function s(e){var t=e?e.brushName||i:i;return t?t+" ":""}var n=0,r="",i=this.getParam("brush","");for(var o=0,u=t.length;o<u;o++){var a=t[o],f;if(a===null||a.length===0)continue;f=s(a);r+=x(e.substr(n,a.index-n),f+"plain")+x(a.value,f+a.css);n=a.index+a.length+(a.offset||0)}r+=x(e.substr(n),s()+"plain");return r},getHtml:function(t){var n="",r=["syntaxhighlighter"],i,s,u;if(this.getParam("light")==true)this.params.toolbar=this.params.gutter=false;className="syntaxhighlighter";if(this.getParam("collapse")==true)r.push("collapsed");if((gutter=this.getParam("gutter"))==false)r.push("nogutter");r.push(this.getParam("class-name"));r.push(this.getParam("brush"));t=E(t).replace(/\r/g," ");i=this.getParam("tab-size");t=this.getParam("smart-tabs")==true?C(t,i):N(t,i);if(this.getParam("unindent"))t=A(t);if(gutter)u=this.figureOutLineNumbers(t);s=this.findMatches(this.regexList,t);n=this.getMatchesHtml(t,s);n=this.getCodeLinesHtml(n,u);if(this.getParam("auto-links"))n=_(n);if(typeof navigator!="undefined"&&navigator.userAgent&&navigator.userAgent.match(/MSIE/))r.push("ie");n='<div id="'+o(this.id)+'" class="'+r.join(" ")+'">'+(this.getParam("toolbar")?e.toolbar.getHtml(this):"")+'<table border="0" cellpadding="0" cellspacing="0">'+this.getTitleHtml(this.getParam("title"))+"<tbody>"+"<tr>"+(gutter?'<td class="gutter">'+this.getLineNumbersHtml(t)+"</td>":"")+'<td class="code">'+'<div class="container">'+n+"</div>"+"</td>"+"</tr>"+"</tbody>"+"</table>"+"</div>";return n},getDiv:function(t){if(t===null)t="";this.code=t;var n=this.create("div");n.innerHTML=this.getHtml(t);if(this.getParam("toolbar"))g(l(n,".toolbar"),"click",e.toolbar.handler);if(this.getParam("quick-code"))g(l(n,".code"),"dblclick",H);return n},init:function(t){this.id=p();f(this);this.params=d(e.defaults,t||{});if(this.getParam("light")==true)this.params.toolbar=this.params.gutter=false},getKeywords:function(e){e=e.replace(/^\s+|\s+$/g,"").replace(/\s+/g,"|");return"\\b(?:"+e+")\\b"},forHtmlScript:function(e){var t={end:e.right.source};if(e.eof)t.end="(?:(?:"+t.end+")|$)";this.htmlScript={left:{regex:e.left,css:"script"},right:{regex:e.right,css:"script"},code:XRegExp("(?<left>"+e.left.source+")"+"(?<code>.*?)"+"(?<right>"+t.end+")","sgi")}}};return e}();typeof exports!="undefined"?exports.SyntaxHighlighter=SyntaxHighlighter:null;

/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

(function () {
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined' ? require('shCore').SyntaxHighlighter : null);

	function Brush() {
		function process(match, regexInfo) {
			var constructor = SyntaxHighlighter.Match,
				code = match[0],
				tag = XRegExp.exec(code, XRegExp('(&lt;|<)[\\s\\/\\?!]*(?<name>[:\\w-\\.]+)', 'xg')),
				result = [];
			if (match.attributes != null) {
				var attributes,
					pos = 0,
					regex = XRegExp('(?<name> [\\w:.-]+)' +
						'\\s*=\\s*' +
						'(?<value> ".*?"|\'.*?\'|\\w+)',
						'xg');
				while ((attributes = XRegExp.exec(code, regex, pos)) != null) {
					result.push(new constructor(attributes.name, match.index + attributes.index, 'color1'));
					result.push(new constructor(attributes.value, match.index + attributes.index + attributes[0].indexOf(attributes.value), 'string'));
					pos = attributes.index + attributes[0].length;
				}
			}
			if (tag != null)
				result.push(
					new constructor(tag.name, match.index + tag[0].indexOf(tag.name), 'keyword')
				);
			return result;
		}
		this.regexList = [{
				regex: XRegExp('(\\&lt;|<)\\!\\[[\\w\\s]*?\\[(.|\\s)*?\\]\\](\\&gt;|>)', 'gm'),
				css: 'color2'
			}, // <![ ... [ ... ]]>
			{
				regex: SyntaxHighlighter.regexLib.xmlComments,
				css: 'comments'
			}, // <!-- ... -->
			{
				regex: XRegExp('(&lt;|<)[\\s\\/\\?!]*(\\w+)(?<attributes>.*?)[\\s\\/\\?]*(&gt;|>)', 'sg'),
				func: process
			}
		];
	};
	Brush.prototype = new SyntaxHighlighter.Highlighter();
	Brush.aliases = ['xml', 'xhtml', 'xslt', 'html', 'plist'];
	SyntaxHighlighter.brushes.Xml = Brush;
	// CommonJS
	typeof (exports) != 'undefined' ? exports.Brush = Brush : null;
})();;
(function () {
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined' ? require('shCore').SyntaxHighlighter : null);

	function Brush() {
		function getKeywordsCSS(str) {
			return '\\b([a-z_]|)' + str.replace(/ /g, '(?=:)\\b|\\b([a-z_\\*]|\\*|)') + '(?=:)\\b';
		};

		function getValuesCSS(str) {
			return '\\b' + str.replace(/ /g, '(?!-)(?!:)\\b|\\b()') + '\:\\b';
		};
		var keywords = 'ascent azimuth background-attachment background-color background-image background-position ' +
			'background-repeat background baseline bbox border-collapse border-color border-spacing border-style border-top ' +
			'border-right border-bottom border-left border-top-color border-right-color border-bottom-color border-left-color ' +
			'border-top-style border-right-style border-bottom-style border-left-style border-top-width border-right-width ' +
			'border-bottom-width border-left-width border-width border bottom cap-height caption-side centerline clear clip color ' +
			'content counter-increment counter-reset cue-after cue-before cue cursor definition-src descent direction display ' +
			'elevation empty-cells float font-size-adjust font-family font-size font-stretch font-style font-variant font-weight font ' +
			'height left letter-spacing line-height list-style-image list-style-position list-style-type list-style margin-top ' +
			'margin-right margin-bottom margin-left margin marker-offset marks mathline max-height max-width min-height min-width orphans ' +
			'outline-color outline-style outline-width outline overflow padding-top padding-right padding-bottom padding-left padding page ' +
			'page-break-after page-break-before page-break-inside pause pause-after pause-before pitch pitch-range play-during position ' +
			'quotes right richness size slope src speak-header speak-numeral speak-punctuation speak speech-rate stemh stemv stress ' +
			'table-layout text-align top text-decoration text-indent text-shadow text-transform unicode-bidi unicode-range units-per-em ' +
			'vertical-align visibility voice-family volume white-space widows width widths word-spacing x-height z-index';
		var values = 'above absolute all always aqua armenian attr aural auto avoid baseline behind below bidi-override black blink block blue bold bolder ' +
			'both bottom braille capitalize caption center center-left center-right circle close-quote code collapse compact condensed ' +
			'continuous counter counters crop cross crosshair cursive dashed decimal decimal-leading-zero default digits disc dotted double ' +
			'embed embossed e-resize expanded extra-condensed extra-expanded fantasy far-left far-right fast faster fixed format fuchsia ' +
			'gray green groove handheld hebrew help hidden hide high higher icon inline-table inline inset inside invert italic ' +
			'justify landscape large larger left-side left leftwards level lighter lime line-through list-item local loud lower-alpha ' +
			'lowercase lower-greek lower-latin lower-roman lower low ltr marker maroon medium message-box middle mix move narrower ' +
			'navy ne-resize no-close-quote none no-open-quote no-repeat normal nowrap n-resize nw-resize oblique olive once open-quote outset ' +
			'outside overline pointer portrait pre print projection purple red relative repeat repeat-x repeat-y rgb ridge right right-side ' +
			'rightwards rtl run-in screen scroll semi-condensed semi-expanded separate se-resize show silent silver slower slow ' +
			'small small-caps small-caption smaller soft solid speech spell-out square s-resize static status-bar sub super sw-resize ' +
			'table-caption table-cell table-column table-column-group table-footer-group table-header-group table-row table-row-group teal ' +
			'text-bottom text-top thick thin top transparent tty tv ultra-condensed ultra-expanded underline upper-alpha uppercase upper-latin ' +
			'upper-roman url visible wait white wider w-resize x-fast x-high x-large x-loud x-low x-slow x-small x-soft xx-large xx-small yellow';
		var fonts = '[mM]onospace [tT]ahoma [vV]erdana [aA]rial [hH]elvetica [sS]ans-serif [sS]erif [cC]ourier mono sans serif';
		this.regexList = [{
				regex: SyntaxHighlighter.regexLib.multiLineCComments,
				css: 'comments'
			}, // multiline comments
			{
				regex: SyntaxHighlighter.regexLib.doubleQuotedString,
				css: 'string'
			}, // double quoted strings
			{
				regex: SyntaxHighlighter.regexLib.singleQuotedString,
				css: 'string'
			}, // single quoted strings
			{
				regex: /\#[a-fA-F0-9]{3,6}/g,
				css: 'value'
			}, // html colors
			{
				regex: /(-?\d+)(\.\d+)?(px|em|pt|\:|\%|)/g,
				css: 'value'
			}, // sizes
			{
				regex: /!important/g,
				css: 'color3'
			}, // !important
			{
				regex: new RegExp(getKeywordsCSS(keywords), 'gm'),
				css: 'keyword'
			}, // keywords
			{
				regex: new RegExp(getValuesCSS(values), 'g'),
				css: 'value'
			}, // values
			{
				regex: new RegExp(this.getKeywords(fonts), 'g'),
				css: 'color1'
			} // fonts
		];
		this.forHtmlScript({
			left: /(&lt;|<)\s*style.*?(&gt;|>)/gi,
			right: /(&lt;|<)\/\s*style\s*(&gt;|>)/gi
		});
	};
	Brush.prototype = new SyntaxHighlighter.Highlighter();
	Brush.aliases = ['css'];
	SyntaxHighlighter.brushes.CSS = Brush;
	// CommonJS
	typeof (exports) != 'undefined' ? exports.Brush = Brush : null;
})();;
(function () {
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined' ? require('shCore').SyntaxHighlighter : null);

	function Brush() {
		var keywords = 'break case catch class continue ' +
			'default delete do else enum export extends false  ' +
			'for function if implements import in instanceof ' +
			'interface let new null package private protected ' +
			'static return super switch ' +
			'this throw true try typeof var while with yield';
		var r = SyntaxHighlighter.regexLib;
		this.regexList = [{
				regex: r.multiLineDoubleQuotedString,
				css: 'string'
			}, // double quoted strings
			{
				regex: r.multiLineSingleQuotedString,
				css: 'string'
			}, // single quoted strings
			{
				regex: r.singleLineCComments,
				css: 'comments'
			}, // one line comments
			{
				regex: r.multiLineCComments,
				css: 'comments'
			}, // multiline comments
			{
				regex: /\s*#.*/gm,
				css: 'preprocessor'
			}, // preprocessor tags like #region and #endregion
			{
				regex: new RegExp(this.getKeywords(keywords), 'gm'),
				css: 'keyword'
			} // keywords
		];
		this.forHtmlScript(r.scriptScriptTags);
	};
	Brush.prototype = new SyntaxHighlighter.Highlighter();
	Brush.aliases = ['js', 'jscript', 'javascript', 'json'];
	SyntaxHighlighter.brushes.JScript = Brush;
	// CommonJS
	typeof (exports) != 'undefined' ? exports.Brush = Brush : null;
})();
