sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ebimList.ListBinding.controller.activos", {

		onInit: function () {
			
			
		},
		
		
		onPress3: function(){
			var sUrl = "/sap/opu/odata/sap/ZGMAO_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			sap.ui.getCore().setModel(oModel);
			
			oModel.read("/OM_GetDocumentSet", null, ["&$filter=Zorderid eq '99'"],false, 
						function(oData, oResponse) {
							
							jQuery.sap.require("sap.m.MessageToast");
							sap.m.MessageToast.show("respuesta exitosa");
		
						},
						function(error){
							jQuery.sap.require("sap.m.MessageToast");
						 	sap.m.MessageToast.show("Error!");
					    });
		},
		
		
		onNavBack : function () {
			
			
		}
	

	});

});