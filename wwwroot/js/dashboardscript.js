var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { GoalContainer } from "/dashboardscriptcollection/homescript.js";
import { AddGoalContainer } from "/dashboardscriptcollection/addgoalscript.js";

var NavigationLinks = function (_React$Component) {
    _inherits(NavigationLinks, _React$Component);

    function NavigationLinks(props) {
        _classCallCheck(this, NavigationLinks);

        var _this = _possibleConstructorReturn(this, (NavigationLinks.__proto__ || Object.getPrototypeOf(NavigationLinks)).call(this, props));

        _this.state = {
            navigation: 0
        };
        _this.changeNavigation = _this.changeNavigation.bind(_this);
        _this.signOut = _this.signOut.bind(_this);
        return _this;
    }

    _createClass(NavigationLinks, [{
        key: "changeNavigation",
        value: function changeNavigation(e) {
            var _this2 = this;

            this.setState({ navigation: e.target.value }, function () {
                _this2.props.navigation(_this2.state.navigation);
            });
        }
    }, {
        key: "signOut",
        value: function signOut() {
            fetch("https://localhost:5001/api/User/SignOut", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function () {
                return window.location.assign("https://localhost:5001/");
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "ul",
                    null,
                    React.createElement(
                        "li",
                        { onClick: this.changeNavigation, value: 0 },
                        "Home"
                    ),
                    React.createElement(
                        "li",
                        { onClick: this.changeNavigation, value: 1 },
                        "Add Goal"
                    ),
                    React.createElement(
                        "li",
                        { onClick: this.changeNavigation, value: 2 },
                        "Delete Goal"
                    ),
                    React.createElement(
                        "li",
                        { onClick: this.signOut, value: 3 },
                        "Sign Out"
                    )
                )
            );
        }
    }]);

    return NavigationLinks;
}(React.Component);

var DashboardRoot = function (_React$Component2) {
    _inherits(DashboardRoot, _React$Component2);

    function DashboardRoot(props) {
        _classCallCheck(this, DashboardRoot);

        var _this3 = _possibleConstructorReturn(this, (DashboardRoot.__proto__ || Object.getPrototypeOf(DashboardRoot)).call(this, props));

        _this3.state = {
            data: {
                username: ""
            },
            navigation: 0
        };
        _this3.changeNavigation = _this3.changeNavigation.bind(_this3);
        return _this3;
    }

    _createClass(DashboardRoot, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this4 = this;

            console.log("Dashboard DidMount");

            fetch("https://localhost:5001/api/User/FindUser").then(function (response) {
                return response.json();
            }).then(function (info) {
                console.log(info);
                _this4.setState({ data: info });
            });
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            console.log("Dashboard DidUpdate");
        }
    }, {
        key: "changeNavigation",
        value: function changeNavigation(e) {
            this.setState({ navigation: e });
        }
    }, {
        key: "render",
        value: function render() {
            var navigation = this.state.navigation;

            switch (navigation) {
                case 0:
                    return React.createElement(
                        "div",
                        null,
                        "You are in Home",
                        React.createElement(NavigationLinks, { navigation: this.changeNavigation }),
                        this.state.data.username,
                        React.createElement(GoalContainer, { isdeletegoal: false })
                    );
                    break;
                case 1:
                    return React.createElement(
                        "div",
                        null,
                        "You are in AddGoal",
                        React.createElement(NavigationLinks, { navigation: this.changeNavigation }),
                        this.state.data.username,
                        React.createElement(AddGoalContainer, null)
                    );
                    break;
                case 2:
                    return React.createElement(
                        "div",
                        null,
                        "You are in DeleteGoal",
                        React.createElement(NavigationLinks, { navigation: this.changeNavigation }),
                        this.state.data.username,
                        React.createElement(GoalContainer, { isdeletegoal: true })
                    );
                    break;
                default:
                    return React.createElement(
                        "div",
                        null,
                        "Wrong Navigation!",
                        React.createElement(NavigationLinks, { navigation: this.changeNavigation }),
                        this.state.data.username,
                        React.createElement(AddGoalContainer, null)
                    );
                    break;
            }
        }
    }]);

    return DashboardRoot;
}(React.Component);

ReactDOM.render(React.createElement(DashboardRoot, null), document.getElementById("root"));