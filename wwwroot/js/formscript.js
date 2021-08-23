var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { FormField } from "/script.js";

// LoginForm using Login API

var LoginForm = function (_React$Component) {
    _inherits(LoginForm, _React$Component);

    function LoginForm(props) {
        _classCallCheck(this, LoginForm);

        var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

        _this.state = { username: "",
            password: "",
            data: {
                id: 0,
                username: "",
                status: ""
            }
        };
        _this.submit = _this.submit.bind(_this);
        return _this;
    }

    _createClass(LoginForm, [{
        key: "updateField",
        value: function updateField(field, e) {
            if (field == "username") {
                this.setState({ username: e });
            } else if (field == "password") {
                this.setState({ password: e });
            }
        }
    }, {
        key: "submit",
        value: function submit() {
            var _this2 = this;

            fetch("https://localhost:5001/User/LoginUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            }).then(function (response) {
                return response.json();
            }).then(function (info) {
                console.log(info);
                _this2.setState({ data: info });
            }).then(function () {
                console.log("Pre status check . . .");
                console.log(_this2.state.data.status);

                if (_this2.state.data.status == 200) {
                    console.log("Login Success. Routing . . .");
                    window.location.assign("https://localhost:5001/UserView/Dashboard");
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.state.data.id,
                this.state.data.username,
                this.state.data.status,
                React.createElement(FormField, { field: "username", updateField: this.updateField.bind(this, "username") }),
                React.createElement(FormField, { field: "password", updateField: this.updateField.bind(this, "password") }),
                React.createElement(
                    "button",
                    { onClick: this.submit },
                    "Submit"
                )
            );
        }
    }]);

    return LoginForm;
}(React.Component);

// LoginForm using MVC
/*
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", 
                      password: ""
                     };
    }
    updateField(field, e){
        if (field == "username"){
            this.setState({username: e});
        }
        else if (field == "password"){
            this.setState({password: e});
        }
    }
    render() {
        console.log(this.state.username + " | " + this.state.password);

        if (this.state.username == "" || this.state.password == ""){
            return(
                <div>
                    <form method="POST" action="LoginUser" controller="UserView">
                        <FormField field="username" updateField={this.updateField.bind(this, "username")}/>
                        <FormField field="password" updateField={this.updateField.bind(this, "password")}/>
                        <button disabled>Submit</button>
                    </form>
                    A Field is Empty
                </div>
            )
        }
        else{
            return(
                <div>
                    <form method="POST" action="LoginUser" controller="UserView">
                        <FormField field="username" updateField={this.updateField.bind(this, "username")}/>
                        <FormField field="password" updateField={this.updateField.bind(this, "password")}/>
                        <button >Submit</button>
                    </form>
                </div>
            )
        }
    }
}
*/


var RegisterForm = function (_React$Component2) {
    _inherits(RegisterForm, _React$Component2);

    function RegisterForm(props) {
        _classCallCheck(this, RegisterForm);

        var _this3 = _possibleConstructorReturn(this, (RegisterForm.__proto__ || Object.getPrototypeOf(RegisterForm)).call(this, props));

        _this3.state = { username: "",
            password: "",
            confirmpassword: "",
            data: {
                status: ""
            }
        };
        _this3.updateField = _this3.updateField.bind(_this3);
        _this3.submit = _this3.submit.bind(_this3);
        return _this3;
    }

    _createClass(RegisterForm, [{
        key: "updateField",
        value: function updateField(field, e) {
            if (field == "username") {
                this.setState({ username: e });
            } else if (field == "password") {
                this.setState({ password: e });
            } else {
                this.setState({ confirmpassword: e });
            }
        }
    }, {
        key: "submit",
        value: function submit() {
            var _this4 = this;

            fetch("https://localhost:5001/User/RegisterUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    confirmpassword: this.state.confirmpassword
                })
            }).then(function (response) {
                return response.json();
            }).then(function (info) {
                console.log(info);
                _this4.setState({ data: info });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.state.data.status,
                React.createElement(FormField, { field: "username", updateField: this.updateField.bind(this, "username") }),
                React.createElement(FormField, { field: "password", updateField: this.updateField.bind(this, "password") }),
                React.createElement(FormField, { field: "confirmpassword", updateField: this.updateField.bind(this, "confirmpassword") }),
                React.createElement(
                    "button",
                    { onClick: this.submit },
                    "Submit"
                )
            );
        }
    }]);

    return RegisterForm;
}(React.Component);

var FormRoot = function (_React$Component3) {
    _inherits(FormRoot, _React$Component3);

    function FormRoot(props) {
        _classCallCheck(this, FormRoot);

        var _this5 = _possibleConstructorReturn(this, (FormRoot.__proto__ || Object.getPrototypeOf(FormRoot)).call(this, props));

        _this5.state = { form: "0" };
        _this5.changeForm = _this5.changeForm.bind(_this5);
        return _this5;
    }

    _createClass(FormRoot, [{
        key: "changeForm",
        value: function changeForm(e) {
            this.setState({ form: e.target.value });
        }
    }, {
        key: "render",
        value: function render() {
            console.log(this.state.form);
            if (this.state.form == 0) {
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
                        "button",
                        { value: "0", onClick: this.changeForm },
                        "Login"
                    ),
                    React.createElement(
                        "button",
                        { value: "1", onClick: this.changeForm },
                        "Register"
                    ),
                    React.createElement(LoginForm, null)
                );
            } else {
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
                        "Create an Account"
                    ),
                    React.createElement(
                        "button",
                        { value: "0", onClick: this.changeForm },
                        "Login"
                    ),
                    React.createElement(
                        "button",
                        { value: "1", onClick: this.changeForm },
                        "Register"
                    ),
                    React.createElement(RegisterForm, null)
                );
            }
        }
    }]);

    return FormRoot;
}(React.Component);

ReactDOM.render(React.createElement(FormRoot, null), document.getElementById("FormRoot"));