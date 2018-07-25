(function(F){

	/**
	 * This method is called from the {@link FooTable.State#read} method and allows a components to retrieve its' stored state.
	 * @instance
	 * @protected
	 * @function
	 */
	F.Component.prototype.readState = function(){};

	/**
	 * This method is called from the {@link FooTable.State#write} method and allows a components to write its' current state to the store.
	 * @instance
	 * @protected
	 * @function
	 */
	F.Component.prototype.writeState = function(){};

	/**
	 * This method is called from the {@link FooTable.State#clear} method and allows a components to clear any stored state.
	 * @instance
	 * @protected
	 * @function
	 */
	F.Component.prototype.clearState = function(){};

})(FooTable);