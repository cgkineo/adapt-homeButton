import Adapt from 'core/js/adapt';
import NavigationButtonView from 'core/js/views/NavigationButtonView';
import tooltips from 'core/js/tooltips';

class HomeNavigationButtonView extends NavigationButtonView {

  initialize(options) {
    super.initialize(options);
    this.render();

    tooltips.register({
      _id: 'HomeButton',
      ...HomeNavigationButtonView.globalsConfig._navTooltip || {}
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
      // 'aria-label': Adapt.course.get('_homeButton').navigationAriaLabel,
      'aria-label': 'TBD',
      'data-tooltip-id': 'HomeButton'
    };
  }

  events() {
    return {
      click: 'onClick'
    };
  }

  onClick(event) {
    if (event && event.preventDefault) event.preventDefault();
    // redirected()
  }

}

export default HomeNavigationButtonView;
