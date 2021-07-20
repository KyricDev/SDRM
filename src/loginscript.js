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
        if (field == "Username"){
            this.setState({username: e});
        }
        else if (field == "Password"){
            this.setState({password: e});
        }
    }
    render() {
        return(
            <div>
                <h1>Software Developer RoadMap</h1>
                <h2>Welcome!</h2>
                <form method="Post" action="/RoadMapView/Index">
                    <FormField field="Username" updateField={this.updateField.bind(this, "Username")}/>
                    <FormField field="Password" updateField={this.updateField.bind(this, "Password")}/>
                    <button >Submit</button>
                </form>
            </div>
        )
    }
}

class RegisterRoot extends React.Component {
    render() {
        return (
            <RegisterForm />
        )
    }
}

ReactDOM.render(
    <RegisterRoot />,
    document.getElementById("LoginRoot")
)