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
			var oCombo = this.byId("order-list");
			this.getView().byId("order-list").setVisible(true); 
			var dateLow = this.byId("fecha-inicio").getValue();
			var dateLowArray = dateLow.split("-");
			var dateLow = dateLowArray[0] + dateLowArray[1] + dateLowArray[2];
			var dateHigh = this.byId("fecha-fin").getValue();
			var dateHighArray = dateHigh.split("-");
			var dateHigh = dateHighArray[0] + dateHighArray[1] + dateHighArray[2];
			var plant = this.byId("plan-plant").getValue();
			//jQuery.sap.require("sap.m.MessageToast"); 
			//sap.m.MessageToast.show(dateLow + "//" + dateHigh + "//" + plant);
		//var oTable  = this.byId("oTable");
			var sUrl = "/sap/opu/odata/sap/ZGMAO_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			sap.ui.getCore().setModel(oModel);
			var userRequestBody = {
			
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
  ]/*
						"FieldName" : "",
					    "Sign" : "",
					    "Option" : "",
					    "LowValue" : "",
					    "HighValue" : "",
						ZOM_GetList_BodySet : [],
						NAVOMLIST : []*/
				
			};
		/*	var var1 = {
				  "FieldName": "SHOW_DOCS_WITH_FROM_DATE",
			      "Sign": "I",
			      "Option": "EQ",
			      "LowValue": "20200316",
			      "HighValue": ""
			};
			var var2 = {
				"FieldName": "SHOW_DOCS_WITH_FROM_DATE",
		        "Sign": "I",
		        "Option": "EQ",
		        "LowValue": "20200330",
		        "HighValue": ""
			};
			/*var var3 = {
		 		"Nro": "",
		        "OrderId": "",
		        "OrderDesc": ""
			};*/
			//userRequestBody.ZOM_GetList_BodySet.push(var1);
			//userRequestBody.ZOM_GetList_BodySet.push(var2);
		//	userRequestBody.NAVOMLIST.push(var3);
			oModel.create("/OM_GetListSet",userRequestBody,null,
							function(oData, oResponse){
						    var arrayData = oData.NAVOMLIST.results;	
							var jsondata = {items: arrayData };
							var jsonModel = new sap.ui.model.json.JSONModel();
							jsonModel.setData(jsondata);
					        console.log(arrayData);
						    
							oCombo.setModel(jsonModel);
							oCombo.bindAggregation("items", "/items",new sap.ui.core.ListItem({text: "{OrdeDesc}", id:"{OrderId}"}));
								
						    },
						    function(err){
						        console.log("error");
						    }
			);							  
		
							
		}
		

	});

});
/*function(oData, oResponse) {
				
				var arrayData = oData.results[0].NAVEQUILIST.results;	
				var jsondata = {items: arrayData };
				var jsonModel = new sap.ui.model.json.JSONModel();
				jsonModel.setData(jsondata);
				
				console.log(arrayData);
				
				var oCombo = that.byId("cboEqui");
				oCombo.setModel(jsonModel);
				oCombo.bindAggregation("items", "/items", 
									new sap.ui.core.ListItem(
										{ text: "{Zdescript}",
										  id:"{Zequnr}"
										}
									)
								);

				//oTable.bindRows();
			}
			,function(error){
				//Agregar logica cuando hay error
				
			}
						oModel.create("/OM_GetListSet",userRequestBody,null,{
							success: function(oData, oResponse){
						    var arrayData = oData.NAVOMLIST[0];	
							var jsondata = {items: arrayData };
							var jsonModel = new sap.ui.model.json.JSONModel();
							jsonModel.setData(jsondata);
					        console.log(arrayData);
						    /*var oCombo = this.byId("order-list");
							oCombo.setModel(jsonModel);
							oCombo.bindAggregation("items", "/items",new sap.ui.core.ListItem({text: "{OrdeDesc}", id:"{OrderId}"}));
								
						   *//* },
						    error: function(err){
						        console.log("error");
						    }
			});	
			
			
			*/

