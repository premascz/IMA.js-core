import ns from 'ima/namespace';

ns.namespace('ima.controller');

/**
 * Interface defining the common API of page controllers. A page controller is
 * used to manage the overall state and view of a single application page, and
 * updates the page state according to the events submitted to it by components
 * on the page (or other input).
 *
 * @interface Controller
 * @namespace ima.controller
 * @module ima
 * @submodule ima.controller
 */
export default class Controller {

	/**
	 * Callback for initializing the controller after the route parameters have
	 * been set on this controller.
	 *
	 * @method init
	 */
	init() {}

	/**
	 * Finalization callback, called when the controller is being discarded by
	 * the application. This usually happens when the user navigates to a
	 * different URL.
	 *
	 * This method is the lifecycle counterpart of the {@linkcode init()}
	 * method.
	 *
	 * The controller should release all resources obtained in the
	 * {@codelink init()} method. The controller must release any resources
	 * that might not be released automatically when the controller's instance
	 * is destroyed by the garbage collector.
	 *
	 * @method destroy
	 */
	destroy() {}

	/**
	 * Callback for activating the controller in the UI. This is the last
	 * method invoked during controller initialization, called after all the
	 * promises returned from the {@codelink load()} method have been resolved
	 * and the controller has configured the meta manager.
	 *
	 * The controller may register any React and DOM event listeners in this
	 * method. The controller may start receiving event bus event after this
	 * method completes.
	 *
	 * @method activate
	 */
	activate() {}

	/**
	 * Callback for deactivating the controller in the UI. This is the first
	 * method invoked during controller deinitialization. This usually happens
	 * when the user navigates to a different URL.
	 *
	 * This method is the lifecycle counterpart of the {@linkcode activate()}
	 * method.
	 *
	 * The controller should deregister listeners registered and release all
	 * resources obtained in the {@codelink activate()} method.
	 *
	 * @method deactivate
	 */
	deactivate() {}

	/**
	 * Callback the controller uses to request the resources it needs to render
	 * its view. This method is invoked after the {@codelink init()} method.
	 *
	 * The controller should request all resources it needs in this method, and
	 * represent each resource request as a promise that will resolve once the
	 * resource is ready for use (these can be data fetched over HTTP(S),
	 * database connections, etc).
	 *
	 * The method must return a plain flat object. The field names of the
	 * object identify the resources being fetched and prepared, each value
	 * must be either the resource (e.g. view configuration or a value
	 * retrieved synchronously) or a Promise that will resolve to the resource.
	 *
	 * The IMA will use the object to set the state of the controller.
	 *
	 * If at the server side, the IMA will wait for all the promises to
	 * resolve, replaces the promises with the resolved values and sets the
	 * resulting object as the controller's state.
	 *
	 * If at the client side, the IMA will first set the controller's state to
	 * an object containing only the fields of the returned object that were
	 * not promises. IMA will then update the controller's state every time a
	 * promise of the returned object resolves. IMA will update the state by
	 * adding the resolved resource to the controller's state.
	 *
	 * Any returned promise that gets rejected will redirect the application to
	 * the error page. The error page that will be used depends on the status
	 * code of the error.
	 *
	 * @method load
	 * @return {Object<string, (Promise|*)>} A map object of promises
	 *         resolved when all resources the controller requires are ready.
	 *         The resolved values will be pushed to the controller's state.
	 */
	load() {}

	/**
	 * Callback for updating the controller after a route update. This method
	 * is invoked if the current route has the {@code onlyUpdate} flag set to
	 * {@code true} and the current controller and view match those used by the
	 * previously active route, or, the {@code onlyUpdate} option of the
	 * current route is a callback and returned {@code true}.
	 *
	 * The method must return an object with the same semantics as the result
	 * of the {@codelink load()} method. The controller's state will only be
	 * patched by the returned object instead of replacing it completely.
	 *
	 * The other controller lifecycle callbacks ({@codelink init()},
	 * {@codelink load()}, {@codelink activate()}, {@codelink deactivate()},
	 * {@codelink deinit()}) are not call in case this method is used.
	 *
	 * @method update
	 * @param {Object<string, string>=} [prevParams={}] Previous route
	 *        parameters.
	 * @return {Object<string, (Promise|*)>} A map object of promises
	 *         resolved when all resources the controller requires are ready.
	 *         The resolved values will be pushed to the controller's state.
	 */
	update(prevParams = {}) {}

