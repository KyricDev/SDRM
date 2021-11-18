import { FormField } from "/js/script.js";
import { siteRoot } from "/js/script.js";

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
                      },
                      buttonState: false
                    };
        this.submit = this.submit.bind(this);
    }
    updateField(field, e){
        if (field == "username"){
            this.setState({username: e}, () => {
                if (this.state.username < 1 || this.state.password < 1){
                    this.setState({buttonState: false});
                }
                else{
                    this.setState({buttonState: true});
                }
            });
        }
        else if (field == "password"){
            this.setState({password: e}, () => {
                if (this.state.username < 1 || this.state.password < 1){
                    this.setState({buttonState: false});
                }
                else{
                    this.setState({buttonState: true});
                }
            });
        }
    }
    submit(){
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
        })
            .then(response => response.json())
            .then(info => {
                console.log(info);
                this.setState({data: info});
            })
            .then(() => {
                if (this.state.data.status == 200){
                    console.log("Login Success. Routing . . .");
                    window.location.assign(siteRoot + "/UserView/Dashboard");
                }
                else{
                    let newData = this.state.data;
                    newData.status = "Incorrect Username or Password";
                    this.setState({data: newData});
                }
            })
    }
    render() {
        let button = <div className="button-submit">
                        <button className="button-form enabled" onClick={this.submit}>Sign In</button>
                     </div>

        if (!this.state.buttonState){
            button = <div className="button-submit">
                        <button className="button-form disabled" onClick={this.submit} disabled>Sign In</button>
                     </div>
        }
        
        let accountStatus = ""
        if (this.props.isAccountCreated == true){
            accountStatus = "Account Successfully Created!"
        }

        let status = this.state.data.status;
        if (this.state.data.status != 200){
            status = "";
        }

        return(
            <div className="form" >
                <div className="greeting">Welcome! Login to Access your RoadMap</div>
                <FormField field="username" updateField={this.updateField.bind(this, "username")}/>
                <FormField field="password" updateField={this.updateField.bind(this, "password")}/>
                <div className="status">
                    {status}
                    {accountStatus}
                </div>
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
                      },
                      buttonState: false
                     }
                     ;
        this.updateField = this.updateField.bind(this);
        this.submit = this.submit.bind(this);
    }
    updateField(field, e){
        if (field == "username"){
            this.setState({username: e}, () => { 
                if (this.state.username.length <  1 || 
                    this.state.password.length < 5 || 
                    this.state.confirmpassword.length < 5 || 
                    this.state.password != this.state.confirmpassword)
                    {
                    this.setState({buttonState: false}, () => {
                        let newStatus = "";
                        if (this.state.username.length < 1){
                            newStatus += "No Username Entered. "
                        }
                        if (this.state.password.length < 5 || this.state.confirmpassword.length < 5){
                            newStatus += "Password Length too Short. "
                        }
                        if (this.state.password != this.state.confirmpassword){
                            newStatus += "Passwords do not Match. "
                        }

                        let newData = this.state.data;
                        newData.status = newStatus;

                        this.setState({data: newData});});
                }
                else{
                    this.setState({buttonState: true}, () => {
                        let newStatus = "";
                        if (this.state.username.length < 1){
                            newStatus += "No Username Entered. "
                        }
                        if (this.state.password.length < 5 || this.state.confirmpassword.length < 5){
                            newStatus += "Password Length too Short. "
                        }
                        if (this.state.password != this.state.confirmpassword){
                            newStatus += "Passwords do not Match. "
                        }

                        let newData = this.state.data;
                        newData.status = newStatus;

                        this.setState({data: newData});});
                }
            });
        }
        else if (field == "password"){
            this.setState({password: e}, () => { 
                if (this.state.username.length <  1 || 
                    this.state.password.length < 5 || 
                    this.state.confirmpassword.length < 5 || 
                    this.state.password != this.state.confirmpassword)
                    {
                    this.setState({buttonState: false}, () => {
                        let newStatus = "";
                        if (this.state.username.length < 1){
                            newStatus += "No Username Entered. "
                        }
                        if (this.state.password.length < 5 || this.state.confirmpassword.length < 5){
                            newStatus += "Password Length too Short. "
                        }
                        if (this.state.password != this.state.confirmpassword){
                            newStatus += "Passwords do not Match. "
                        }

                        let newData = this.state.data;
                        newData.status = newStatus;

                        this.setState({data: newData});
                    });
                }
                else{
                    this.setState({buttonState: true}, () => {
                        let newStatus = "";
                        if (this.state.username.length < 1){
                            newStatus += "No Username Entered. "
                        }
                        if (this.state.password.length < 5 || this.state.confirmpassword.length < 5){
                            newStatus += "Password Length too Short. "
                        }
                        if (this.state.password != this.state.confirmpassword){
                            newStatus += "Passwords do not Match. "
                        }

                        let newData = this.state.data;
                        newData.status = newStatus;

                        this.setState({data: newData});});
                }
            });
        }
        else{
            this.setState({confirmpassword: e}, () => {
                if (this.state.username.length <  1 || 
                    this.state.password.length < 5 || 
                    this.state.confirmpassword.length < 5 || 
                    this.state.password != this.state.confirmpassword)
                    {
                    this.setState({buttonState: false}, () => {
                        let newStatus = "";
                        if (this.state.username.length < 1){
                            newStatus += "No Username Entered. "
                        }
                        if (this.state.password.length < 5 || this.state.confirmpassword.length < 5){
                            newStatus += "Password Length too Short. "
                        }
                        if (this.state.password != this.state.confirmpassword){
                            newStatus += "Passwords do not Match. "
                        }

                        let newData = this.state.data;
                        newData.status = newStatus;

                        this.setState({data: newData});
                    });
                }
                else{
                    this.setState({buttonState: true}, () => {
                        let newStatus = "";
                        if (this.state.username.length < 1){
                            newStatus += "No Username Entered. "
                        }
                        if (this.state.password.length < 5 || this.state.confirmpassword.length < 5){
                            newStatus += "Password Length too Short. "
                        }
                        if (this.state.password != this.state.confirmpassword){
                            newStatus += "Passwords do not Match. "
                        }

                        let newData = this.state.data;
                        newData.status = newStatus;

                        this.setState({data: newData});});
                }
            });
        }
    }
    submit(){
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
        })
            .then(response => response.json())
            .then(info => {
                console.log(info);
                if (info.status == 200){
                    this.props.changeNavigation("0");
                }
                else{
                    let newData = this.state.data;
                    newData.status = "Username Already Exists. Please Try Again.";
                    this.setState({data: newData});
                }
            });
    }
    render(){
        let button = <div className="button-submit">
                        <button className="button-form enabled" onClick={this.submit}>Create Account</button>
                     </div>

        if (!this.state.buttonState){
            button = <div className="button-submit">
                        <button className="button-form disabled" onClick={this.submit} disabled>Create Account</button>
                     </div>
        }

        return(
            <div className="form">
                <div className="greeting">Don't Have an Account? Creating One is Free!</div>
                <FormField field="username" updateField={this.updateField.bind(this, "username")}/>
                <FormField field="password" updateField={this.updateField.bind(this, "password")}/>
                <FormField field="confirmpassword" updateField={this.updateField.bind(this, "confirmpassword")}/>
                <div className="status">
                    {this.state.data.status}
                </div>
                {button}
            </div>
        )
    }
}

