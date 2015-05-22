// Copyright (c) 2013 SAP AG, All Rights Reserved
(function(){"use strict";sap.ui.getCore().loadLibrary("sap.m");jQuery.sap.require("sap.ui.core.IconPool");jQuery.sap.require("sap.ushell.components.tiles.utils");sap.ui.controller("sap.ushell.components.tiles.action.ActionTile",{onInit:function(){var v=this.getView(),V=v.getViewData(),r=sap.ushell.components.tiles.utils.getResourceBundleModel(),t=V.chip,c=t.configuration.getParameterValueAsString('tileConfiguration'),C=sap.ushell.components.tiles.utils.getActionConfiguration(c,t.configurationUi.isEnabled()),m,a=this;function f(s,S){var b=r.getResourceBundle(),R=b.getText("configuration.semantic_object")+":\n"+s+"\n\n"+b.getText("configuration.semantic_action")+":\n"+S;return R}v.setModel(r,"i18n");m=new sap.ui.model.json.JSONModel({config:C,displayText:f(C.semantic_object,C.semantic_action)});v.setModel(m);if(t.configurationUi.isEnabled()){t.configurationUi.setUiProvider(function(){var o=sap.ushell.components.tiles.utils.getConfigurationUi(a.getView(),"sap.ushell.components.tiles.action.Configuration");t.configurationUi.attachCancel(this.onCancelConfiguration.bind(null,o));t.configurationUi.attachSave(this.onSaveConfiguration.bind(this,o,f));return o}.bind(this));v.byId("actionTile").setTooltip(r.getResourceBundle().getText("edit_configuration.tooltip"))}},onPress:function(e){var t=this.getView().getViewData().chip;if(t.configurationUi.isEnabled()){t.configurationUi.display()}},onSaveConfiguration:function(c,f){var d=jQuery.Deferred(),m=c.getModel(),t=m.getProperty("/tileModel"),T=c.getViewData().chip;function l(E){jQuery.sap.log.warning(E,null,"sap.ushell.components.tiles.action.ActionTile.controller");d.reject(E)}if(jQuery.trim(m.getProperty("/config/semantic_action"))==""||(jQuery.trim(m.getProperty("/config/navigation_provider"))=="LPD"&&(jQuery.trim(m.getProperty("/config/navigation_provider_role"))==""||jQuery.trim(m.getProperty("/config/navigation_provider_instance"))==""||(jQuery.trim(m.getProperty("/config/target_application_alias"))==""&&jQuery.trim(m.getProperty("/config/target_application_id"))=="")))||(jQuery.trim(m.getProperty("/config/navigation_provider"))=="SAPUI5"&&(jQuery.trim(m.getProperty("/config/display_title_text"))==""||jQuery.trim(m.getProperty("/config/url"))==""||jQuery.trim(m.getProperty("/config/ui5_component"))==""))||(jQuery.trim(m.getProperty("/config/desktopChecked"))==""&&jQuery.trim(m.getProperty("/config/phoneChecked"))==""&&jQuery.trim(m.getProperty("/config/tabletChecked")))){var s=c.byId("semantic_actionInput"),o=c.byId("target_application_descriptionInput"),a=c.byId("target_application_urlInput"),b=c.byId("target_application_componentInput"),n=c.byId("navigation_provider_roleInput"),N=c.byId("navigation_provider_instanceInput"),e=c.byId("target_application_aliasInput"),g=c.byId("target_application_idInput"),F=c.byId("desktopCB"),h=c.byId("tabletCB"),i=c.byId("phoneCB");if(s.getValue()==""){s.setValueState(sap.ui.core.ValueState.Error)}if(jQuery.trim(m.getProperty("/config/navigation_provider"))=="SAPUI5"&&o.getValue()==""){o.setValueState(sap.ui.core.ValueState.Error)}if(jQuery.trim(m.getProperty("/config/navigation_provider"))=="SAPUI5"&&a.getValue()==""){a.setValueState(sap.ui.core.ValueState.Error)}if(jQuery.trim(m.getProperty("/config/navigation_provider"))=="SAPUI5"&&b.getValue()==""){b.setValueState(sap.ui.core.ValueState.Error)}if(jQuery.trim(m.getProperty("/config/navigation_provider"))=="LPD"&&n.getValue()==""){n.setValueState(sap.ui.core.ValueState.Error)}if(jQuery.trim(m.getProperty("/config/navigation_provider"))=="LPD"&&N.getValue()==""){N.setValueState(sap.ui.core.ValueState.Error)}if(jQuery.trim(m.getProperty("/config/navigation_provider"))=="LPD"&&e.getValue()==""&&g.getValue()==""){e.setValueState(sap.ui.core.ValueState.Error);g.setValueState(sap.ui.core.ValueState.Error)}if(jQuery.trim(m.getProperty("/config/desktopChecked"))==""&&jQuery.trim(m.getProperty("/config/phoneChecked"))==""&&jQuery.trim(m.getProperty("/config/tabletChecked"))){F.setValueState(sap.ui.core.ValueState.Error);h.setValueState(sap.ui.core.ValueState.Error);i.setValueState(sap.ui.core.ValueState.Error)}d.reject("mandatory_fields_missing");return d.promise()}if(sap.ushell.components.tiles.utils.tableHasDuplicateParameterNames(m.getProperty("/config/rows"))){var B=sap.ushell.components.tiles.utils.getResourceBundleModel().getResourceBundle();d.reject(B.getText("configuration.signature.uniqueParamMessage.text"))}else{var j=m.getProperty("/config/formFactorConfigDefault")?undefined:sap.ushell.components.tiles.utils.buildFormFactorsObject(m);var M=sap.ushell.components.tiles.utils.getMappingSignatureString(m.getProperty("/config/rows"),m.getProperty("/config/isUnknownAllowed"));var k={semantic_object:jQuery.trim(m.getProperty("/config/semantic_object"))||"",semantic_action:jQuery.trim(m.getProperty("/config/semantic_action"))||"",display_title_text:jQuery.trim(m.getProperty("/config/display_title_text"))||"",url:jQuery.trim(m.getProperty("/config/url"))||"",ui5_component:jQuery.trim(m.getProperty("/config/ui5_component"))||"",navigation_provider:jQuery.trim(m.getProperty("/config/navigation_provider")),navigation_provider_role:jQuery.trim(m.getProperty("/config/navigation_provider_role"))||"",navigation_provider_instance:jQuery.trim(m.getProperty("/config/navigation_provider_instance"))||"",target_application_id:jQuery.trim(m.getProperty("/config/target_application_id"))||"",target_application_alias:jQuery.trim(m.getProperty("/config/target_application_alias"))||"",display_info_text:jQuery.trim(m.getProperty("/config/display_info_text")),form_factors:j,mapping_signature:M};var p=T.bag.getBag('tileProperties');p.setText('display_title_text',k.display_title_text);T.writeConfiguration.setParameterValues({tileConfiguration:JSON.stringify(k)},function(){var C=T.configuration.getParameterValueAsString('tileConfiguration'),q=sap.ushell.components.tiles.utils.getActionConfiguration(C,false),r=sap.ushell.components.tiles.utils.getActionConfiguration(C,true);m=new sap.ui.model.json.JSONModel({config:q,tileModel:t});c.setModel(m);t.setData({config:r,displayText:f(r.semantic_object,r.semantic_action)},false);p.save(function(){jQuery.sap.log.debug("property bag 'tileProperties' saved successfully");if(T.title){T.title.setTitle(k.display_title_text,function(){d.resolve()},l)}else{d.resolve()}},l)},l)}return d.promise()},onCancelConfiguration:function(c){var v=c.getViewData(),m=c.getModel(),t=m.getProperty("/tileModel"),T=v.chip,C=sap.ushell.components.tiles.utils.getActionConfiguration(T.configuration.getParameterValueAsString('tileConfiguration'),false);c.getModel().setData({config:C,tileModel:t},false)}})}());