<?php

namespace Drupal\nature_menu\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a custom footer block for the site.
 *
 * @Block(
 *   id = "nature_footer",
 *   admin_label = @Translation("Nature Footer"),
 *   category = @Translation("Misc"),
 * )
 */
class NatureFooter extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    $text = '
      <div id="footer" class="container">
        <div class="row">
          <div id="copyright" class="col-sm-6">
            <p>© UNB Libraries</p>
          </div>
          <div id="liblogo" class="col-sm-6">
            <a href="https://lib.unb.ca">
              <img src="/themes/custom/naturesbounty_lib_unb_ca/images/UNB_Lib_Black_Red.png">
            </a>
          </div>
        </div>
      </div>
    ';
    return [
      '#markup' => $this->t($text),
    ];
  }

}