class FormRoot extends React.Component {
    constructor(props){
        super(props);
        this.state = {form: "0", 
                      isAccountCreated: false
                    };
        this.changeForm = this.changeForm.bind(this);    
        this.changeNavigation = this.changeNavigation.bind(this);
        this.resetAccountStatus = this.resetAccountStatus.bind(this);
    }
    changeForm(e){
        this.setState({form: e.target.value});
    }
    changeNavigation(e){
        this.setState({isAccountCreated: true}, () => this.setState({form: e}));
    }
    resetAccountStatus(e){
        this.setState({isAccountCreated: false});
    }
    render() {
        console.log(this.state.form);
        if (this.state.form == 0){
            return (
                <div className="container-parent">
                    <div className="container-left">
                        <h1 className="title-sdrm">Software Developer RoadMap</h1>
                        <h2 className="tagline-sdrm">Welcome!</h2>
                    </div>
                    <div className="container-right">
                        <div className="container-button">
                            <div className="button-click button-login">
                                <button value = "0" onClick={this.changeForm}>Login</button>
                            </div>
                            <div className="button-unclick button-register">
                                <button value = "1" onClick={this.changeForm}>Register</button>
                            </div>
                        </div>
                        <LoginForm isAccountCreated={this.state.isAccountCreated} resetAccountStatus={this.resetAccountStatus} />
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="container-parent">
                    <div className="container-left">
                        <h1 className="title-sdrm">Software Developer RoadMap</h1>
                        <h2 className="tagline-sdrm">"Keeping you on track"</h2>
                    </div>
                    <div className="container-right">
                        <div className="container-button">
                            <div className="button-unclick button-login">
                                <button value = "0" onClick={this.changeForm}>Login</button>
                            </div>
                            <div className="button-click button-register">
                                <button value = "1" onClick={this.changeForm}>Register</button>
                            </div>
                        </div>
                        <RegisterForm changeNavigation={this.changeNavigation} />
                    </div>
                </div>
            )
        }
    }
}

ReactDOM.render(
    <FormRoot />,
    document.getElementById("FormRoot")
)