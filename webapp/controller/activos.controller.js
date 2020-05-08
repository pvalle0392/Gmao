sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ebimList.ListBinding.controller.activos", {

		onInit: function () {
			this.getView().byId("equi-list").setVisible(false);
			
		},
		onPress3: function(){ 
			
			this.getView().byId("equi-list").setVisible(true); 
			var ubicacion = this.byId("ub-tec").getValue();
			var sUrl = "/sap/opu/odata/sap/ZGMAO_ODATA_SRV/";
			var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
			sap.ui.getCore().setModel(oModel);
			var lista = this.byId("equi-list");
			
			oModel.read("/Equi_GetListSet", null, ["&$filter=(ZubTec eq '"+ubicacion+"')&$expand=EQUILIST"],false, 
						function(oData, oResponse) {
							var arrayData = oData.results[0].EQUILIST.results;	
							var jsondata = {items: arrayData };
							var jsonModel = new sap.ui.model.json.JSONModel();
							jsonModel.setData(jsondata);
							console.log(arrayData);
							lista.setModel(jsonModel);
							lista.bindAggregation("items", "/items",
													new sap.ui.core.ObjectListItem({title: "{Zdescript}", intro:"{Zequnr}", number:"{Zemplaza}"}));
						
						},
						function(error){
							console.log("error");
					    });
		},
		onNavBack : function () {
			
			
		}
	

	});

});