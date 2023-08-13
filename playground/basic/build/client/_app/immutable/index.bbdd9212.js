import"./chunks/modulepreload-polyfill.3cfb730f.js";function c(){}c.prototype={on:function(n,r,t){var e=this.e||(this.e={});return(e[n]||(e[n]=[])).push({fn:r,ctx:t}),this},once:function(n,r,t){var e=this;function i(){e.off(n,i),r.apply(t,arguments)}return i._=r,this.on(n,i,t)},emit:function(n){for(var r=[].slice.call(arguments,1),t=((this.e||(this.e={}))[n]||[]).slice(),e=0,i=t.length;e<i;e++)t[e].fn.apply(t[e].ctx,r);return this},off:function(n,r){var t=this.e||(this.e={}),e=t[n],i=[];if(e&&r)for(var o=0,h=e.length;o<h;o++)e[o].fn!==r&&e[o].fn._!==r&&i.push(e[o]);return i.length?t[n]=i:delete t[n],this}};var u=c;u.TinyEmitter=c;var a=function(n){this.wrap=document.querySelector("[data-router-wrapper]"),this.properties=n,this.Transition=n.transition?new n.transition.class(this.wrap,n.transition.name):null};a.prototype.setup=function(){this.onEnter&&this.onEnter(),this.onEnterCompleted&&this.onEnterCompleted()},a.prototype.add=function(){this.wrap.insertAdjacentHTML("beforeend",this.properties.view.outerHTML)},a.prototype.update=function(){document.title=this.properties.page.title},a.prototype.show=function(n){var r=this;return new Promise(function(t){try{let e=function(i){r.onEnterCompleted&&r.onEnterCompleted(),t()};return r.update(),r.onEnter&&r.onEnter(),Promise.resolve(r.Transition?Promise.resolve(r.Transition.show(n)).then(e):e())}catch(e){return Promise.reject(e)}})},a.prototype.hide=function(n){var r=this;return new Promise(function(t){try{let e=function(i){r.onLeaveCompleted&&r.onLeaveCompleted(),t()};return r.onLeave&&r.onLeave(),Promise.resolve(r.Transition?Promise.resolve(r.Transition.hide(n)).then(e):e())}catch(e){return Promise.reject(e)}})};var l=new window.DOMParser,s=function(n,r){this.renderers=n,this.transitions=r};s.prototype.getOrigin=function(n){var r=n.match(/(https?:\/\/[\w\-.]+)/);return r?r[1].replace(/https?:\/\//,""):null},s.prototype.getPathname=function(n){var r=n.match(/https?:\/\/.*?(\/[\w_\-./]+)/);return r?r[1]:"/"},s.prototype.getAnchor=function(n){var r=n.match(/(#.*)$/);return r?r[1]:null},s.prototype.getParams=function(n){var r=n.match(/\?([\w_\-.=&]+)/);if(!r)return null;for(var t=r[1].split("&"),e={},i=0;i<t.length;i++){var o=t[i].split("=");e[o[0]]=o[1]}return e},s.prototype.getDOM=function(n){return typeof n=="string"?l.parseFromString(n,"text/html"):n},s.prototype.getView=function(n){return n.querySelector("[data-router-view]")},s.prototype.getSlug=function(n){return n.getAttribute("data-router-view")},s.prototype.getRenderer=function(n){if(!this.renderers)return Promise.resolve(a);if(n in this.renderers){var r=this.renderers[n];return typeof r!="function"||a.isPrototypeOf(r)?typeof r.then=="function"?Promise.resolve(r).then(function(t){return t.default}):Promise.resolve(r):Promise.resolve(r()).then(function(t){return t.default})}return Promise.resolve(a)},s.prototype.getTransition=function(n){return this.transitions?n in this.transitions?{class:this.transitions[n],name:n}:"default"in this.transitions?{class:this.transitions.default,name:"default"}:null:null},s.prototype.getProperties=function(n){var r=this.getDOM(n),t=this.getView(r),e=this.getSlug(t);return{page:r,view:t,slug:e,renderer:this.getRenderer(e,this.renderers),transition:this.getTransition(e,this.transitions)}},s.prototype.getLocation=function(n){return{href:n,anchor:this.getAnchor(n),origin:this.getOrigin(n),params:this.getParams(n),pathname:this.getPathname(n)}};var g=function(n){function r(t){var e=this;t===void 0&&(t={});var i=t.renderers,o=t.transitions;n.call(this),this.Helpers=new s(i,o),this.Transitions=o,this.Contextual=!1,this.location=this.Helpers.getLocation(window.location.href),this.properties=this.Helpers.getProperties(document.cloneNode(!0)),this.popping=!1,this.running=!1,this.trigger=null,this.cache=new Map,this.cache.set(this.location.href,this.properties),this.properties.renderer.then(function(h){e.From=new h(e.properties),e.From.setup()}),this._navigate=this.navigate.bind(this),window.addEventListener("popstate",this.popState.bind(this)),this.links=document.querySelectorAll("a:not([target]):not([data-router-disabled])"),this.attach(this.links)}return n&&(r.__proto__=n),(r.prototype=Object.create(n&&n.prototype)).constructor=r,r.prototype.attach=function(t){for(var e=0,i=t;e<i.length;e+=1)i[e].addEventListener("click",this._navigate)},r.prototype.detach=function(t){for(var e=0,i=t;e<i.length;e+=1)i[e].removeEventListener("click",this._navigate)},r.prototype.navigate=function(t){if(!t.metaKey&&!t.ctrlKey){t.preventDefault();var e=!!t.currentTarget.hasAttribute("data-transition")&&t.currentTarget.dataset.transition;this.redirect(t.currentTarget.href,e,t.currentTarget)}},r.prototype.redirect=function(t,e,i){if(e===void 0&&(e=!1),i===void 0&&(i="script"),this.trigger=i,!this.running&&t!==this.location.href){var o=this.Helpers.getLocation(t);this.Contextual=!1,e&&(this.Contextual=this.Transitions.contextual[e].prototype,this.Contextual.name=e),o.origin!==this.location.origin||o.anchor&&o.pathname===this.location.pathname?window.location.href=t:(this.location=o,this.beforeFetch())}},r.prototype.popState=function(){this.trigger="popstate",this.Contextual=!1;var t=this.Helpers.getLocation(window.location.href);this.location.pathname!==t.pathname||!this.location.anchor&&!t.anchor?(this.popping=!0,this.location=t,this.beforeFetch()):this.location=t},r.prototype.pushState=function(){this.popping||window.history.pushState(this.location,"",this.location.href)},r.prototype.fetch=function(){try{var t=this;return Promise.resolve(fetch(t.location.href,{mode:"same-origin",method:"GET",headers:{"X-Requested-With":"Highway"},credentials:"same-origin"})).then(function(e){if(e.status>=200&&e.status<300)return e.text();window.location.href=t.location.href})}catch(e){return Promise.reject(e)}},r.prototype.beforeFetch=function(){try{let o=function(){t.afterFetch()};var t=this;t.pushState(),t.running=!0,t.emit("NAVIGATE_OUT",{from:{page:t.From.properties.page,view:t.From.properties.view},trigger:t.trigger,location:t.location});var e={trigger:t.trigger,contextual:t.Contextual},i=t.cache.has(t.location.href)?Promise.resolve(t.From.hide(e)).then(function(){t.properties=t.cache.get(t.location.href)}):Promise.resolve(Promise.all([t.fetch(),t.From.hide(e)])).then(function(h){t.properties=t.Helpers.getProperties(h[0]),t.cache.set(t.location.href,t.properties)});return Promise.resolve(i&&i.then?i.then(o):o())}catch(o){return Promise.reject(o)}},r.prototype.afterFetch=function(){try{var t=this;return Promise.resolve(t.properties.renderer).then(function(e){return t.To=new e(t.properties),t.To.add(),t.emit("NAVIGATE_IN",{to:{page:t.To.properties.page,view:t.To.wrap.lastElementChild},trigger:t.trigger,location:t.location}),Promise.resolve(t.To.show({trigger:t.trigger,contextual:t.Contextual})).then(function(){t.popping=!1,t.running=!1,t.detach(t.links),t.links=document.querySelectorAll("a:not([target]):not([data-router-disabled])"),t.attach(t.links),t.emit("NAVIGATE_END",{to:{page:t.To.properties.page,view:t.To.wrap.lastElementChild},from:{page:t.From.properties.page,view:t.From.properties.view},trigger:t.trigger,location:t.location}),t.From=t.To,t.trigger=null})})}catch(e){return Promise.reject(e)}},r}(u),p=function(n,r){this.wrap=n,this.name=r};p.prototype.show=function(n){var r=this,t=n.trigger,e=n.contextual,i=this.wrap.lastElementChild,o=this.wrap.firstElementChild;return new Promise(function(h){e?(i.setAttribute("data-transition-in",e.name),i.removeAttribute("data-transition-out",e.name),e.in&&e.in({to:i,from:o,trigger:t,done:h})):(i.setAttribute("data-transition-in",r.name),i.removeAttribute("data-transition-out",r.name),r.in&&r.in({to:i,from:o,trigger:t,done:h}))})},p.prototype.hide=function(n){var r=this,t=n.trigger,e=n.contextual,i=this.wrap.firstElementChild;return new Promise(function(o){e?(i.setAttribute("data-transition-out",e.name),i.removeAttribute("data-transition-in",e.name),e.out&&e.out({from:i,trigger:t,done:o})):(i.setAttribute("data-transition-out",r.name),i.removeAttribute("data-transition-in",r.name),r.out&&r.out({from:i,trigger:t,done:o}))})},console.log("Highway v2.2.0");const f={Core:g,Helpers:s,Renderer:a,Transition:p};new f.Core({});
