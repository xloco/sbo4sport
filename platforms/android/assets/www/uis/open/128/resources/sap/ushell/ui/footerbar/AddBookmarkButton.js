/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ushell.ui.footerbar.AddBookmarkButton");jQuery.sap.require("sap.ushell.library");jQuery.sap.require("sap.m.Button");sap.m.Button.extend("sap.ushell.ui.footerbar.AddBookmarkButton",{metadata:{library:"sap.ushell",properties:{"beforePressHandler":{type:"any",group:"Misc",defaultValue:null},"afterPressHandler":{type:"any",group:"Misc",defaultValue:null},"appData":{type:"object",group:"Misc",defaultValue:null}}}});
// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";jQuery.sap.require("sap.ui.layout.form.SimpleForm");jQuery.sap.require("sap.m.Label");jQuery.sap.require("sap.m.Input");jQuery.sap.require("sap.m.Dialog");jQuery.sap.require("sap.m.Button");jQuery.sap.require("sap.ushell.resources");jQuery.sap.declare("sap.ushell.ui.footerbar.AddBookmarkButton");sap.ushell.ui.footerbar.AddBookmarkButton.prototype.init=function(){this.setIcon('sap-icon://add-favorite');this.setWidth('100%');this.setText(sap.ushell.resources.i18n.getText("addToHomePageBtn"));this.setTooltip(sap.ushell.resources.i18n.getText("addToHomePageBtn_tooltip"));this.setEnabled();var s=this;this.attachPress(function(){if(s.getBeforePressHandler()){s.getBeforePressHandler()()}s.showAddBookmarkDialog(function(){if(s.getAfterPressHandler()){s.getAfterPressHandler()()}})});if(sap.m.Button.prototype.init){sap.m.Button.prototype.init.apply(this,arguments)}};sap.ushell.ui.footerbar.AddBookmarkButton.prototype.exit=function(){if(this.oGroupsSelect){this.oGroupsSelect.destroy()}if(this.oSimpleForm){this.oSimpleForm.destroy()}if(this.oDialog){this.oDialog.destroy()}if(sap.m.Button.prototype.exit){sap.m.Button.prototype.exit.apply(this,arguments)}};sap.ushell.ui.footerbar.AddBookmarkButton.prototype.showAddBookmarkDialog=function(c){var s=this;this.oResourceBundle=sap.ushell.resources.i18n;this.appData=this.getAppData()||{};this.oTitleInput=new sap.m.Input('bookmarkTitleInput',{value:this.appData.title||''});this.oTitleInput.attachLiveChange(function(){s._toggleOkButton(this.getValue(),s.oDialog.getBeginButton())});this.oSubTitleInput=new sap.m.Input('bookmarkSubTitleInput',{value:this.appData.subtitle||''});this.oInfoInput=new sap.m.Input('bookmarkInfoInput',{value:this.appData.info||''});this.oGroupsSelect=new sap.m.Select("groupsSelect",{tooltip:"{i18n>bookmarkDialogoInfo_tooltip}",items:{path:"/groups",template:new sap.ui.core.ListItem({text:"{title}"})},maxWidth:"384px"});var a=sap.ui.getCore().byId("shell").getModel();if(!a.oData.groups.length){var l=sap.ushell.Container.getService("LaunchPage"),e=sap.ui.getCore().getEventBus();e.publish("launchpad","loadDashboardGroups")}this.oGroupsSelect.setModel(a);this.cb=c;var t=new sap.m.Label({text:this.oResourceBundle.getText('titleFld')}),S=new sap.m.Label({text:this.oResourceBundle.getText('subtitleFld')}),i=new sap.ui.core.Icon({src:this.appData.icon||'sap-icon://home',size:'32px'}),I=new sap.m.Label({text:this.oResourceBundle.getText('infoMsg')}),g=new sap.m.Label({text:this.oResourceBundle.getText('GroupListItem_label')});var b=[i,t,this.oTitleInput,S,this.oSubTitleInput,I,this.oInfoInput];b.push(g);b.push(this.oGroupsSelect);this.oSimpleForm=new sap.ui.layout.form.SimpleForm({id:'bookmarkFormId',content:b});var r=sap.ushell.resources.i18n;this.oTitleInput.setTooltip(r.getText("bookmarkDialogoTitle_tooltip"));this.oSubTitleInput.setTooltip(r.getText("bookmarkDialogoSubTitle_tooltip"));this.oInfoInput.setTooltip(r.getText("bookmarkDialogoInfo_tooltip"));this.oGroupsSelect.setTooltip(r.getText("bookmarkDialogoGroup_tooltip"));this._openDialog(this.oSimpleForm)};sap.ushell.ui.footerbar.AddBookmarkButton.prototype._toggleOkButton=function(v,o){o.setEnabled((v)?true:false)};sap.ushell.ui.footerbar.AddBookmarkButton.prototype._openDialog=function(c){var o=new sap.m.Button('bookmarkOkBtn',{text:this.oResourceBundle.getText('okBtn'),press:this._handleOkButtonPress.bind(this),enabled:false}),a=new sap.m.Button('bookmarkCancelBtn',{text:this.oResourceBundle.getText('cancelBtn'),press:function(){this.oDialog.close();this.cb()}.bind(this)});this._toggleOkButton(this.appData.title,o);this.oDialog=new sap.m.Dialog({id:'bookmarkDialog',title:this.oResourceBundle.getText('addToHomePageBtn'),contentWidth:'400px',content:c,beginButton:o,endButton:a,afterClose:function(){this.oGroupsSelect.destroy();this.oSimpleForm.destroy();this.oDialog.destroy();delete(this.oGroupsSelect);delete(this.oSimpleForm);delete(this.oDialog)}.bind(this)});this.oDialog.open()};sap.ushell.ui.footerbar.AddBookmarkButton.prototype._handleOkButtonPress=function(){var s;if(this.oGroupsSelect.getSelectedItem()){s=this.oGroupsSelect.getSelectedItem().getBindingContext().getObject()}var d={title:this.oTitleInput.getValue(),subtitle:this.oSubTitleInput.getValue(),url:this.appData.customUrl?this.appData.customUrl:location.hash||window.location.href,icon:this.appData.icon,info:this.oInfoInput.getValue(),numberUnit:this.appData.numberUnit,serviceUrl:typeof(this.appData.serviceUrl)==="function"?this.appData.serviceUrl():this.appData.serviceUrl,serviceRefreshInterval:this.appData.serviceRefreshInterval,group:s},e=sap.ui.getCore().getEventBus();e.publish("launchpad","addBookmarkTile",d);this.oDialog.close();this.cb()};sap.ushell.ui.footerbar.AddBookmarkButton.prototype.setEnabled=function(e){var s="",p=true;if(sap.ui.getCore().byId("shell")){s=sap.ui.getCore().byId("shell").getModel().getProperty("/currentState").stateName||"";if(sap.ui.getCore().byId("shell").getModel().getProperty("/personalization")!==undefined){p=sap.ui.getCore().byId("shell").getModel().getProperty("/personalization")}}if(s==='headerless'||s==='standalone'||s==='embedded'||!p){e=false}if(!sap.ushell.Container){if(this.getEnabled()){jQuery.sap.log.warning("Disabling 'Save as Tile' button: unified shell container not initialized",null,"sap.ushell.ui.footerbar.AddBookmarkButton")}e=false}sap.m.Button.prototype.setEnabled.call(this,e);if(!e){this.addStyleClass("sapUshellAddBookmarkButton")}}}());