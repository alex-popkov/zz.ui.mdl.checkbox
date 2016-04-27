/**
 * @fileoverview Provide zz.ui.mdl.checkbox base object.
 * @license Apache-2.0
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.ui.mdl.checkbox' );

goog.require( 'goog.ui.decorate' );

goog.require( 'zz.ui.mdl.CheckboxRenderer' );
goog.require( 'zz.ui.mdl.Checkbox' );
goog.require( 'zz.ui.mdl.checkbox.tpl' );

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
    soy.renderElement( goog.dom.getElement( 'root' ), zz.ui.mdl.checkbox.tpl.default );

	var chckbx1 = goog.ui.decorate( goog.dom.getElement( '1' ) );
	var chckbx2 = goog.ui.decorate( goog.dom.getElement( '2' ) );

	chckbx2.setEnabled( false );
};
goog.exportSymbol( 'zz.ui.mdl.checkbox', zz.ui.mdl.checkbox );