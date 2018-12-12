<?php

namespace Drupal\nature_menu\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * Controller for Nature's Bounty routing.
 */
class NatureMenuController extends ControllerBase {

  /**
   * {@inheritdoc}
   */
  public function home() {
    return new RedirectResponse('/content/natures-bounty-main');
  }

}
