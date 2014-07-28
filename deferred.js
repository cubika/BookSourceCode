define([
	"./core",
	"./var/slice",
	"./callbacks"
], function(jQuery, slice) {
	jQuery.extend({
		Deferred: function(func) {
			var tuples = [
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			];
			state = "pending",
			deferred = {},
			// this is promise, man!
			promise = {
				state: function() {
					return state;
				},
				always: function() {

				},
				then: function(/* fnDone, fnFail, fnProgress */) {

				},
				promise: function(obj) {

				}
			};
			promise.pipe = promise.then;
			jQuery.each(tuples, function(i, tuple) {

			});
			promise.promise(deferred);
			if(func) {
				func.call(deferred, deferred);
			}
			return deferred;

		},
		when: function(subordiante, /*, ..., subordianteN*/) {

		}
	});

	return jQuery;
})