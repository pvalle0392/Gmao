sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ebimList.ListBinding.controller.ordenes", {

		onInit: function () {
		//	this.byId("order-list").getView().hide();
		this.getView().byId("order-list").setVisible(false);
		},
		
		onNavBack : function () {
			this.getOwnerComponent().getTargets().display("Index");
			
		},
		onSearch: function (event){ 
			this.getView().byId("order-list").setVisible(true); 
			var dateLow = this.byId("fecha-inicio").getValue();
			var dateLowArray = dateLow.split("-");
			var dateLow = dateLowArray[0] + dateLowArray[1] + dateLowArray[2];
			var dateHigh = this.byId("fecha-fin").getValue();
			var dateHighArray = dateHigh.split("-");
			var dateHigh = dateHighArray[0] + dateHighArray[1] + dateHighArray[2];
			var plant = this.byId("plan-plant").getValue();
			jQuery.sap.require("sap.m.MessageToast"); 
			sap.m.MessageToast.show(dateLow + "//" + dateHigh + "//" + plant);
		//var oTable  = this.byId("oTable");
			var sUrl = "/sap/opu/odata/sap/ZGMAO_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			sap.ui.getCore().setModel(oModel);
		/*	oModel.read("/OM_GetDocumentSet", null, ["&$filter=Zorderid eq '99'"],false, 
						function(oData, oResponse) {
							
							jQuery.sap.require("sap.m.MessageToast");
							sap.m.MessageToast.show("respuesta exitosa");
						},
						function(error){
							jQuery.sap.require("sap.m.MessageToast");
						 	sap.m.MessageToast.show("Error!");
					    });*/
			var materialObject = {
								  "ZOM_GetList_BodySet": [
								    {
								      "FieldName": "SHOW_DOCS_WITH_FROM_DATE",
								      "Sign": "I",
								      "Option": "EQ",
								      "LowValue": "20200316",
								      "HighValue": ""
								    },
								    {
								      "FieldName": "SHOW_DOCS_WITH_TO_DATE",
								      "Sign": "I",
								      "Option": "EQ",
								      "LowValue": "20200330",
								      "HighValue": ""
								    }
								  ],
								  "NAVOMLIST": [
								    {
								      "Nro": "",
								      "OrderId": "",
								      "OrderDesc": ""
								    }
								  ]
					
								};
			oModel.create( "/OM_GetListSet", materialObject,  
			function (oData, oResponse) { 
						    jQuery.sap.require("sap.m.MessageToast");
							sap.m.MessageToast.show("respuesta exitosa");},
			function (err) {
							jQuery.sap.require("sap.m.MessageToast");
							sap.m.MessageToast.show("respuesta exitosa");});
	
		}
		

	});

});