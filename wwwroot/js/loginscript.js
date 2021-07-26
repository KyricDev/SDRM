var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { FormField } from "/js/script.js";

var RegisterForm = function (_React$Component) {
    _inherits(RegisterForm, _React$Component);

    function RegisterForm(props) {
        _classCallCheck(this, RegisterForm);

        var _this = _possibleConstructorReturn(this, (RegisterForm.__proto__ || Object.getPrototypeOf(RegisterForm)).call(this, props));

        _this.state = { username: "", password: "" };
        return _this;
    }

    _createClass(RegisterForm, [{
        key: "updateField",
        value: function updateField(field, e) {
            if (field == "username") {
                this.setState({ username: e });
            } else if (field == "password") {
                this.setState({ password: e });
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    "Software Developer RoadMap"
                ),
                React.createElement(
                    "h2",
                    null,
                    "Welcome!"
                ),
                React.createElement(
                    "form",
                    { method: "Post", action: "/User/Login" },
                    React.createElement(FormField, { field: "username", updateField: this.updateField.bind(this, "username") }),
                    React.createElement(FormField, { field: "password", updateField: this.updateField.bind(this, "password") }),
                    React.createElement(
                        "button",
                        null,
                        "Submit"
                    )
                )
            );
        }
    }]);

    return RegisterForm;
}(React.Component);

var RegisterRoot = function (_React$Component2) {
    _inherits(RegisterRoot, _React$Component2);

    function RegisterRoot() {
        _classCallCheck(this, RegisterRoot);

        return _possibleConstructorReturn(this, (RegisterRoot.__proto__ || Object.getPrototypeOf(RegisterRoot)).apply(this, arguments));
    }

    _createClass(RegisterRoot, [{
        key: "render",
        value: function render() {
            return React.createElement(RegisterForm, null);
        }
    }]);

    return RegisterRoot;
}(React.Component);

ReactDOM.render(React.createElement(RegisterRoot, null), document.getElementById("LoginRoot"));