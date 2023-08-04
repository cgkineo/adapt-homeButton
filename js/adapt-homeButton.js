import Backbone from 'backbone';
import Adapt from 'core/js/adapt';
import data from 'core/js/data';
import location from 'core/js/location';
import router from 'core/js/router';
import navigation from 'core/js/navigation';
import NavigationButtonModel from 'core/js/models/NavigationButtonModel';
import HomeNavigationButtonView from './HomeNavigationButtonView';

class HomeButton extends Backbone.Controller {

  initialize() {
    this.listenTo(Adapt, 'app:dataReady', this.onDataReady);
  }

  onDataReady() {
    // Do not render if turned off at config level
    const config = Adapt.config.get('_homeButton');
    if (config?._isEnabled === false) return;

    this.$html = $('html');
    this.stopListening();
    this.listenTo(Adapt, {
      remove: this.disable,
      'router:menu router:page': this.onRouterEvent,
      'navigation:redirectedHomeButton': this.redirected
    });
  }

  static get globalsConfig() {
    return Adapt.course.get('_globals')?._extensions?._homeButton;
  }

  get currentModelConfig() {
    return location._currentModel?.get('_homeButton');
  }

  static get courseConfig() {
    return Adapt.course?.get('_homeButton');
  }

  onRouterEvent() {
    const isEnabled = (this.currentModelConfig?._isEnabled);
    if (!isEnabled) return this.disable();
    this.enable();
  }

  disable() {
    this.$html.removeClass('hide-nav-home-btn');
    $('.js-nav-home-btn').remove();
  }

  enable() {
    const currentModelConfig = this.currentModelConfig;

    // Update <html> classes
    this.$html.toggleClass('hide-nav-home-btn', Boolean(currentModelConfig?._hideHomeButton));
    // extend functionality to toggle back button display
    this.$html.toggleClass('hide-nav-back-btn', Boolean(currentModelConfig?._hideBackButton));

    this.renderNavigationView();
  }

  renderNavigationView() {
    const currentModelConfig = this.currentModelConfig;
    const {
      _navOrder = -1,
      _showLabel = true,
      navLabel = '',
      _navTooltip = {}
    } = Object.assign(HomeButton.globalsConfig ?? {}, currentModelConfig);
    const model = new NavigationButtonModel({
      _id: 'homebutton',
      _order: _navOrder,
      _showLabel,
      _classes: 'btn-icon nav__btn nav__homebutton-btn',
      _role: 'link',
      ariaLabel: navLabel,
      text: navLabel,
      _navTooltip,
      _event: currentModelConfig?._redirectToId ? 'redirectedHomeButton' : 'homeButton'
    });
    navigation.addButton(new HomeNavigationButtonView({ model }));
  }

  redirected() {
    const redirectToId = this.currentModelConfig?._redirectToId;
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
