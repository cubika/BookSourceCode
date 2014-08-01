define([
	"./core",
	"./var/rnotwhite"
], function (jQuery, rnotwhite) {
	
	function Data() {
		Object.defineProperty(this.cache = {}, {
			get: function() {
				return {};
			}
		});
		this.expando = jQuery.expando + Math.random();
	}

	Data.uid = 1;
	Data.accepts = jQuery.acceptData;

	Data.prototype = {
		key: function(owner) {

		},
		set: function(owner, data, value) {

		},
		get: function(owner, key) {

		},
		access: function(owner, key, value) {

		},
		remove: function(owner, key) {

		},
		hasData: function(owner) {

		},
		discard: function(owner) {

		}
	};

	return Data;
});