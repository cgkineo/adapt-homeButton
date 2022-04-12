import Backbone from 'backbone';
import Adapt from 'core/js/adapt';
import data from 'core/js/data';
import location from 'core/js/location';
import router from 'core/js/router';

class HomeButton extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, 'app:dataReady', this.onDataReady);
  }

  onDataReady() {
    const config = Adapt.config.get('_homeButton');
    if (config?._isEnabled === false) return;
    this.$html = $('html');
    this.listenTo(Adapt, {
      remove: this.disable,
      'router:menu router:page': this.onRouterEvent,
      'navigation:redirectedHomeButton': this.redirected
    });
  }

  get config() {
    return location._currentModel?.get('_homeButton');
  }

  onRouterEvent() {
    const isEnabled = (this.config?._isEnabled);
    if (!isEnabled) return this.disable();
    this.enable();
  }

  disable() {
    this.$html.removeClass('hide-nav-home-btn');
    $('.js-nav-home-btn').remove();
  }

  enable() {
    const config = this.config;
    this.$html.toggleClass('hide-nav-home-btn', Boolean(config?._hideHomeButton));
    // extend functionality to toggle back button display
    this.$html.toggleClass('hide-nav-back-btn', Boolean(config?._hideBackButton));
    const altText = (config?.alt || '');
    const $backButton = $('button[data-event="backButton"]');
    const $icon = $('<div>', { class: 'icon' });
    const $homeButton = $('<button>', {
      attr: {
        'data-event': config?._redirectToId ? 'redirectedHomeButton' : 'homeButton'
      },
      class: 'btn-icon nav__btn nav__homebutton-btn js-nav-home-btn',
      'aria-label': altText,
      role: 'link'
    }).append($icon);
    // insert immediately after back button (so that tab order is correct)
    $homeButton.insertAfter($backButton);
  }

  redirected() {
    const redirectToId = this.config?._redirectToId;
    if (!redirectToId) return;
    const model = data.findById(redirectToId);
    if (!model) return;
    switch (model.get('_type')) {
      case 'course':
        router.navigateToHomeRoute();
        break;
      case 'menu':
      case 'page':
        router.navigateToElement(model.get('_id'));
        break;
    }
  }

}

export default new HomeButton();
