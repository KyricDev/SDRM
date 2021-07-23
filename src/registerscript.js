import { FormField } from "/js/script.js";


class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
    }
    updateField(field, e){
        if (field == "username"){
            this.setState({username: e.target.value});
        }
        else{
            this.setState({password: e.target.value});
        }
    }
    render() {
        return(
            <div>
                <h1>Test Element</h1>
                <form method="Post" action="/UserView/Register">
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