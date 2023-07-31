import Adapt from 'core/js/adapt';
import NavigationButtonView from 'core/js/views/NavigationButtonView';
import tooltips from 'core/js/tooltips';

class HomeNavigationButtonView extends NavigationButtonView {

  initialize(options) {
    super.initialize(options);
    this.setUpEventListeners();
    this.render();

    tooltips.register({
      _id: 'HomeButton',
      ...this.model.get('_navTooltip') || {}
    });
  }

  static get globalsConfig() {
    return Adapt.course.get('_globals')?._extensions?._homeButton;
  }

  static get template() {
    return 'HomeNavigationButton.jsx';
  }

  attributes() {
    const attributes = this.model.toJSON();

    return {
      name: attributes._id,
      role: attributes._role === 'button' ? undefined : attributes._role,
      'data-order': attributes._order,
      'aria-label': attributes.navigationAriaLabel,
      'data-event': attributes._dataEvent,
      'data-tooltip-id': 'HomeButton'
    };
  }

  setUpEventListeners() {
    this.listenTo(Adapt, {
      remove: this.remove
    });
  }

  remove() {
    super.remove();
  }

}

export default HomeNavigationButtonView;
