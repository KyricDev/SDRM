var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { FormField } from "/js/script.js";
import { siteRoot } from "/js/script.js";

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
            },
            buttonState: false
        };
        _this.submit = _this.submit.bind(_this);
        return _this;
    }

    _createClass(LoginForm, [{
        key: "updateField",
        value: function updateField(field, e) {
            var _this2 = this;

            if (field == "username") {
                this.setState({ username: e }, function () {
                    if (_this2.state.username < 1 || _this2.state.password < 1) {
                        _this2.setState({ buttonState: false });
                    } else {
                        _this2.setState({ buttonState: true });
                    }
                });
            } else if (field == "password") {
                this.setState({ password: e }, function () {
                    if (_this2.state.username < 1 || _this2.state.password < 1) {
                        _this2.setState({ buttonState: false });
                    } else {
                        _this2.setState({ buttonState: true });
                    }
                });
            }
        }
    }, {
        key: "submit",
        value: function submit() {
            var _this3 = this;

            this.props.resetAccountStatus(false);

            fetch(siteRoot + "/api/User/LoginUser", {
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
                _this3.setState({ data: info });
            }).then(function () {
                if (_this3.state.data.status == 200) {
                    console.log("Login Success. Routing . . .");
                    window.location.assign(siteRoot + "/UserView/Dashboard");
                } else {
                    var newData = _this3.state.data;
                    newData.status = "Incorrect Username or Password";
                    _this3.setState({ data: newData });
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var button = React.createElement(
                "div",
                { className: "button-submit" },
                React.createElement(
                    "button",
                    { className: "button-form enabled", onClick: this.submit },
                    "Sign In"
                )
            );

            if (!this.state.buttonState) {
                button = React.createElement(
                    "div",
                    { className: "button-submit" },
                    React.createElement(
                        "button",
                        { className: "button-form disabled", onClick: this.submit, disabled: true },
                        "Sign In"
                    )
                );
            }

            var accountStatus = "";
            if (this.props.isAccountCreated == true) {
                accountStatus = "Account Successfully Created!";
            }

            var status = this.state.data.status;
            if (this.state.data.status != 200) {
                status = "";
            }

            return React.createElement(
                "div",
                { className: "form" },
                React.createElement(
                    "div",
                    { className: "greeting" },
                    "Welcome! Login to Access your RoadMap"
                ),
                React.createElement(FormField, { field: "username", updateField: this.updateField.bind(this, "username") }),
                React.createElement(FormField, { field: "password", updateField: this.updateField.bind(this, "password") }),
                React.createElement(
                    "div",
                    { className: "status" },
                    status,
                    accountStatus
                ),
                button
            );
        }
    }]);

    return LoginForm;
}(React.Component);

var RegisterForm = function (_React$Component2) {
    _inherits(RegisterForm, _React$Component2);

    function RegisterForm(props) {
        _classCallCheck(this, RegisterForm);

        var _this4 = _possibleConstructorReturn(this, (RegisterForm.__proto__ || Object.getPrototypeOf(RegisterForm)).call(this, props));

        _this4.state = { username: "",
            password: "",
            confirmpassword: "",
            data: {
                status: ""
            },
            buttonState: false
        };
        _this4.updateField = _this4.updateField.bind(_this4);
        _this4.submit = _this4.submit.bind(_this4);
        return _this4;
    }

    _createClass(RegisterForm, [{
        key: "updateField",
        value: function updateField(field, e) {
            var _this5 = this;

            if (field == "username") {
                this.setState({ username: e }, function () {
                    if (_this5.state.username.length < 1 || _this5.state.password.length < 5 || _this5.state.confirmpassword.length < 5 || _this5.state.password != _this5.state.confirmpassword) {
                        _this5.setState({ buttonState: false }, function () {
                            var newStatus = "";
                            if (_this5.state.username.length < 1) {
                                newStatus += "No Username Entered. ";
                            }
                            if (_this5.state.password.length < 5 || _this5.state.confirmpassword.length < 5) {
                                newStatus += "Password Length too Short. ";
                            }
                            if (_this5.state.password != _this5.state.confirmpassword) {
                                newStatus += "Passwords do not Match. ";
                            }

                            var newData = _this5.state.data;
                            newData.status = newStatus;

                            _this5.setState({ data: newData });
                        });
                    } else {
                        _this5.setState({ buttonState: true }, function () {
                            var newStatus = "";
                            if (_this5.state.username.length < 1) {
                                newStatus += "No Username Entered. ";
                            }
                            if (_this5.state.password.length < 5 || _this5.state.confirmpassword.length < 5) {
                                newStatus += "Password Length too Short. ";
                            }
                            if (_this5.state.password != _this5.state.confirmpassword) {
                                newStatus += "Passwords do not Match. ";
                            }

                            var newData = _this5.state.data;
                            newData.status = newStatus;

                            _this5.setState({ data: newData });
                        });
                    }
                });
            } else if (field == "password") {
                this.setState({ password: e }, function () {
                    if (_this5.state.username.length < 1 || _this5.state.password.length < 5 || _this5.state.confirmpassword.length < 5 || _this5.state.password != _this5.state.confirmpassword) {
                        _this5.setState({ buttonState: false }, function () {
                            var newStatus = "";
                            if (_this5.state.username.length < 1) {
                                newStatus += "No Username Entered. ";
                            }
                            if (_this5.state.password.length < 5 || _this5.state.confirmpassword.length < 5) {
                                newStatus += "Password Length too Short. ";
                            }
                            if (_this5.state.password != _this5.state.confirmpassword) {
                                newStatus += "Passwords do not Match. ";
                            }

                            var newData = _this5.state.data;
                            newData.status = newStatus;

                            _this5.setState({ data: newData });
                        });
                    } else {
                        _this5.setState({ buttonState: true }, function () {
                            var newStatus = "";
                            if (_this5.state.username.length < 1) {
                                newStatus += "No Username Entered. ";
                            }
                            if (_this5.state.password.length < 5 || _this5.state.confirmpassword.length < 5) {
                                newStatus += "Password Length too Short. ";
                            }
                            if (_this5.state.password != _this5.state.confirmpassword) {
                                newStatus += "Passwords do not Match. ";
                            }

                            var newData = _this5.state.data;
                            newData.status = newStatus;

                            _this5.setState({ data: newData });
                        });
                    }
                });
            } else {
                this.setState({ confirmpassword: e }, function () {
                    if (_this5.state.username.length < 1 || _this5.state.password.length < 5 || _this5.state.confirmpassword.length < 5 || _this5.state.password != _this5.state.confirmpassword) {
                        _this5.setState({ buttonState: false }, function () {
                            var newStatus = "";
                            if (_this5.state.username.length < 1) {
                                newStatus += "No Username Entered. ";
                            }
                            if (_this5.state.password.length < 5 || _this5.state.confirmpassword.length < 5) {
                                newStatus += "Password Length too Short. ";
                            }
                            if (_this5.state.password != _this5.state.confirmpassword) {
                                newStatus += "Passwords do not Match. ";
                            }

                            var newData = _this5.state.data;
                            newData.status = newStatus;

                            _this5.setState({ data: newData });
                        });
                    } else {
                        _this5.setState({ buttonState: true }, function () {
                            var newStatus = "";
                            if (_this5.state.username.length < 1) {
                                newStatus += "No Username Entered. ";
                            }
                            if (_this5.state.password.length < 5 || _this5.state.confirmpassword.length < 5) {
                                newStatus += "Password Length too Short. ";
                            }
                            if (_this5.state.password != _this5.state.confirmpassword) {
                                newStatus += "Passwords do not Match. ";
                            }

                            var newData = _this5.state.data;
                            newData.status = newStatus;

                            _this5.setState({ data: newData });
                        });
                    }
                });
            }
        }
    }, {
        key: "submit",
        value: function submit() {
            var _this6 = this;

            fetch(siteRoot + "/api/User/RegisterUser", {
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
                if (info.status == 200) {
                    _this6.props.changeNavigation("0");
                } else {
                    var newData = _this6.state.data;
                    newData.status = "Username Already Exists. Please Try Again.";
                    _this6.setState({ data: newData });
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var button = React.createElement(
                "div",
                { className: "button-submit" },
                React.createElement(
                    "button",
                    { className: "button-form enabled", onClick: this.submit },
                    "Create Account"
                )
            );

            if (!this.state.buttonState) {
                button = React.createElement(
                    "div",
                    { className: "button-submit" },
                    React.createElement(
                        "button",
                        { className: "button-form disabled", onClick: this.submit, disabled: true },
                        "Create Account"
                    )
                );
            }

            return React.createElement(
                "div",
                { className: "form" },
                React.createElement(
                    "div",
                    { className: "greeting" },
                    "Don't Have an Account? Creating One is Free!"
                ),
                React.createElement(FormField, { field: "username", updateField: this.updateField.bind(this, "username") }),
                React.createElement(FormField, { field: "password", updateField: this.updateField.bind(this, "password") }),
                React.createElement(FormField, { field: "confirmpassword", updateField: this.updateField.bind(this, "confirmpassword") }),
                React.createElement(
                    "div",
                    { className: "status" },
                    this.state.data.status
                ),
                button
            );
        }
    }]);

    return RegisterForm;
}(React.Component);

var FormRoot = function (_React$Component3) {
    _inherits(FormRoot, _React$Component3);

    function FormRoot(props) {
        _classCallCheck(this, FormRoot);

        var _this7 = _possibleConstructorReturn(this, (FormRoot.__proto__ || Object.getPrototypeOf(FormRoot)).call(this, props));

        _this7.state = { form: "0",
            isAccountCreated: false
        };
        _this7.changeForm = _this7.changeForm.bind(_this7);
        _this7.changeNavigation = _this7.changeNavigation.bind(_this7);
        _this7.resetAccountStatus = _this7.resetAccountStatus.bind(_this7);
        return _this7;
    }

    _createClass(FormRoot, [{
        key: "changeForm",
        value: function changeForm(e) {
            this.setState({ form: e.target.value });
        }
    }, {
        key: "changeNavigation",
        value: function changeNavigation(e) {
            var _this8 = this;

            this.setState({ isAccountCreated: true }, function () {
                return _this8.setState({ form: e });
            });
        }
    }, {
        key: "resetAccountStatus",
        value: function resetAccountStatus(e) {
            this.setState({ isAccountCreated: false });
        }
    }, {
        key: "render",
        value: function render() {
            console.log(this.state.form);
            if (this.state.form == 0) {
                return React.createElement(
                    "div",
                    { className: "container-parent" },
                    React.createElement(
                        "div",
                        { className: "container-left" },
                        React.createElement(
                            "h1",
                            { className: "title-sdrm" },
                            "Software Developer RoadMap"
                        ),
                        React.createElement(
                            "h2",
                            { className: "tagline-sdrm" },
                            "Welcome!"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "container-right" },
                        React.createElement(
                            "div",
                            { className: "container-button" },
                            React.createElement(
                                "div",
                                { className: "button-click button-login" },
                                React.createElement(
                                    "button",
                                    { value: "0", onClick: this.changeForm },
                                    "Login"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "button-unclick button-register" },
                                React.createElement(
                                    "button",
                                    { value: "1", onClick: this.changeForm },
                                    "Register"
                                )
                            )
                        ),
                        React.createElement(LoginForm, { isAccountCreated: this.state.isAccountCreated, resetAccountStatus: this.resetAccountStatus })
                    )
                );
            } else {
                return React.createElement(
                    "div",
                    { className: "container-parent" },
                    React.createElement(
                        "div",
                        { className: "container-left" },
                        React.createElement(
                            "h1",
                            { className: "title-sdrm" },
                            "Software Developer RoadMap"
                        ),
                        React.createElement(
                            "h2",
                            { className: "tagline-sdrm" },
                            "\"Keeping you on track\""
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "container-right" },
                        React.createElement(
                            "div",
                            { className: "container-button" },
                            React.createElement(
                                "div",
                                { className: "button-unclick button-login" },
                                React.createElement(
                                    "button",
                                    { value: "0", onClick: this.changeForm },
                                    "Login"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "button-click button-register" },
                                React.createElement(
                                    "button",
                                    { value: "1", onClick: this.changeForm },
                                    "Register"
                                )
                            )
                        ),
                        React.createElement(RegisterForm, { changeNavigation: this.changeNavigation })
                    )
                );
            }
        }
    }]);

    return FormRoot;
}(React.Component);

ReactDOM.render(React.createElement(FormRoot, null), document.getElementById("FormRoot"));