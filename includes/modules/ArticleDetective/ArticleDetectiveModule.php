<?php
/**
 * Bio Detective Module - Article Detective Component
 * WordPress/Divi Integration File
 * 
 * This file registers the Article Detective React component with Divi
 * and handles the backend integration for the Bio Detective plugin.
 *
 * @package Bio_Detective
 * @subpackage Modules
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Class Bio_Detective_Article_Detective_Module
 * Registers the Article Detective Divi module
 */
class Bio_Detective_Article_Detective_Module extends ET_Builder_Module {

	public $slug       = 'bio_detective_article';
	public $vb_support = 'on';

	/**
	 * Initialize the module
	 */
	public function init() {
		$this->name = esc_html__( 'Bio Detective Article Scan', 'bio-detective' );
	}

	/**
	 * Get Fields
	 * Defines the settings panel for the module in Divi
	 */
	public function get_fields() {
		return array(
			'title'            => array(
				'label'       => esc_html__( 'Module Title', 'bio-detective' ),
				'type'        => 'text',
				'default'     => 'Article Detective',
				'toggle_slug' => 'general',
			),
			'description'      => array(
				'label'       => esc_html__( 'Description', 'bio-detective' ),
				'type'        => 'textarea',
				'default'     => 'Analyze scientific articles for bioinformatics content',
				'toggle_slug' => 'general',
			),
			'show_gene_links'  => array(
				'label'           => esc_html__( 'Show Gene Links', 'bio-detective' ),
				'type'            => 'yes_no_button',
				'options'         => array(
					'on'  => esc_html__( 'Yes', 'bio-detective' ),
					'off' => esc_html__( 'No', 'bio-detective' ),
				),
				'default'         => 'on',
				'toggle_slug'     => 'general',
			),
			'button_color'     => array(
				'label'           => esc_html__( 'Button Color', 'bio-detective' ),
				'type'            => 'color',
				'default'         => '#e91e63',
				'toggle_slug'     => 'design',
			),
			'text_alignment'   => array(
				'label'           => esc_html__( 'Text Alignment', 'bio-detective' ),
				'type'            => 'text_align',
				'options'         => et_builder_get_text_orientation_options(),
				'default'         => 'left',
				'toggle_slug'     => 'alignment',
			),
		);
	}

	/**
	 * Get Advanced Fields Configuration
	 */
	public function get_advanced_fields_config() {
		return array(
			'fonts' => array(
				'header' => array(
					'label' => esc_html__( 'Title Font', 'bio-detective' ),
				),
			),
		);
	}

	/**
	 * Render the module
	 */
	public function render( $attrs, $content, $render_slug ) {
		return sprintf(
			'<div class="bio-detective-article-container" data-module-id="%s">%s</div>',
			$render_slug,
			// React component will be mounted here
			$this->render_react_component()
		);
	}

	/**
	 * Render React Component Hook
	 * The actual React component (ArticleDetectiveModule.jsx) will be loaded via JavaScript
	 */
	private function render_react_component() {
		return '<div id="article-detective-react-root" class="bio-detective-article-root"></div>';
	}

	/**
	 * Get Transition Fields
	 */
	public function get_transition_fields_css_props() {
		$fields = parent::get_transition_fields_css_props();
		return $fields;
	}
}

// Register the module with Divi
new Bio_Detective_Article_Detective_Module();
?>
