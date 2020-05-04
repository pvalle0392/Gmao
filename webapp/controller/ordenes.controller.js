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
			var dateLow = this.byId("fecha-low").getValue();
			var dateLowArray = dateLow.split("-");
			var dateLow = dateLowArray[0] + dateLowArray[1] + dateLowArray[2];
			var dateHigh = this.byId("fecha-high").getValue();
			var dateHighArray = dateHigh.split("-");
			var dateHigh = dateHighArray[0] + dateHighArray[1] + dateHighArray[2];
			var plant = this.byId("plan-plant").getValue();
			jQuery.sap.require("sap.m.MessageToast"); 
			sap.m.MessageToast.show(dateLow + "//" + dateHigh + "//" + plant);
		//var oTable  = this.byId("oTable");
			var sUrl = "/sap/opu/odata/sap/ZGMAO_ODATA_SRV/OM_GetListSet";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			sap.ui.getCore().setModel(oModel);
		/*	var sUrl = "/sap/opu/odata/sap/ZGMAO_ODATA_SRV/OM_GetListSet";
			$.ajax({
		          url: sUrl,
		          type: 'POST',
		          data: {
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
						},
		          processData: false,
		          success: function(data){
		              console.log("success"+data);
		          },
		          error: function(e){
		              console.log("error: "+e);
		          }
		        });
			/*
			oModel.callFunction(sFunctionName, [mParameters])
			oModel.read("/OM_GetDocumentSet", null, ["&$filter=Zorderid eq '" + orderId + "'"],false, 
						function(oData, oResponse) {
							
							jQuery.sap.require("sap.m.MessageToast");
							sap.m.MessageToast.show("respuesta exitosa");
						//	var oODataJSONModel = new sap.ui.model.json.JSONModel();
						//	oODataJSONModel.setData({ modelData : oData });
						//	oTable.setModel(oODataJSONModel);
						//	console.log(oTable);
							//oTable.bindRows("/OM_GetDocumentSet");
	

						},
						function(error){
							jQuery.sap.require("sap.m.MessageToast");
						 	sap.m.MessageToast.show("Error!");
					    });*/
		}
		

	});

});