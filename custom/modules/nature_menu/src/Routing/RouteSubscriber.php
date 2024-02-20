<?php

namespace Drupal\nature_menu\Routing;

use Drupal\Core\Routing\RouteSubscriberBase;
use Symfony\Component\Routing\RouteCollection;

/**
 * Listens to the dynamic route events and restrict access to routes.
 */
class RouteSubscriber extends RouteSubscriberBase {

  /**
   * {@inheritdoc}
   */
  public function alterRoutes(RouteCollection $collection) {
    // Restrict user admin routes.
    $deny_routes = [
      'entity.user.edit_form',
      'user.edit',
      'user.login',
      'user.page',
      'user.pass',
      'user.pass.http',
      'user.register',
      'user.reset.form',
      'user.reset',
    ];
    
    // Deny access to non-admins.
    foreach ($deny_routes as $deny_route) {
      if ($route = $collection->get($deny_route)) {
        $route->setRequirement('_permission', 'administer_users');
      }
    }
  }

}
