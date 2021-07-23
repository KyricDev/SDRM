var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
class Root extends React.Component{
    constructor(props){
        super(props);
        this.state = {content: ""};
    }

    componentDidMount(){
        fetch('https://localhost:5001/RoadMap/1')
        .then(response => response.json())
        .then(data => {
                this.setState({content: data});
                console.log("Starting log . . .");
                console.log(data);
                console.log(data.title);
                console.log("Ending log . . .");
            })
    }

    render(){
        return(
            <div>
                <h1>Title: {this.state.content.title}</h1> 
                <h2>
                    Content: {this.state.content.content}
                </h2>
            </div>
        )
    }
}

ReactDOM.render(
    <Root />,
    document.getElementById("root")
)
*/

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