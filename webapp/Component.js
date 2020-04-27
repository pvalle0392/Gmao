sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ebimList/ListBinding/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("ebimList.ListBinding.Component", {

		metadata: {
			manifest: "json"
		},

		init: function () {

			UIComponent.prototype.init.apply(this, arguments);
			this.setModel(models.createDeviceModel(), "device");
			this.getRouter().initialize();
		}
	});
});