import { FormField } from "/script.js";

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", 
                      password: "", 
                      confirmpassword: ""
        };
    }
    updateField(field, e){
        if (field == "username"){
            this.setState({username: e});
        }
        else if (field == "password"){
            this.setState({password: e});
        }
        else if (field == "confirmpassword"){
            this.setState({confirmpassword: e});
        }
    }
    render() {
        return(
            <div>
                <h1>Test Element</h1>
                <form method="Post" action="/User/Register">
                    <FormField field="username" updateField={this.updateField.bind(this, "username")} />
                    <FormField field="password" updateField={this.updateField.bind(this, "password")} />
                    <FormField field="confirmpassword" updateField={this.updateField.bind(this, "confirmpassword")} />
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