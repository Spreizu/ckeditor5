/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module restricted-editing/restrictededitingexceptionui
 */

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import unlockIcon from '../theme/icons/contentunlock.svg';

/**
 * @extends module:core/plugin~Plugin
 */
export default class RestrictedEditingExceptionUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( 'restrictedEditingException', locale => {
			const command = editor.commands.get( 'restrictedEditingException' );
			const view = new ButtonView( locale );

			view.set( {
				icon: unlockIcon,
				tooltip: true,
				isToggleable: true
			} );

			view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );
			view.bind( 'label' ).to( command, 'value', value => {
				return value ? t( 'Disable editing' ) : t( 'Enable editing' );
			} );

			this.listenTo( view, 'execute', () => editor.execute( 'restrictedEditingException' ) );

			return view;
		} );
	}
}
