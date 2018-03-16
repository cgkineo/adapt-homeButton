define([
    'core/js/adapt'
], function(Adapt) {

    var HomeButton = Backbone.Controller.extend({

        _$html: null,

        initialize: function() {
            this.listenTo(Adapt, "app:dataReady", this._onDataReady);
        },

        _onDataReady: function() {
            var config = Adapt.config.get("_homeButton");
            if (!config || !config._isEnabled) return;
            this._$html = $("html");
            this.listenTo(Adapt, {
                'remove': this._onRemove,
                'router:menu router:page': this._onRouterEvent,
                'navigation:redirectedHomeButton': this._redirected
            });
        },

        _onRouterEvent: function(model) {
            this._config = model.get("_homeButton");
            var isEnabled = (this._config && this._config._isEnabled);
            if (!isEnabled) return this._disabled();
            this._enabled();
        },

        _onRemove: function() {
            this._disabled();
        },

        _disabled: function() {
            this._$html.removeClass("hide-home-button");
            if (this._dataEvent) {
                $(".navigation-home-button").attr("data-event", this._dataEvent);
                this._dataEvent = null;
            }
        },

        _enabled: function() {
            this._$html.toggleClass("hide-home-button", !!this._config._hideHomeButton);
            if (this._config._redirectToId) {
                this._dataEvent = $(".navigation-home-button").attr("data-event");
                $(".navigation-home-button").attr("data-event", "redirectedHomeButton");
            }
        },

        _redirected: function() {
            if (!this._config._redirectToId) return;
            var model = Adapt.findById(this._config._redirectToId);
            if (!model) return;
            switch (model.get("_type")) {
                case "course":
                    Backbone.history.navigate("#/", { trigger: true, relpace: false });
                    break;
                case "menu":
                case "page":
                    Backbone.history.navigate("#/id/"+model.get("_id"), { trigger: true, relpace: false });
                    break;
            }
        }

    });

    return new HomeButton();

});
