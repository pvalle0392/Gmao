sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";
	
	return Controller.extend("ebimList.ListBinding.controller.Index", {
		onInit: function () {
		
		},
		
		onPress: function (oEvent) {
			
				//this.getOwnerComponent().getRouter().navTo("ordenes");
				this.getOwnerComponent().getTargets().display("ordenes");
					
		},
		
		onPress2: function (oEvent){
			this.getOwnerComponent().getTargets().display("activos");
		},

		onClick: function () {
			
			console.log("Click");
		}
	});
});