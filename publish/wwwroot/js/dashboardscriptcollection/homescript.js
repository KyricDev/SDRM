var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { siteRoot } from "/js/script.js";

export var GoalContainer = function (_React$Component) {
    _inherits(GoalContainer, _React$Component);

    function GoalContainer(props) {
        _classCallCheck(this, GoalContainer);

        var _this = _possibleConstructorReturn(this, (GoalContainer.__proto__ || Object.getPrototypeOf(GoalContainer)).call(this, props));

        _this.state = {
            list: [{
                content: "",
                newContent: "",
                id: "",
                isComplete: false,
                title: "",
                newTitle: "",
                user: "",
                userID: "",
                reveal: false,
                initialState: true,
                editState: false
            }]
        };
        return _this;
    }

    _createClass(GoalContainer, [{
        key: "changeCompletedState",
        value: function changeCompletedState(id, e) {
            var _this2 = this;

            console.log("Change Completed State Id: " + id);

            fetch(siteRoot + "/api/RoadMapItem/ChangeRoadMapItemCompletedStatus", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: id,
                    title: "",
                    description: "",
                    isComplete: false
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data == 200) {
                    console.log("Successfully Modified Item");

                    var list = _this2.state.list;

                    list.map(function (l) {
                        if (l.id == id) {
                            l.isComplete = !l.isComplete;
                        }
                    });

                    _this2.setState({ list: list });
                } else {
                    console.log("Item Failed to be Modified");
                    console.log(data);
                }
            });
        }
    }, {
        key: "updateTitle",
        value: function updateTitle(id, e) {
            var list = this.state.list;

            list.map(function (l) {
                if (l.id == id) {
                    l.newTitle = e.target.value;
                }
            });

            this.setState({ list: list });
        }
    }, {
        key: "updateContent",
        value: function updateContent(id, e) {
            var list = this.state.list;

            list.map(function (l) {
                if (l.id == id) {
                    l.newContent = e.target.value;
                }
            });

            this.setState({ list: list });
        }
    }, {
        key: "confirmEdit",
        value: function confirmEdit(id, e) {
            var _this3 = this;

            console.log("Confirm Edit Id: " + id);

            var list = this.state.list;
            var goal = {};

            list.every(function (item) {
                if (item.id == id) {
                    goal = item;
                    console.log("Logging Goal . . .");
                    console.log(goal);
                    return false;
                }
                return true;
            });

            fetch(siteRoot + "/api/RoadMapItem/UpdateRoadMapItem", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: goal.id,
                    title: goal.newTitle,
                    description: goal.newContent,
                    isComplete: goal.isComplete
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                if (data == 200) {
                    list.map(function (l) {
                        if (l.id == id) {
                            l.content = l.newContent;
                            l.title = l.newTitle;
                            l.editState = false;
                        }
                    });

                    _this3.setState({ list: list });
                }
            });
        }
    }, {
        key: "editGoal",
        value: function editGoal(id, e) {
            var list = this.state.list;

            list.map(function (l) {
                if (l.id == id) {
                    l.editState = !l.editState;
                }
            });

            this.setState({ list: list });
        }
    }, {
        key: "revealGoal",
        value: function revealGoal(id, e) {
            console.log(e.target.value);
            console.log(e);
            console.log(id);

            var list = this.state.list;

            list.map(function (l) {
                if (l.id == id) {
                    l.reveal = !l.reveal;
                    l.initialState = false;
                } else {
                    l.reveal = false;
                    l.editState = false;
                }
            });

            this.setState({ list: list });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this4 = this;

            console.log("DidMount");

            fetch(siteRoot + "/api/RoadMapItem/GetRoadMapItems").then(function (response) {
                return response.json();
            }).then(function (data) {

                var goals = [];

                data.forEach(function (element) {
                    var goal = new Object();

                    goal.content = element.content;
                    goal.newContent = element.content;
                    goal.id = element.id;
                    goal.isComplete = element.isComplete;
                    goal.title = element.title;
                    goal.newTitle = element.title;
                    goal.user = element.user;
                    goal.userID = element.userID;
                    goal.reveal = false;
                    goal.initialState = true;
                    goal.editState = false;

                    goals.push(goal);
                });

                _this4.setState({ list: goals });
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {}
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {}
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            var object = "";

            console.log("Render:");
            console.log(this.state.list);

            object = this.state.list.map(function (list) {
                var goalState = list.isComplete ? React.createElement(
                    "div",
                    { className: "goal-complete-status", key: list.id, onClick: _this5.changeCompletedState.bind(_this5, list.id) },
                    React.createElement(
                        "svg",
                        { width: "33", height: "33", viewBox: "0 0 33 40", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("rect", { x: "8.80005", y: "30.7999", width: "31.1128", height: "3.11128", transform: "rotate(-45 8.80005 30.7999)", fill: "#2BA700" }),
                        React.createElement("rect", { x: "0.000610352", y: "21.9994", width: "3.11128", height: "15.5564", transform: "rotate(-45 0.000610352 21.9994)", fill: "#2BA700" })
                    )
                ) : React.createElement(
                    "div",
                    { className: "goal-complete-status", key: list.id, onClick: _this5.changeCompletedState.bind(_this5, list.id) },
                    React.createElement(
                        "svg",
                        { width: "32", height: "7", viewBox: "0 0 32 7", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("path", { d: "M18.7003 3.20004C18.7003 4.69124 17.4914 5.90009 16.0002 5.90009C14.509 5.90009 13.3002 4.69124 13.3002 3.20004C13.3002 1.70885 14.509 0.5 16.0002 0.5C17.4914 0.5 18.7003 1.70885 18.7003 3.20004Z", fill: "white", stroke: "black" }),
                        React.createElement("path", { d: "M31.5002 3.20004C31.5002 4.69124 30.2913 5.90009 28.8001 5.90009C27.3089 5.90009 26.1001 4.69124 26.1001 3.20004C26.1001 1.70885 27.3089 0.5 28.8001 0.5C30.2913 0.5 31.5002 1.70885 31.5002 3.20004Z", fill: "white", stroke: "black" }),
                        React.createElement("path", { d: "M5.90009 3.20004C5.90009 4.69124 4.69124 5.90009 3.20004 5.90009C1.70885 5.90009 0.5 4.69124 0.5 3.20004C0.5 1.70885 1.70885 0.5 3.20004 0.5C4.69124 0.5 5.90009 1.70885 5.90009 3.20004Z", fill: "white", stroke: "black" })
                    )
                );

                var goalContent = list.reveal ? list.editState ? React.createElement(
                    "div",
                    { className: "goal-container", key: list.id },
                    React.createElement(
                        "div",
                        { className: "goal-title-container remove-margin" },
                        React.createElement("input", { type: "text", className: "edit-goal-title", onChange: _this5.updateTitle.bind(_this5, list.id), value: list.newTitle }),
                        goalState
                    ),
                    React.createElement("div", { className: "add-goal-content-outline outline-animate-in" }),
                    React.createElement(
                        "div",
                        { className: "add-goal-content outline-animate-in" },
                        React.createElement("textarea", { value: list.newContent, row: "5", column: "150", className: "edit-goal-content", onChange: _this5.updateContent.bind(_this5, list.id) }),
                        React.createElement(
                            "div",
                            { className: "button-container-edit" },
                            React.createElement(
                                "button",
                                { onClick: _this5.confirmEdit.bind(_this5, list.id), className: "button" },
                                "Confirm"
                            ),
                            React.createElement(
                                "button",
                                { onClick: _this5.editGoal.bind(_this5, list.id), className: "button" },
                                "Cancel"
                            )
                        )
                    )
                ) : React.createElement(
                    "div",
                    { className: "goal-container", key: list.id },
                    React.createElement(
                        "div",
                        { className: "goal-title-container remove-margin" },
                        React.createElement(
                            "div",
                            { className: "goal-title", onClick: _this5.revealGoal.bind(_this5, list.id) },
                            list.title
                        ),
                        goalState
                    ),
                    React.createElement("div", { className: "add-goal-content-outline outline-animate-in" }),
                    React.createElement(
                        "div",
                        { className: "add-goal-content outline-animate-in" },
                        React.createElement(
                            "p",
                            { className: "content" },
                            list.content
                        ),
                        React.createElement(
                            "div",
                            { className: "button-container-edit" },
                            React.createElement(
                                "button",
                                { onClick: _this5.editGoal.bind(_this5, list.id), className: "button" },
                                "Edit"
                            )
                        )
                    )
                ) : list.initialState ? React.createElement(
                    "div",
                    { className: "goal-container", key: list.id },
                    React.createElement(
                        "div",
                        { className: "goal-title-container" },
                        React.createElement(
                            "div",
                            { className: "goal-title", onClick: _this5.revealGoal.bind(_this5, list.id) },
                            list.title
                        ),
                        goalState
                    )
                ) : React.createElement(
                    "div",
                    { className: "goal-container", key: list.id },
                    React.createElement(
                        "div",
                        { className: "goal-title-container" },
                        React.createElement(
                            "div",
                            { className: "goal-title", onClick: _this5.revealGoal.bind(_this5, list.id) },
                            list.title
                        ),
                        goalState
                    ),
                    React.createElement("div", { className: "add-goal-content-outline outline-animate-out" }),
                    React.createElement("div", { className: "add-goal-content content-animate-out" })
                );
                return React.createElement(
                    "div",
                    null,
                    goalContent
                );
            });

            return React.createElement(
                "div",
                { className: "goals" },
                React.createElement(
                    "div",
                    { className: "goal-list-container" },
                    object
                )
            );
        }
    }]);

    return GoalContainer;
}(React.Component);