import Adapt from 'core/js/adapt';
import NavigationButtonView from 'core/js/views/NavigationButtonView';
import tooltips from 'core/js/tooltips';

class HomeNavigationButtonView extends NavigationButtonView {

  attributes() {
    return {
      ...super.attributes(),
      'data-tooltip-id': this.model.get('_id')
    };
  }

  initialize(options) {
    super.initialize(options);
    this.setupEventListeners();
    this.render();
    tooltips.register({
      _id: this.model.get('_id'),
      ...this.model.get('_navTooltip') || {}
    });
  }

  setupEventListeners() {
    this.listenTo(Adapt, {
      remove: this.remove
    });
  }

  static get template() {
    return 'HomeNavigationButton.jsx';
  }

}

export default HomeNavigationButtonView;
