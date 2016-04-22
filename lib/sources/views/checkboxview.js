/**
 * @fileoverview Provide zz.ui.mdl.views.CheckboxView.
 * @license Apache-2.0
 * @author popkov.aleksander@gmail.com (Popkov Alexander)
 */

goog.provide( 'zz.ui.mdl.views.CheckboxView' );

goog.require( 'goog.dom.classlist' );
goog.require( 'zz.ui.mdl.controllers.BaseControl' );

/**
 * Default renderer for {@link zz.ui.mdl.Checkbox}s. Extends the superclass to support checkboxes states.
 * @constructor
 * @extends {zz.ui.mdl.controllers.BaseControl}
 */
zz.ui.mdl.views.CheckboxView = function( ){

	zz.ui.mdl.views.CheckboxView.base( this, 'constructor' );
};
goog.inherits( zz.ui.mdl.views.CheckboxView, zz.ui.mdl.controllers.BaseControl );
goog.addSingletonGetter( zz.ui.mdl.views.CheckboxView );

/**
 * Default CSS class to be applied to the root element of components rendered by this renderer.
 * @type {string}
 */
zz.ui.mdl.views.CheckboxView.CSS_CLASS = goog.getCssName( 'mdl-checkbox' );

/**
 * @param {zz.ui.mdl.Checkbox} control
 * @param {Element} element
 * @override
 */
zz.ui.mdl.views.CheckboxView.prototype.decorate = function( control, element ){

	goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

		'class': zz.ui.mdl.Checkbox.CSS.FOCUS_HELPER
	} ) );
	goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

		'class': zz.ui.mdl.Checkbox.CSS.BOX_OUTLINE

	}, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

		'class': zz.ui.mdl.Checkbox.CSS.TICK_OUTLINE

	} ) ) );
	// Ripple dom.
	if( goog.dom.classlist.contains( element, zz.ui.mdl.Checkbox.CSS.RIPPLE_EFFECT ) ){

		goog.dom.appendChild( element, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class': zz.ui.mdl.Checkbox.CSS.RIPPLE_CONTAINER

		}, control.getDomHelper( ).createDom( goog.dom.TagName.SPAN, {

			'class': zz.ui.mdl.Checkbox.CSS.RIPPLE
		} ) ) );
	}
	// Input element.
	control.setInputElement( control.getDomHelper( ).getElementsByTagNameAndClass(

		goog.dom.TagName.INPUT,
		zz.ui.mdl.Checkbox.CSS.INPUT,
		element )[ 0 ]
	);
	goog.dom.classlist.add( element, zz.ui.mdl.Checkbox.CSS.IS_UPGRADED );
	return goog.base( this, 'decorate', control, element );
};

/**
 * @override
 */
zz.ui.mdl.views.CheckboxView.prototype.getCssClass = function( ){

	return zz.ui.mdl.views.CheckboxView.CSS_CLASS;
};

/**
 * Updates the appearance of the control in response to a state change.
 * @param {zz.ui.mdl.Control} control Control instance to update.
 * @param {goog.ui.Component.State} state State to enable or disable.
 * @param {boolean} enable Whether the control is entering or exiting the state.
 * @override
 */
zz.ui.mdl.views.CheckboxView.prototype.setState = function( control, state, enable ){

	var element = control.getElement( );
	if( element ){

		if( state === goog.ui.Component.State.FOCUSED ){

			if( !goog.dom.classlist.contains( element, zz.ui.mdl.Checkbox.CSS.RIPPLE_EFFECT ) ){

				this.enableClassName( control, zz.ui.mdl.Checkbox.CSS.IS_FOCUSED, enable );
			}
		}
		this.updateAriaState(element, state, enable);
	}
};

/**
 * Set control input element value.
 * @param {zz.ui.mdl.Checkbox} control
 * @param {*} value
 */
zz.ui.mdl.views.CheckboxView.prototype.setValue = function( control, value ){

	control.setChecked( value );
	control.getInputElement( ).checked = value;
	this.updateClasses( control );
};

/**
 * Return control input element value.
 * @param {zz.ui.mdl.Checkbox} control
 * @returns {*} value
 */
zz.ui.mdl.views.CheckboxView.prototype.getValue = function( control ){

	return control.getInputElement( ).checked;
};

/**
 * @param {zz.ui.mdl.Checkbox} control
 */
zz.ui.mdl.views.CheckboxView.prototype.updateClasses = function( control ){

	//noinspection JSUnresolvedFunction
	if( control.isEnabled( ) ){

		goog.dom.classlist.remove( control.getElement( ), zz.ui.mdl.Checkbox.CSS.IS_DISABLED );

	} else {

		goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.Checkbox.CSS.IS_DISABLED );
	}
	//noinspection JSUnresolvedFunction
	if( control.isChecked( ) ){

		goog.dom.classlist.add( control.getElement( ), zz.ui.mdl.Checkbox.CSS.IS_CHECKED );

	}else{

		goog.dom.classlist.remove( control.getElement( ), zz.ui.mdl.Checkbox.CSS.IS_CHECKED );
	}
};

goog.ui.registry.setDecoratorByClassName( zz.ui.mdl.views.CheckboxView.CSS_CLASS, function( ){

	return new zz.ui.mdl.Checkbox( );
} );