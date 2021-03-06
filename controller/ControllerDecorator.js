import ns from 'ima/namespace';
import ControllerInterface from 'ima/controller/Controller';

ns.namespace('ima.controller');

/**
 * Decorator for page controllers. The decorator manages references to the meta
 * attributes manager and other utilities so these can be easily provided to
 * the decorated page controller when needed.
 *
 * @class ControllerDecorator
 * @implements ima.controller.Controller
 * @namespace ima.controller
 * @module ima
 * @submodule ima.controller
 */
export default class ControllerDecorator extends ControllerInterface {

	/**
	 * Initializes the controller decorator.
	 *
	 * @method constructor
	 * @constructor
	 * @param {ima.controller.Controller} controller The controller being
	 *        decorated.
	 * @param {ima.meta.MetaManager} metaManager The meta page attributes
	 *        manager.
	 * @param {ima.router.Router} router The application router.
	 * @param {ima.dictionary.Dictionary} dictionary Localization phrases
	 *        dictionary.
	 * @param {Object<string, *>} settings  Application settings for the
	 *        current application environment.
	 */
	constructor(controller, metaManager, router, dictionary, settings) {
		super();

		/**
		 * The controller being decorated.
		 *
		 * @property _controller
		 * @private
		 * @type {ima.controller.Controller}
		 */
		this._controller = controller;

		/**
		 * The meta page attributes manager.
		 *
		 * @property _metaManager
		 * @private
		 * @type {ima.meta.MetaManager}
		 */
		this._metaManager = metaManager;

		/**
		 * The application router.
		 *
		 * @property _router
		 * @private
		 * @type {ima.router.Router}
		 */
		this._router = router;

		/**
		 * Localization phrases dictionary.
		 *
		 * @property _dictionary
		 * @private
		 * @type {ima.dictionary.Dictionary}
		 */
		this._dictionary = dictionary;

		/**
		 * Application settings for the current application environment.
		 *
		 * @property _setting
		 * @private
		 * @type {Object<string, *>}
		 */
		this._settings = settings;
	}

	/**
	 * @inheritdoc
	 * @method init
	 */
	init() {
		this._controller.init();
	}

	/**
	 * @inheritdoc
	 * @method destroy
	 */
	destroy() {
		this._controller.destroy();
	}

	/**
	 * @inheritdoc
	 * @method activate
	 */
	activate() {
		this._controller.activate();
	}

	/**
	 * @inheritdoc
	 * @method deactivate
	 */
	deactivate() {
		this._controller.deactivate();
	}

	/**
	 * @inheritdoc
	 * @method load
	 */
	load() {
		return this._controller.load();
	}

	/**
	 * @inheritdoc
	 * @method update
	 */
	update(params = {}) {
		return this._controller.update(params);
	}

	/**
	 * @inheritdoc
	 * @method setReactiveView
	 */
	setReactiveView(reactiveView) {
		this._controller.setReactiveView(reactiveView);
	}

	/**
	 * @inheritdoc
	 * @method setState
	 */
	setState(statePatch) {
		this._controller.setState(statePatch);
	}

	/**
	 * @inheritdoc
	 * @method getState
	 */
	getState() {
		return this._controller.getState();
	}

	/**
	 * @inheritdoc
	 * @method addExtension
	 */
	addExtension(extension) {
		this._controller.addExtension(extension);

		return this;
	}

	/**
	 * @inheritdoc
	 * @method getExtensions
	 */
	getExtensions() {
		return this._controller.getExtensions();
	}

	/**
	 * @inheritdoc
	 * @method setMetaParams
	 */
	setMetaParams(loadedResources, metaManager, router, dictionary, settings) {
		this._controller.setMetaParams(
			loadedResources,
			this._metaManager,
			this._router,
			this._dictionary,
			this._settings
		);
	}

	/**
	 * @inheritdoc
	 * @method setRouteParams
	 */
	setRouteParams(params = {}) {
		this._controller.setRouteParams(params);
	}

	/**
	 * @inheritdoc
	 * @method getRouteParams
	 */
	getRouteParams() {
		return this._controller.getRouteParams();
	}

	/**
	 * @inheritdoc
	 * @method setPageStateManager
	 */
	setPageStateManager(pageStateManager) {
		this._controller.setPageStateManager(pageStateManager);
	}

	/**
	 * @inheritdoc
	 * @method getHttpStatus
	 */
	getHttpStatus() {
		return this._controller.getHttpStatus();
	}

	/**
	 * Returns the meta attributes manager configured by the decorated
	 * controller.
	 *
	 * @method getMetaManager
	 * @return {ima.meta.MetaManager} The Meta attributes manager configured by
	 *         the decorated controller.
	 */
	getMetaManager() {
		return this._metaManager;
	}
}

ns.ima.controller.ControllerDecorator = ControllerDecorator;
