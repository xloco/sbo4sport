sap.ui.define( [
        "uniorg/ui/core/mvc/md/MasterController",
        "uniorg/ui/util/Formatter",
        "uniorg/ui/core/util/download/SapShortcut",
        "uniorg/sapFourSport/apps/sponsoring/util/Formatter"
    ],
    function ( MasterController, BaseFormatter, SapShortcut ) {
        "use strict";

        return MasterController.extend( "uniorg.sapFourSport.apps.players.controller.Master", {

            onInit: function () {
                var mParameters = {
                    //bIsFilterSearch : false  // use fulltext search
                };

                MasterController.prototype.onInit.apply( this, [mParameters] );

                var oSplitApp = this.getRouter()._oSplitContainer;

                oSplitApp.hideMaster();
                oSplitApp.setMode( sap.m.SplitAppMode.HideMode );
            }

        } );

    }, /* bExport= */ true );