var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
        this.username = React.createRef();
        this.password = React.createRef();
        this.updateUsername = this.updateUsername.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.submit = this.submit.bind(this);
    }
    updateUsername(username) {
        this.setState({username: username.target.value});
    }
    updatePassword(password){
        this.setState({password: password.target.value});
    }
    submit(e) {
        e.preventDefault();
        this.setState({username: this.username.current.value, password: this.password.current.value});
    }
    render() {
        return(
            <div>
                <h1>Software Development RoadMap</h1>
                <h2>Welcome!</h2>
                <form>
                    <label>Username</label>
                    <input type="text"  ref={this.username}></input>
                    <label>Password</label>
                    <input type="password"  ref={this.password}></input>
                    <button onClick={this.submit}>Submit</button>
                </form>
                <h3>Username: {this.state.username} Password: {this.state.password}</h3>
            </div>
        )
    }
}
*/

var FormField = function (_React$Component) {
    _inherits(FormField, _React$Component);

    function FormField(props) {
        _classCallCheck(this, FormField);

        var _this = _possibleConstructorReturn(this, (FormField.__proto__ || Object.getPrototypeOf(FormField)).call(this, props));

        _this.state = { field: "Default Field", value: "" };
        _this.updateField = _this.updateField.bind(_this);
        return _this;
    }

    _createClass(FormField, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.setState({ field: this.props.field });
        }
    }, {
        key: "updateField",
        value: function updateField(e) {
            var _this2 = this;

            this.setState({ value: e.target.value }, function () {
                return _this2.props.updateField(_this2.state.value);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "label",
                    null,
                    this.state.field
                ),
                React.createElement("input", { type: "text", name: this.state.field, onChange: this.updateField }),
                React.createElement(
                    "p",
                    null,
                    this.state.value
                )
            );
        }
    }]);

    return FormField;
}(React.Component);

var RegisterForm = function (_React$Component2) {
    _inherits(RegisterForm, _React$Component2);

    function RegisterForm(props) {
        _classCallCheck(this, RegisterForm);

        var _this3 = _possibleConstructorReturn(this, (RegisterForm.__proto__ || Object.getPrototypeOf(RegisterForm)).call(this, props));

        _this3.state = { username: "", password: "" };
        return _this3;
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
                    { method: "Post", action: "/RoadMapView/Index" },
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

var RegisterRoot = function (_React$Component3) {
    _inherits(RegisterRoot, _React$Component3);

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