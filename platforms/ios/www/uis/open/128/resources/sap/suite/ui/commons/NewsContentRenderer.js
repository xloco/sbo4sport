/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.suite.ui.commons.NewsContentRenderer");sap.suite.ui.commons.NewsContentRenderer={};
sap.suite.ui.commons.NewsContentRenderer.render=function(r,c){var s=c.getSize();var C=c.getContentText();var S=c.getSubheader();var t=c.getTooltip_AsString();if(!t){t=C+" "+S}r.write("<div");r.writeControlData(c);r.writeAttributeEscaped("title",t);r.writeAttribute("id",c.getId()+"-news-content");r.addClass(s);r.addClass("sapSuiteUiCommonsNwC");if(c.hasListeners("press")){r.addClass("sapSuiteUiCommonsPointer");r.writeAttribute("tabindex","0")}r.writeClasses();r.write(">");r.write("<div");r.addClass("sapSuiteUiCommonsNwCCTxt");r.addClass(s);r.writeClasses();r.write(">");r.renderControl(c._oCText);r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-subheader");r.addClass("sapSuiteUiCommonsNwCSbh");r.addClass(s);r.writeClasses();r.write(">");r.writeEscaped(S);r.write("</div>");r.write("</div>")};