	/**
	 * Patches the state of this controller using the provided object by
	 * copying the provided patch object fields to the controller's state
	 * object.
	 *
	 * You can use this method to modify the state partially or add new fields
	 * to the state object.
	 *
	 * Note that the state is not patched recursively but by replacing the
	 * values of the top-level fields of the state object.
	 *
	 * Once the promises returned by the {@codelink load()} method are
	 * resolved, this method is called with the an object containing the
	 * resolved values. The field names of the passed object will match the
	 * field names in the object returned from the {@codelink load()} method.
	 *
	 * @method setState
	 * @param {Object<string, *>} statePatch Patch of the controller's state to
	 *        apply.
	 */
	setState(statePatch) {}

	/**
	 * Returns the controller's current state.
	 *
	 * @method getState
	 * @return {Object<string, *>} The current state of this controller.
	 */
	getState() {}

	/**
	 * Adds the provided extension to this controller. All extensions should be
	 * added to the controller before the {@codelink init()} method is invoked.
	 *
	 * @method addExtension
	 * @param {ima.extension.Extension} extension The extension to add to this
	 *        controller.
	 * @return {ima.controller.Controller} This controller.
	 */
	addExtension(extension) {}

	/**
	 * Returns the controller's extensions.
	 *
	 * @method getExtensions
	 * @return {ima.extension.Extension[]} The extensions added to this
	 *         controller.
	 */
	getExtensions() {}

	/**
	 * Callback used to configure the meta attribute manager. The method is
	 * called after the the controller's state has been patched with the all
	 * loaded resources and the view has been rendered.
	 *
	 * @method setMetaParams
	 * @param {Object<string, *>} loadedResources A plain object representing a
	 *        map of resource names to resources loaded by the
	 *        {@codelink load()} method. This is the same object as the one
	 *        passed to the {@codelink setState()} method.
	 * @param {ima.meta.MetaManager} metaManager Meta attributes manager
	 *        to configure.
	 * @param {ima.router.Router} router The current application router.
	 * @param {ima.dictionary.Dictionary} dictionary The current localization
	 *        dictionary.
	 * @param {Object<string, *>} settings The application settings for the
	 *        current application environment.
	 */
	setMetaParams(loadedResources, metaManager, router, dictionary, settings) {}

	/**
	 * Sets the current route parameters. This method is invoked before the
	 * {@code init()} method.
	 *
	 * @method setRouteParams
	 * @param {Object<string, string>} [params={}] The current route
	 *        parameters.
	 */
	setRouteParams(params = {}) {}

	/**
	 * Returns the current route parameters.
	 *
	 * @method getRouteParams
	 * @return {Object<string, string>} The current route parameters.
	 */
	getRouteParams() {}

	/**
	 * Sets the page state manager. The page state manager manages the
	 * controller's state. The state manager can be set to {@code null} if this
	 * controller loses the right to modify the state of the current page (e.g.
	 * the user has navigated to a different route using a different
	 * controller).
	 *
	 * @method setPageStateManager
	 * @param {?ima.page.state.PageStateManager} pageStateManager The current
	 *        state manager to use.
	 */
	setPageStateManager(pageStateManager) {}

	/**
	 * Returns the HTTP status code to send to the client, should the
	 * controller be used at the server-side.
	 *
	 * @method getHttpStatus
	 * @return {number} The HTTP status code to send to the client.
	 */
	getHttpStatus() {}
}

ns.ima.controller.Controller = Controller;
