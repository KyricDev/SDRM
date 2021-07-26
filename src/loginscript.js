import { FormField } from "/js/script.js";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
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
        return(
            <div>
                <h1>Software Developer RoadMap</h1>
                <h2>Welcome!</h2>
                <form method="Post" action="/User/Login">
                    <FormField field="username" updateField={this.updateField.bind(this, "username")}/>
                    <FormField field="password" updateField={this.updateField.bind(this, "password")}/>
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