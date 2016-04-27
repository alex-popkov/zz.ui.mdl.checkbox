/**
 * @fileoverview Provide zz.ui.mdl.checkbox base object.
 * @license Apache-2.0
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.ui.mdl.checkbox' );

goog.require( 'zz.ui.mdl.CheckboxRenderer' );
goog.require( 'zz.ui.mdl.Checkbox' );

/**
 * Base namespace for zz.ui.mdl.checkbox module.
 * @const
 */
zz.ui.mdl.checkbox = zz.ui.mdl.checkbox || { };

/**********************************************************************************************************************
 * Register a decorator factory function for zz.ui.mdl.Checkboxes.                                                         *
 **********************************************************************************************************************/

goog.ui.registry.setDecoratorByClassName( zz.ui.mdl.CheckboxRenderer.CSS_CLASS, function( ){

    return new zz.ui.mdl.Checkbox( );
} );

/**
 * Bootstrap module method.
 */
zz.ui.mdl.checkbox.bootstrap = function( ){

	//
};
goog.exportSymbol( 'zz.ui.mdl.checkbox', zz.ui.mdl.checkbox );