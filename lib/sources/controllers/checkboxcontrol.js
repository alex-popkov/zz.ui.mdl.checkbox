/**
 * @fileoverview Provide zz.ui.mdl.controllers.CheckboxControl class.
 * @license Apache-2.0
 * @author popkov.aleksander@gmail.com (Alexander Popkov)
 * @author buntarb@gmail.com (Artem Lytvynov)
 */

goog.provide( 'zz.ui.mdl.controllers.CheckboxControl' );

goog.require( 'goog.style' );
goog.require( 'goog.dom.classlist' );
goog.require( 'goog.events.EventType' );
goog.require( 'goog.ui.Component' );
goog.require( 'zz.ui.mdl.controllers.BaseControl' );
goog.require( 'zz.ui.mdl.views.CheckboxView' );
goog.require( 'zz.ui.mdl.controllers.RippleControl' );

/**
 * @param {goog.ui.ControlContent=} opt_content Text caption or DOM structure to display as the content of the control.
 * @param {goog.ui.ControlRenderer=} opt_renderer Renderer used to render or decorate the button.
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper, used for document interaction.
 * @extends {zz.ui.mdl.controllers.BaseControl}
 * @constructor
 */
zz.ui.mdl.controllers.CheckboxControl = function( opt_content, opt_renderer, opt_domHelper ){

	zz.ui.mdl.controllers.BaseControl.call(

		this,
		opt_content,
		opt_renderer || zz.ui.mdl.views.CheckboxView.getInstance( ),
		opt_domHelper );

	this.setAutoStates( goog.ui.Component.State.ALL, false );

	this.setAutoStates( goog.ui.Component.State.ACTIVE, true );
	this.setAutoStates( goog.ui.Component.State.FOCUSED, true );
	this.setAutoStates( goog.ui.Component.State.CHECKED, true );
	this.setAutoStates( goog.ui.Component.State.DISABLED, true );

	this.setSupportedState( goog.ui.Component.State.ACTIVE, true );
	this.setSupportedState( goog.ui.Component.State.FOCUSED, true );
	this.setSupportedState( goog.ui.Component.State.CHECKED, true );
	this.setSupportedState( goog.ui.Component.State.DISABLED, true );

	this.setDispatchTransitionEvents( goog.ui.Component.State.ACTIVE, true );
	this.setDispatchTransitionEvents( goog.ui.Component.State.FOCUSED, true );
	this.setDispatchTransitionEvents( goog.ui.Component.State.CHECKED, true );
	this.setDispatchTransitionEvents( goog.ui.Component.State.DISABLED, true );
};
goog.inherits( zz.ui.mdl.controllers.CheckboxControl, zz.ui.mdl.controllers.BaseControl );
goog.tagUnsealableClass( zz.ui.mdl.controllers.CheckboxControl );

/**
 * Store strings for class names defined by this component that are used in JavaScript. This allows us to simply change
 * it in one place should we decide to modify at a later date.
 * @enum {string}
 */
zz.ui.mdl.controllers.CheckboxControl.CSS = {

	INPUT: goog.getCssName( 'mdl-checkbox__input' ),
	BOX_OUTLINE: goog.getCssName( 'mdl-checkbox__box-outline' ),
	FOCUS_HELPER: goog.getCssName( 'mdl-checkbox__focus-helper' ),
	TICK_OUTLINE: goog.getCssName( 'mdl-checkbox__tick-outline' ),
	RIPPLE_EFFECT: goog.getCssName( 'mdl-js-ripple-effect' ),
	RIPPLE_IGNORE_EVENTS: goog.getCssName( 'mdl-js-ripple-effect--ignore-events' ),
	RIPPLE_CONTAINER: goog.getCssName( 'mdl-checkbox__ripple-container' ),
	RIPPLE_CENTER: goog.getCssName( 'mdl-ripple--center' ),
	RIPPLE: goog.getCssName( 'mdl-ripple' ),
	IS_FOCUSED: goog.getCssName( 'is-focused' ),
	IS_DISABLED: goog.getCssName( 'is-disabled' ),
	IS_CHECKED: goog.getCssName( 'is-checked' ),
	IS_UPGRADED: goog.getCssName( 'is-upgraded' ),
	LABEL: goog.getCssName( 'mdl-checkbox__label' )
};

/**
 * Called when the component's element is known to be in the document. Anything using document.getElementById etc.
 * should be done at this stage. If the component contains child components, this call is propagated to its children.
 * @override
 */
zz.ui.mdl.controllers.CheckboxControl.prototype.enterDocument = function( ){

	goog.base( this, 'enterDocument' );

	this.getHandler( ).listenWithScope(

		this.getInputElement( ),
		goog.events.EventType.CHANGE,
		this.changeListener_,
		false,
		this );

	// Ripple effect.
	if( goog.dom.classlist.contains( this.getElement( ), zz.ui.mdl.controllers.CheckboxControl.CSS.RIPPLE_EFFECT ) ){

		var  ripple = new zz.ui.mdl.controllers.RippleControl( );
		this.addChild( ripple, false );
		ripple.decorate(

			goog.dom.getElementByClass(

				zz.ui.mdl.controllers.CheckboxControl.CSS.RIPPLE_CONTAINER,
				this.getElement( ) ) );

	}
};

/**
 * Deletes or nulls out any references to COM objects, DOM nodes, or other disposable objects. Classes that extend
 * {@code goog.Disposable} should override this method. Not reentrant. To avoid calling it twice, it must only be
 * called from the subclass' {@code disposeInternal} method. Everywhere else the public {@code dispose} method must
 * be used.
 * @override
 **/
zz.ui.mdl.controllers.CheckboxControl.prototype.disposeInternal = function( ){

	goog.base( this, 'disposeInternal' );

	this.getHandler( ).dispose( );
};

/**
 * Listener for checkbox element change event.
 * @private
 */
zz.ui.mdl.controllers.CheckboxControl.prototype.changeListener_ = function( ){

	this.dispatchEvent( goog.ui.Component.EventType.CHANGE );
};

/**
 * Attempts to handle a keyboard event; returns true if the event was handled, false otherwise.  Considered protected;
 * should only be used within this package and by subclasses.
 * @param {goog.events.KeyEvent} e Key event to handle.
 * @return {boolean} Whether the key event was handled.
 * @protected
 * @override
 */
zz.ui.mdl.controllers.CheckboxControl.prototype.handleKeyEventInternal = function( e ){

	if( e.keyCode === goog.events.KeyCodes.ENTER ){

		this.setInputValue( !this.getInputValue( ) );
		this.changeListener_( );
		return true;
	}
	return false;
};

/**
 * Returns the DOM element on which the control is listening for keyboard events (null if none).
 * @override
 * @returns {Element}
 */
zz.ui.mdl.controllers.CheckboxControl.prototype.getKeyEventTarget = function( ){

	return this.getInputElement( );
};

/**
 * Enable/disable checkbox.
 * @param {boolean} enable
 */
zz.ui.mdl.controllers.CheckboxControl.prototype.setEnabled = function( enable ){

	zz.ui.mdl.controllers.CheckboxControl.superClass_.setEnabled.call( this, enable );
	this.getInputElement( ).disabled = !enable;
	this.getRenderer( ).updateClasses( this );
};