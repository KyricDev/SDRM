var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

export var FormField = function (_React$Component) {
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
            //        this.setState({field: this.props.field});
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
            var field = void 0;

            if (this.props.field == "username") {
                field = "Username";
            } else if (this.props.field == "password") {
                field = "Password";
            } else if (this.props.field == "confirmpassword") {
                field = "Confirm Password";
            }

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "label",
                    null,
                    field
                ),
                React.createElement("input", { type: "text", name: field, onChange: this.updateField }),
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