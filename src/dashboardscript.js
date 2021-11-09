import {GoalContainer} from "/js/dashboardscriptcollection/homescript.js";
import {AddGoalContainer} from "/js/dashboardscriptcollection/addgoalscript.js";
import {siteRoot} from "/js/script.js";

class UserGreeting extends GoalContainer {
    render() {
        return(
            <div className="name-container">
                <div className="username">{"User N. Ame"}</div>
                <div className="title">{"Software Developer"}</div>
            </div>
        )
    }
}
class NavigationLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navigation: 0
        };
        this.changeNavigation = this.changeNavigation.bind(this);
        this.signOut = this.signOut.bind(this);
    }
    changeNavigation(e){
        console.log("Navigation: " + e.target.parentElement.value);

        this.props.navigation(e.target.parentElement.value);
    }
    signOut(){
        fetch(siteRoot + "/api/User/SignOut", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            }
        })
            .then(() => window.location.assign(siteRoot));
    }
    render() {
        return(
            <div className="banner-container">
                <div className="nav-container">
                    <ul>
                        <li value={0} >
                            <div onClick={this.changeNavigation} className="hidden-box" ></div>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.59102 35.6981C6.38787 35.4998 6.31184 35.3987 6.2941 35.303C6.24476 35.0369 6.19551 28.2166 6.20572 23.0635L6.21632 17.7156L6.29856 17.5487C6.71936 16.6949 8.11259 16.7111 8.33535 17.5724C8.38369 17.7593 8.43356 23.4943 8.4372 29.2843L8.44 33.7593H10.6764H12.9128L12.9367 33.2906C12.9498 33.0329 12.9616 30.9943 12.9629 28.7605C12.966 23.0979 12.9622 23.1626 13.3105 22.8226C13.5882 22.5515 13.2945 22.5673 18.0515 22.5673C22.8819 22.5673 22.4326 22.5376 22.7511 22.8781C23.0239 23.1697 23.0555 24.0388 23.0656 31.5448L23.0686 33.7593H25.3046H27.5406L27.565 30.4452C27.5785 28.6225 27.5902 25.3848 27.5911 23.2504C27.593 18.5946 27.6172 17.6146 27.7345 17.4248C28.2652 16.5661 29.6209 16.8165 29.7216 17.7918C29.7716 18.2771 29.8042 28.6144 29.7669 32.1604C29.7298 35.6817 29.7635 35.3731 29.3763 35.7349L29.1305 35.9646H17.9973H6.86409L6.59102 35.6981ZM20.8265 29.2567V24.7542H18.0148H15.203V29.2567V33.7593H18.0148H20.8265V29.2567ZM0.827341 19.0799C0.231729 18.8671 -0.157204 18.1947 0.061712 17.7564C0.411675 17.0557 17.2285 0.182659 17.7056 0.0535801C18.3282 -0.11485 18.4032 -0.0564713 21.3093 2.85717L23.0234 4.57569L23.0462 3.37189C23.0991 0.576365 23.1266 0.432866 23.6651 0.1387C23.7949 0.067816 28.7857 0.0344246 29.1057 0.102299C29.2639 0.135831 29.6208 0.45915 29.6882 0.629919C29.7644 0.823087 29.7907 2.39649 29.7928 6.88886L29.7948 11.3523L32.6005 14.1664C35.9556 17.5314 36.0453 17.6354 35.9911 18.0983C35.9042 18.841 35.0572 19.3649 34.52 19.0082C33.9379 18.6218 34.0009 18.6836 21.6451 6.35906L17.998 2.72115L10.6185 10.0915C0.901781 19.7964 1.44272 19.2998 0.827341 19.0799ZM27.5527 5.67823V2.25999H26.4317H25.3107V4.56616V6.87233L26.4223 7.9844C27.0337 8.59604 27.5382 9.09647 27.5433 9.09647C27.5485 9.09647 27.5527 7.55826 27.5527 5.67823Z" fill="#F9DBBD"/>
                            </svg>
                            <div>Home</div>
                        </li>
                        <li value={1} >
                            <div onClick={this.changeNavigation} className="hidden-box" ></div>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M20.4 15.6V0H15.6L15.6 15.6H0V20.4H15.6L15.6 36H20.4V20.4H36V15.6H20.4Z" fill="#F9DBBD"/>
                            </svg>
                            <div>Add Goal</div>
                        </li>
                        <li value={2} >
                            <div onClick={this.changeNavigation} className="hidden-box" ></div>
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.01996 35.9637C6.24908 35.8635 5.49007 35.4953 4.90047 34.9354C4.28969 34.3555 3.90894 33.668 3.7377 32.8359L3.65987 32.4577L3.68641 21.2894C3.70101 15.1469 3.70059 9.54719 3.68548 8.84567L3.65799 7.57018L2.12495 7.55985L0.591908 7.54952L0.412065 7.43833C-0.0655379 7.14307 -0.14138 6.49692 0.255051 6.10063C0.532258 5.82352 0.113587 5.84121 6.3927 5.84121H12.0089V4.4111C12.0089 3.60969 12.026 2.85465 12.0478 2.69361C12.0967 2.33289 12.29 1.75741 12.4536 1.48562C12.9734 0.622112 13.8817 0.133324 15.1459 0.0369198C15.4115 0.0166632 16.8298 4.98028e-05 18.2976 6.44011e-07C21.0935 -9.28357e-05 21.297 0.00977856 21.7739 0.168618C22.8461 0.525726 23.5912 1.43713 23.8585 2.7185C23.944 3.1284 24.0075 4.31592 23.9544 4.51289C23.8626 4.85364 23.5 5.11895 23.126 5.11895C22.8547 5.11895 22.6543 5.02427 22.47 4.80904C22.3078 4.61959 22.2732 4.46317 22.2269 3.71042C22.2077 3.39723 22.1656 3.0418 22.1335 2.92056C21.9912 2.38345 21.7296 2.0335 21.3338 1.85074L21.1047 1.74495H18.0911C14.9311 1.74495 14.9413 1.74448 14.4948 1.91147C14.2135 2.01667 13.9579 2.26889 13.8429 2.55457C13.7555 2.77174 13.7547 2.7867 13.7436 4.30741L13.7324 5.84121H24.4772C36.4779 5.84121 35.4585 5.81723 35.7448 6.10629C35.9838 6.34761 36.0605 6.67275 35.9513 6.98212C35.8687 7.21596 35.7386 7.36491 35.5232 7.47224L35.3312 7.56789H20.3415H5.35179L5.3717 7.90771C5.41247 8.60343 5.43257 19.7388 5.40401 25.8082C5.38775 29.2634 5.38682 32.197 5.40198 32.3273C5.46246 32.8486 5.74643 33.3973 6.13193 33.7376C6.37357 33.9509 6.84024 34.183 7.13945 34.2386C7.29927 34.2682 10.3283 34.2765 18.1463 34.2687L28.9326 34.2579L29.1577 34.1734C29.7956 33.934 30.2795 33.435 30.5247 32.7639L30.6232 32.4944L30.6416 21.6172L30.6599 10.7399L30.7712 10.5601C30.8401 10.4486 30.9508 10.338 31.0623 10.2691C31.2186 10.1724 31.2766 10.1579 31.5052 10.1579C31.7338 10.1579 31.7917 10.1724 31.9481 10.2691C32.0596 10.338 32.1703 10.4486 32.2392 10.5601L32.3505 10.7399L32.3615 21.4519C32.3696 29.369 32.3614 32.2548 32.3301 32.5126C32.1473 34.0188 31.1595 35.2732 29.7635 35.772C29.0779 36.017 29.8105 36.0029 17.9809 35.998C12.0787 35.9956 7.1463 35.9801 7.01996 35.9637ZM13.4973 29.0632C13.2412 28.9977 13.038 28.8328 12.9043 28.5819C12.8382 28.4577 12.8358 28.2163 12.8358 21.5988V14.7444L12.947 14.5645C13.3107 13.9765 14.1689 14.0184 14.4577 14.6384L14.544 14.8236L14.5441 21.5833C14.5442 26.2366 14.5321 28.3868 14.5053 28.4834C14.4582 28.6529 14.2492 28.893 14.0686 28.9852C13.9097 29.0662 13.6484 29.1019 13.4973 29.0632ZM22.0423 29.0242C21.9105 28.9787 21.7936 28.9042 21.7045 28.8087C21.4343 28.5192 21.4517 29.0429 21.4625 21.5263C21.4719 14.9927 21.4743 14.7826 21.5419 14.6465C21.8692 13.9878 22.788 13.98 23.1044 14.6332L23.1811 14.7917V21.6061V28.4205L23.0874 28.6084C22.9744 28.8352 22.7898 28.9839 22.5414 29.0483C22.3067 29.1091 22.2854 29.1081 22.0423 29.0242Z" fill="#F9DBBD"/>
                            </svg>
                            <div>Delete Goal</div>
                        </li>
                    </ul>
                    <ul>    
                        <li onClick={this.signOut} >
                            <svg width="35" height="38" viewBox="0 0 35 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="15.8308" width="3.23077" height="20.7846" rx="1.61538" fill="#F9DBBD"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.5939 5.67428C25.2226 6.31728 25.4462 7.13463 26.052 7.56392C29.8372 10.2463 32.3077 14.6616 32.3077 19.6538C32.3077 27.8319 25.678 34.4615 17.5 34.4615C9.32191 34.4615 2.69228 27.8319 2.69228 19.6538C2.69228 14.6309 5.19323 10.1921 9.01782 7.5147C9.62849 7.08721 9.85574 6.26646 9.48302 5.6209C9.11223 4.97868 8.28827 4.75324 7.67494 5.1701C3.04275 8.31848 0 13.6308 0 19.6538C0 29.3188 7.83502 37.1538 17.5 37.1538C27.165 37.1538 35 29.3188 35 19.6538C35 13.6671 31.9938 8.38244 27.4085 5.22718C26.795 4.80499 25.9662 5.02931 25.5939 5.67428Z" fill="#F9DBBD"/>
                            </svg>
                            <div>Sign Out</div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

class DashboardRoot extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                username: ""
            },
            navigation: 0
        };
        this.changeNavigation = this.changeNavigation.bind(this);
    }
    componentDidMount(){
        console.log("Dashboard DidMount");

        fetch(siteRoot + "/api/User/FindUser")
            .then(response => response.json())
            .then(info => {
                console.log(info);
                this.setState({data: info});
            });
    }
    componentDidUpdate(){
        console.log("Dashboard DidUpdate");
    }
    changeNavigation(e){
        this.setState({navigation: e});
    }
    render(){
        let navigation = this.state.navigation;
        
        switch(navigation){
            case 0:
                return(
                    <div>
                        <NavigationLinks navigation={this.changeNavigation} />
                        <UserGreeting />
                        <GoalContainer isdeletegoal={false} />
                    </div>
                )
                break;
            case 1:
                return(
                    <div>
                        <NavigationLinks navigation={this.changeNavigation} />
                        <UserGreeting />
                        <AddGoalContainer />
                    </div>
                )
                break;
            case 2:
                return(
                    <div>
                        <NavigationLinks navigation={this.changeNavigation} />
                        <UserGreeting />
                        <GoalContainer isdeletegoal={true} />
                    </div>
                )   
                break;
            default:
                return(
                    <div>
                        <NavigationLinks navigation={this.changeNavigation} />
                        <UserGreeting />
                        <AddGoalContainer />
                    </div>
                )
                break;  
        }
    }
}

ReactDOM.render(
    <DashboardRoot />,
    document.getElementById("root")
)