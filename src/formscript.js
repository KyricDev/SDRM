import { FormField } from "/js/script.js";

// LoginForm using Login API

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", 
                      password: "", 
                      data: {
                          id: 0,
                          username: "",
                          status: ""
                      }
                    };
        this.submit = this.submit.bind(this);
    }
    updateField(field, e){
        if (field == "username"){
            this.setState({username: e});
        }
        else if (field == "password"){
            this.setState({password: e});
        }
    }
    submit(){
        fetch("https://localhost:5001/api/User/LoginUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username, 
                password: this.state.password 
            })
        })
            .then(response => response.json())
            .then(info => {
                console.log(info);
                this.setState({data: info});
            })
            .then(() => {
                console.log("Pre status check . . .")
                console.log(this.state.data.status);

                if (this.state.data.status == 200){
                    console.log("Login Success. Routing . . .");
                    window.location.assign("https://localhost:5001/UserView/Dashboard");
                }
            })
    }
    render() {
        let button = <button onClick={this.submit}>Submit</button>;
        if (this.state.username == "" || this.state.password == ""){
            button = <button onClick={this.submit} disabled>Submit</button>
        }

        return(
            <div>
                <FormField field="username" updateField={this.updateField.bind(this, "username")}/>
                <FormField field="password" updateField={this.updateField.bind(this, "password")}/>
                {button}
            </div>
        )
    }
}

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", 
                      password: "", 
                      confirmpassword: "",
                      data:{
                          status: ""
                      }
                     };
        this.updateField = this.updateField.bind(this);
        this.submit = this.submit.bind(this);
    }
    updateField(field, e){
        if (field == "username"){
            this.setState({username: e});
        }
        else if (field == "password"){
            this.setState({password: e});
        }
        else{
            this.setState({confirmpassword: e});
        }
    }
    submit(){
        fetch("https://localhost:5001/api/User/RegisterUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                confirmpassword: this.state.confirmpassword
            })
        })
            .then(response => response.json())
            .then(info => {
                console.log(info);
                this.setState({data: info});
            })
    }
    render(){
        return(
            <div>
                {this.state.data.status}
                <FormField field="username" updateField={this.updateField.bind(this, "username")}/>
                <FormField field="password" updateField={this.updateField.bind(this, "password")}/>
                <FormField field="confirmpassword" updateField={this.updateField.bind(this, "confirmpassword")}/>
                <button onClick={this.submit}>Submit</button>
            </div>
        )
    }
}

class FormRoot extends React.Component {
    constructor(props){
        super(props);
        this.state = {form: "0"};
        this.changeForm = this.changeForm.bind(this);    
    }
    changeForm(e){
        this.setState({form: e.target.value});
    }
    render() {
        console.log(this.state.form);
        if (this.state.form == 0){
            return (
                <div>
                    <h1>Software Developer RoadMap</h1>
                    <h2>Welcome!</h2>
                    <button value = "0" onClick={this.changeForm}>Login</button>
                    <button value = "1" onClick={this.changeForm}>Register</button>
                    <LoginForm />
                </div>
            )
        }
        else{
            return (
                <div>
                    <h1>Software Developer RoadMap</h1>
                    <h2>Create an Account</h2>
                    <button value = "0" onClick={this.changeForm}>Login</button>
                    <button value = "1" onClick={this.changeForm}>Register</button>
                    <RegisterForm />
                </div>
            )
        }
    }
}

ReactDOM.render(
    <FormRoot />,
    document.getElementById("FormRoot")
)