//import { FormField } from "/js/script.js";
class FormField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {field: "Default Field", value: ""};
        this.updateField = this.updateField.bind(this);
    }
    componentDidMount(){
        this.setState({field: this.props.field});
    }
    updateField(e){
        this.setState({value: e.target.value}, () => this.props.updateField(this.state.value));
    }
    render() {
        return (
            <div>
                <label>{this.state.field}</label>
                <input type="text" name={this.state.field} onChange={this.updateField}></input>
                <p>{this.state.value}</p>
            </div>
        )
    }
}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
    }
    updateField(field, e){
        if (field == "username"){
            this.setState({username: e});
        }
        else{
            this.setState({password: e});
        }
    }
    render() {
        return(
            <div>
                <h1>Test Element</h1>
                <form method="Post" action="/User/Register">
                    <FormField field="username" updateField={this.updateField.bind(this, "username")} />
                    <FormField field="password" updateField={this.updateField.bind(this, "password")} />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

ReactDOM.render(
    <RegisterForm />,
    document.getElementById("Root")
)