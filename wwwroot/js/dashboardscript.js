var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavigationLinks = function (_React$Component) {
    _inherits(NavigationLinks, _React$Component);

    function NavigationLinks() {
        _classCallCheck(this, NavigationLinks);

        return _possibleConstructorReturn(this, (NavigationLinks.__proto__ || Object.getPrototypeOf(NavigationLinks)).apply(this, arguments));
    }

    _createClass(NavigationLinks, [{
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
                        null,
                        "Home"
                    ),
                    React.createElement(
                        "li",
                        null,
                        "Add Goal"
                    ),
                    React.createElement(
                        "li",
                        null,
                        "Delete Goal"
                    ),
                    React.createElement(
                        "li",
                        null,
                        "Sign Out"
                    )
                )
            );
        }
    }]);

    return NavigationLinks;
}(React.Component);

var GoalContainer = function (_React$Component2) {
    _inherits(GoalContainer, _React$Component2);

    function GoalContainer(props) {
        _classCallCheck(this, GoalContainer);

        var _this2 = _possibleConstructorReturn(this, (GoalContainer.__proto__ || Object.getPrototypeOf(GoalContainer)).call(this, props));

        _this2.state = {
            list: {}
        };
        return _this2;
    }

    _createClass(GoalContainer, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;

            fetch("https://localhost:5001/api/RoadMapItem/GetRoadMapItems").then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                _this3.setState({ list: data });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", null);
        }
    }]);

    return GoalContainer;
}(React.Component);

var DashboardRoot = function (_React$Component3) {
    _inherits(DashboardRoot, _React$Component3);

    function DashboardRoot(props) {
        _classCallCheck(this, DashboardRoot);

        var _this4 = _possibleConstructorReturn(this, (DashboardRoot.__proto__ || Object.getPrototypeOf(DashboardRoot)).call(this, props));

        _this4.state = {
            data: {
                username: ""
            }
        };
        return _this4;
    }

    _createClass(DashboardRoot, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this5 = this;

            fetch("https://localhost:5001/api/User/FindUser").then(function (response) {
                return response.json();
            }).then(function (info) {
                console.log(info);
                _this5.setState({ data: info });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(NavigationLinks, null),
                this.state.data.username,
                React.createElement(GoalContainer, null)
            );
        }
    }]);

    return DashboardRoot;
}(React.Component);

ReactDOM.render(React.createElement(DashboardRoot, null), document.getElementById("root"));