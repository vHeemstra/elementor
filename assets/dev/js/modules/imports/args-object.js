export default class ArgsObject {
	/**
	 * Function constructor().
	 *
	 * Create ArgsObject.
	 *
	 * @param {{}} args
	 */
	constructor( args ) {
		this.args = args;
	}

	/**
	 * Function requireArgument().
	 *
	 * Validate property in args.
	 *
	 * @param {string} property
	 * @param {{}} args
	 *
	 * @throws {Error}
	 *
	 */
	requireArgument( property, args = this.args ) {
		if ( ! args.hasOwnProperty( property ) ) {
			throw Error( `${ property } is required.` );
		}
	}

	/**
	 * Function requireArgumentType().
	 *
	 * Validate property in args using `type === typeof(args.whatever)`.
	 *
	 * @param {string} property
	 * @param {string} type
	 * @param {{}} args
	 *
	 * @throws {Error}
	 *
	 */
	requireArgumentType( property, type, args = this.args ) {
		this.requireArgument( property, args );

		if ( ( typeof args[ property ] !== type ) ) {
			throw Error( `${ property } invalid type: ${ type }.` );
		}
	}

	/**
	 * Function requireArgumentInstance().
	 *
	 * Validate property in args using `args.whatever instanceof instance`.
	 *
	 * @param {string} property
	 * @param {instanceof} instance
	 * @param {{}} args
	 *
	 * @throws {Error}
	 *
	 */
	requireArgumentInstance( property, instance, args = this.args ) {
		this.requireArgument( property, args );

		if ( ! ( args[ property ] instanceof instance ) ) {
			throw Error( `${ property } invalid instance.` );
		}
	}

	/**
	 * Function requireArgumentConstructor().
	 *
	 * Validate property in args using `type === args.whatever.constructor`.
	 *
	 * @param {string} property
	 * @param {*} type
	 * @param {{}} args
	 *
	 * @throws {Error}
	 *
	 */
	requireArgumentConstructor( property, type, args = this.args ) {
		this.requireArgument( property, args );

		if ( args[ property ].constructor !== type ) {
			throw Error( `${ property } invalid constructor type.` );
		}
	}

	/**
	 * Function requireContainer().
	 *
	 * Validate `arg.container` & `arg.containers`.
	 *
	 * @param {{}} args
	 *
	 * @throws {Error}
	 */
	requireContainer( args = this.args ) {
		if ( ! args.container && ! args.containers ) {
			throw Error( 'container or containers are required.' );
		}

		if ( args.container && args.containers ) {
			throw Error( 'container and containers cannot go together please select one of them.' );
		}

		const containers = args.containers || [ args.container ];

		containers.forEach( ( container ) => {
			this.requireArgumentInstance( 'container', elementorModules.editor.Container, { container } );
		} );
	}
}
