export var siteRoot = "https://localhost:5001";

export class FormField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {field: "Default Field", value: ""};
        this.updateField = this.updateField.bind(this);
    }
    componentDidMount(){
//        this.setState({field: this.props.field});
    }
    updateField(e){
        this.setState({value: e.target.value}, () => this.props.updateField(this.state.value));
    }
    render() {
        let field;

        if (this.props.field == "username"){
            field = "Username";
        }
        else if (this.props.field == "password"){
            field = "Password";
        }
        else if (this.props.field == "confirmpassword"){
            field = "Confirm Password";
        }

        return (
            <div>
                <label>{field}</label>
                <input type="text" name={field} onChange={this.updateField}></input>
                <p>{this.state.value}</p>
            </div>
        )
    }
}