// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.declare("sap.ushell.services.Container");jQuery.sap.require("sap.ushell.utils");jQuery.sap.require("sap.ushell.System");var c,d="sap.ushell.Container.dirtyState.",p;sap.ushell.utils.testPublishAt(sap.ushell.services);function a(){close()}sap.ushell.utils.testPublishAt(sap.ushell.services);function r(){document.location="about:blank"}sap.ushell.utils.testPublishAt(sap.ushell.services);function g(){return localStorage}function b(P){if(p&&p[P]){return p[P]}return"sap.ushell.adapters."+P}function f(s){return(c.services&&c.services[s])||{}}function h(n,s,P){var A=f(n).adapter||{},e=A.module||b(s.getPlatform())+"."+n+"Adapter";jQuery.sap.require(e);return new(jQuery.sap.getObject(e))(s,P,{config:A.config||{}})}function C(A){var l=new sap.ui.base.EventProvider(),R="sap.ushell.Container."+A.getSystem().getPlatform()+".remoteSystem.",m={},G,s,L=g(),S=new sap.ushell.utils.Map(),j="sap.ushell.Container."+A.getSystem().getPlatform()+".sessionTermination",t=this;this.cancelLogon=function(){if(this.oFrameLogonManager){this.oFrameLogonManager.cancelLogon()}};this.createRenderer=function(e){var o,i,q,u;e=e||c.defaultRenderer;if(!e){throw new Error("Missing renderer name")}u=(c.renderers&&c.renderers[e])||{};i=u.module||(e.indexOf(".")<0?"sap.ushell.renderers."+e+".Renderer":e);jQuery.sap.require(i);if(u.componentData&&u.componentData.config){o={config:u.componentData.config}}q=new(jQuery.sap.getObject(i))({componentData:o});if(q instanceof sap.ui.core.UIComponent){q=new sap.ui.core.ComponentContainer({component:q,height:"100%",width:"100%"})}if(!(q instanceof sap.ui.core.Control)){throw new Error("Unsupported renderer type for name "+e)}return q};this.DirtyState={CLEAN:"CLEAN",DIRTY:"DIRTY",MAYBE_DIRTY:"MAYBE_DIRTY",PENDING:"PENDING",INITIAL:"INITIAL"};this.getGlobalDirty=function(){var i,D=new jQuery.Deferred(),u=jQuery.sap.uid(),o,P=0,q=this.DirtyState.CLEAN;function v(){if(P===0||q===t.DirtyState.DIRTY){D.resolve(q);jQuery.sap.log.debug("getGlobalDirty() Resolving: "+q,null,"sap.ushell.Container")}}function w(x){if(x.key.indexOf(d)===0&&x.newValue!==t.DirtyState.INITIAL&&x.newValue!==t.DirtyState.PENDING){jQuery.sap.log.debug("getGlobalDirty() Receiving event key: "+x.key+" value: "+x.newValue,null,"sap.ushell.Container");if(x.newValue===t.DirtyState.DIRTY||x.newValue===t.DirtyState.MAYBE_DIRTY){q=x.newValue}P-=1;v()}}if(sap.ui.Device.browser.msie){return D.resolve(this.DirtyState.MAYBE_DIRTY).promise()}try{L.setItem(u,"CHECK");L.removeItem(u)}catch(e){jQuery.sap.log.warning("Error calling localStorage.setItem(): "+e,null,"sap.ushell.Container");return D.resolve(this.DirtyState.MAYBE_DIRTY).promise()}if(G){throw new Error("getGlobalDirty already called!")}G=D;window.addEventListener('storage',w);D.always(function(){window.removeEventListener('storage',w);G=undefined});for(i=L.length-1;i>=0;i-=1){o=L.key(i);if(o.indexOf(d)===0){if(L.getItem(o)==='PENDING'){L.removeItem(o);jQuery.sap.log.debug("getGlobalDirty() Cleanup of unresolved 'PENDINGS':"+o,null,"sap.ushell.Container")}else{P+=1;sap.ushell.utils.localStorageSetItem(o,this.DirtyState.PENDING,true);jQuery.sap.log.debug("getGlobalDirty() Requesting status for: "+o,null,"sap.ushell.Container")}}}v();setTimeout(function(){if(D.state()!=="resolved"){D.resolve('MAYBE_DIRTY');jQuery.sap.log.debug("getGlobalDirty() Timeout reached, - resolved 'MAYBE_DIRTY'",null,"sap.ushell.Container")}},P*2000);return D.promise()};this.getLogonSystem=function(){return A.getSystem()};this.getUser=function(){return A.getUser()};this.getService=function(e,P){var o={},M,K,i,q,u,v,w;function x(y){var D=new jQuery.Deferred();if(!y){throw new Error("Missing system")}D.resolve(h(e,y,P));sap.ushell.Container.addRemoteSystem(y);return D.promise()}if(!e){throw new Error("Missing service name")}if(e.indexOf(".")>=0){throw new Error("Unsupported service name")}v=f(e);M=v.module||"sap.ushell.services."+e;K=M+"/"+(P||"");w={config:v.config||{}};if(!S.containsKey(K)){jQuery.sap.require(M);i=jQuery.sap.getObject(M);if(i.hasNoAdapter===true){q=new i(o,P,w)}else{u=h(e,A.getSystem(),P);o.createAdapter=x;q=new i(u,o,P,w)}S.put(K,q);return q}return S.get(K)};sap.ushell.utils.testPublishAt(t);function k(){var o,q,i,K;for(i=L.length-1;i>=0;i-=1){K=L.key(i);if(K.indexOf(R)===0){try{o=K.substring(R.length);q=JSON.parse(L.getItem(K));m[o]=new sap.ushell.System(q)}catch(e){L.removeItem(K)}}}return m}sap.ushell.utils.testPublishAt(t,"suppressOData");function n(){function e(E,i,F){jQuery.sap.log.warning(E,null,"sap.ushell.Container");if(F){setTimeout(F.bind(null,E),5000)}return{abort:function(){return}}}OData.read=function(o,i,F){return e("OData.read('"+(o&&o.Uri?o.requestUri:o)+"') disabled during logout processing",i,F)};OData.request=function(o,i,F){return e("OData.request('"+(o?o.requestUri:"")+"') disabled during logout processing",i,F)}}this.addRemoteSystem=function(o){var e=o.getAlias(),O=m[e];if(O){if(O.toString()===o.toString()){return}jQuery.sap.log.warning("Replacing "+O+" by "+o,null,"sap.ushell.Container")}else{jQuery.sap.log.debug("Added "+o,null,"sap.ushell.Container")}m[e]=o;sap.ushell.utils.localStorageSetItem(R+e,o)};this.addRemoteSystemForServiceUrl=function(e){var M,o={baseUrl:";o="};if(!e||e.charAt(0)!=='/'||e.indexOf('//')===0){return}M=/^[^?]*;o=([^\/;?]*)/.exec(e);if(M&&M.length>=2){o.alias=M[1]}e=e.replace(/;[^\/?]*/g,"");if(/^\/sap\/(bi|hana|hba)\//.test(e)){o.platform="hana";o.alias=o.alias||"hana"}else if(/^\/sap\/opu\//.test(e)){o.platform="abap"}if(o.alias&&o.platform){this.addRemoteSystem(new sap.ushell.System(o))}};this.attachLogoutEvent=function(F){l.attachEvent("Logout",F)};this.detachLogoutEvent=function(F,o){l.detachEvent("Logout",F)};this.logout=function(){var D=new jQuery.Deferred();function i(){A.logout(true).always(function(){L.removeItem(j);D.resolve()})}function o(){if(l.fireEvent("Logout",true)){i()}else{setTimeout(i,1000)}}function q(){var m,u=[];if(s){window.removeEventListener('storage',s)}sap.ushell.utils.localStorageSetItem(j,"pending");n();m=k();Object.keys(m).forEach(function(v){try{u.push(h("Container",m[v]).logout(false))}catch(e){jQuery.sap.log.warning("Could not create adapter for "+v,e.toString(),"sap.ushell.Container")}L.removeItem(R+v)});jQuery.when.apply(jQuery,u).done(o)}if(typeof A.addFurtherRemoteSystems==='function'){A.addFurtherRemoteSystems().always(q)}else{q()}return D.promise()};this.setLogonFrameProvider=function(o){if(this.oFrameLogonManager){this.oFrameLogonManager.setLogonFrameProvider(o)}};sap.ui.getCore().getEventBus().subscribe("sap.ushell.Container","addRemoteSystemForServiceUrl",function(e,E,D){t.addRemoteSystemForServiceUrl(D)});if(typeof A.logoutRedirect==='function'){s=function(o){function e(){a();r()}if(sap.ushell.Container!==t){return}if(o.key.indexOf(R)===0&&o.newValue&&o.newValue!==L.getItem(o.key)){sap.ushell.utils.localStorageSetItem(o.key,o.newValue)}if(o.key===j){if(o.newValue==="pending"){n();if(l.fireEvent("Logout",true)){e()}else{setTimeout(e,1000)}}}};window.addEventListener('storage',s)}}sap.ushell.bootstrap=function(P,A){var o;if(sap.ushell.Container!==undefined){throw new Error("Cannot initialize twice")}sap.ushell.Container=null;c=JSON.parse(JSON.stringify(window["sap-ushell-config"]||{}));p=A;if(typeof window["sap.ushell.bootstrap.callback"]==="function"){setTimeout(window["sap.ushell.bootstrap.callback"])}if(c.modulePaths){Object.keys(c.modulePaths).forEach(function(m){jQuery.sap.registerModulePath(m,c.modulePaths[m])})}o=h("Container",new sap.ushell.System({alias:"",platform:c.platform||P}));return o.load().done(function(){sap.ushell.Container=new C(o)})}}());