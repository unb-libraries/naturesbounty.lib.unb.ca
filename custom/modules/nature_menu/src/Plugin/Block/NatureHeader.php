<?php

namespace Drupal\nature_menu\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a custom header block for the site.
 *
 * @Block(
 *   id = "nature_header",
 *   admin_label = @Translation("Nature Header"),
 *   category = @Translation("Misc"),
 * )
 */
class NatureHeader extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $text = '
      <div id="banner">
      </div>
    ';
    return [
      '#markup' => $this->t($text),
    ];
  }

}
