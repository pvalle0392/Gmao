sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ebimList.ListBinding.controller.ordenes", {

		onInit: function () {
			this.getView().byId("order-list").setVisible(false);
		},
		
		onNavBack : function () {
			this.getOwnerComponent().getTargets().display("Index");
		},
		
		onSearch: function (event){ 
			var oList = this.byId("order-list");
			this.getView().byId("order-list").setVisible(true); 
			var userRequestBody = [];
			userRequestBody.push({ZOM_GetList_BodySet: [],NAVOMLIST : []});
			var dateLow = this.byId("fecha-inicio").getValue();
			if (dateLow != '') {
				var dateLowArray = dateLow.split("-");
				var sapdateLow = dateLowArray[0] + dateLowArray[1] + dateLowArray[2];
				var var1 = {
					"FieldName": "SHOW_DOCS_WITH_FROM_DATE",
				    "Sign": "I",
				    "Option": "EQ",
				    "LowValue": sapdateLow,
				    "HighValue": ""
				};
				userRequestBody[0].ZOM_GetList_BodySet.push(var1);
			}
			
			var dateHigh = this.byId("fecha-fin").getValue();
			if (dateHigh != '') {
				var dateHighArray = dateHigh.split("-");
				var sapdateHigh = dateHighArray[0] + dateHighArray[1] + dateHighArray[2];
				var var2 = {
					"FieldName": "SHOW_DOCS_WITH_TO_DATE",
			        "Sign": "I",
			        "Option": "EQ",
			        "LowValue": sapdateHigh,
			        "HighValue": ""
				};
				userRequestBody[0].ZOM_GetList_BodySet.push(var2);
			}
			var plant = this.byId("plan-plant").getValue();
			if (plant != '') {
				var var3 = {
					"FieldName": "OPTIONS_FOR_PLANPLANT",
			        "Sign": "I",
			        "Option": "EQ",
			        "LowValue": "GREB",
			        "HighValue": ""
				};
				userRequestBody[0].ZOM_GetList_BodySet.push(var3);
			}
			var var4 = {
				    "Nro": "",
				    "OrderId": "",
				    "OrderDesc": ""
				 };
			userRequestBody[0].NAVOMLIST.push(var4);
			//console.log(userRequestBody);
			var sUrl = "/sap/opu/odata/sap/ZGMAO_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			sap.ui.getCore().setModel(oModel);
			oModel.create("/OM_GetListSet",userRequestBody[0],null,
							function(oData, oResponse){
						    var arrayData = oData.NAVOMLIST.results;	
							var jsondata = {items: arrayData };
							var jsonModel = new sap.ui.model.json.JSONModel();
							jsonModel.setData(jsondata);
							oList.setModel(jsonModel);
							oList.bindAggregation("items", "/items", new sap.ui.core.ObjectListItem({title: "{OrderId}", intro:"{OrderDesc}"}));
						    },
						    function(err){
						       // console.log("error");
						    }
			);							 
		}
	});
});

