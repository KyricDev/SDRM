var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var GoalContainer = function (_React$Component) {
    _inherits(GoalContainer, _React$Component);

    function GoalContainer(props) {
        _classCallCheck(this, GoalContainer);

        var _this = _possibleConstructorReturn(this, (GoalContainer.__proto__ || Object.getPrototypeOf(GoalContainer)).call(this, props));

        _this.state = {
            list: [{
                content: "",
                id: "",
                isComplete: "",
                title: "",
                user: "",
                userID: ""
            }],
            isdeletegoal: false
        };
        return _this;
    }

    _createClass(GoalContainer, [{
        key: "deleteGoal",
        value: function deleteGoal(id, e) {
            var _this2 = this;

            fetch("https://localhost:5001/api/RoadMapItem/DeleteRoadMapItem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                return console.log(data);
            }).then(function () {
                fetch("https://localhost:5001/api/RoadMapItem/GetRoadMapItems").then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log("Data:");
                    console.log(data);
                    _this2.setState({ list: data }, function () {
                        return console.log(_this2.state.list);
                    });
                });
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;

            console.log("DidMount");

            fetch("https://localhost:5001/api/RoadMapItem/GetRoadMapItems").then(function (response) {
                return response.json();
            }).then(function (data) {
                return _this3.setState({ list: data });
            });

            console.log(this.state.list);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            console.log("WillUnmount");
            console.log(this.state.list);
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
            console.log("DidUpdate");
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var object = "";

            console.log("Render:");
            console.log(this.state.list);

            if (this.props.isdeletegoal) {
                object = this.state.list.map(function (list) {
                    return React.createElement(
                        "div",
                        { key: list.id },
                        list.id,
                        " ",
                        React.createElement(
                            "div",
                            { onClick: _this4.deleteGoal.bind(_this4, list.id) },
                            "Delete"
                        ),
                        React.createElement("br", null),
                        list.title,
                        React.createElement("br", null),
                        list.content,
                        React.createElement("br", null),
                        React.createElement("br", null)
                    );
                });
            } else {
                object = this.state.list.map(function (list) {
                    return React.createElement(
                        "div",
                        { key: list.id },
                        list.id,
                        React.createElement("br", null),
                        list.title,
                        React.createElement("br", null),
                        list.content,
                        React.createElement("br", null),
                        React.createElement("br", null)
                    );
                });
            }

            return React.createElement(
                "div",
                null,
                "Objects:",
                object
            );
        }
    }]);

    return GoalContainer;
}(React.Component);