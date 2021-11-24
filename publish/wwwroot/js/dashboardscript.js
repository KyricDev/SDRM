var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { GoalContainer } from "/js/dashboardscriptcollection/homescript.js";
import { AddGoalContainer } from "/js/dashboardscriptcollection/addgoalscript.js";
import { DeleteGoalContainer } from "/js/dashboardscriptcollection/deletegoalscript.js";
import { siteRoot } from "/js/script.js";

var UserGreeting = function (_GoalContainer) {
    _inherits(UserGreeting, _GoalContainer);

    function UserGreeting(props) {
        _classCallCheck(this, UserGreeting);

        var _this = _possibleConstructorReturn(this, (UserGreeting.__proto__ || Object.getPrototypeOf(UserGreeting)).call(this, props));

        _this.state = {
            data: {
                id: "",
                name: "",
                newName: "",
                title: "",
                newTitle: ""
            },
            isEditable: false
        };
        _this.editState = _this.editState.bind(_this);
        _this.confirmEdit = _this.confirmEdit.bind(_this);
        _this.changeName = _this.changeName.bind(_this);
        _this.changeTitle = _this.changeTitle.bind(_this);
        return _this;
    }

    _createClass(UserGreeting, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            fetch(siteRoot + "/api/User/FindUser").then(function (response) {
                return response.json();
            }).then(function (info) {
                _this2.setState({ data: info });
            });
        }
    }, {
        key: "editState",
        value: function editState() {
            var isEditable = this.state.isEditable;

            this.setState({ isEditable: !isEditable });
        }
    }, {
        key: "confirmEdit",
        value: function confirmEdit() {
            var _this3 = this;

            var newData = this.state.data;

            newData.name = this.state.data.newName;
            newData.title = this.state.data.newTitle;

            fetch(siteRoot + "/api/User/UpdateUserInfo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ID: this.state.data.id,
                    Name: this.state.data.name,
                    NewName: this.state.data.newName,
                    Title: this.state.data.title,
                    NewTitle: this.state.data.newTitle
                })
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data == 200) {
                    console.log("Successfully Updated User");
                    _this3.setState({ data: newData });
                    _this3.setState({ isEditable: false });
                } else {
                    console.log("Failed to Update User");
                }
            });
        }
    }, {
        key: "changeName",
        value: function changeName(e) {
            var data = this.state.data;
            data.newName = e.target.value;

            this.setState({ data: data });
        }
    }, {
        key: "changeTitle",
        value: function changeTitle(e) {
            var data = this.state.data;
            data.newTitle = e.target.value;

            this.setState({ data: data });
        }
    }, {
        key: "render",
        value: function render() {
            var title = this.state.data.title;
            if (this.state.data.title == "") {
                title = "Change your Title";
            }

            var newTitle = this.state.data.newTitle;
            if (this.state.data.newTitle == "") {
                newTitle = "Change your Title";
            }

            var UserGreeting = this.state.isEditable ? this.state.data.newTitle == "" ? React.createElement(
                "div",
                { className: "name-container" },
                React.createElement(
                    "div",
                    { className: "flex-row" },
                    React.createElement("input", { type: "text", className: "username editable input-box", value: this.state.data.newName, onChange: this.changeName })
                ),
                React.createElement("input", { type: "text", className: "title editable input-box", placeholder: "Change your Title", onChange: this.changeTitle }),
                React.createElement(
                    "div",
                    { className: "flex-row" },
                    React.createElement(
                        "svg",
                        { className: "button-margin hover-pointer", onClick: this.confirmEdit, width: "18", height: "15", viewBox: "0 0 18 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement(
                            "g",
                            { "clip-path": "url(#clip0_211_10)" },
                            React.createElement("path", { d: "M1.91645 14.9825C0.987611 14.8637 0.244887 14.1799 0.0386213 13.2539C-0.0166617 13.0057 -0.0108009 1.94431 0.0447354 1.7146C0.252141 0.856709 0.888449 0.232968 1.74626 0.04668C2.00004 -0.00843446 12.6031 -0.0182959 12.91 0.0362978C13.7428 0.184491 14.2421 0.58688 14.3232 1.17536C14.3579 1.42762 14.3651 1.41587 13.9342 1.80964C13.5545 2.1567 13.5545 2.1567 13.5318 2.02593C13.4549 1.58244 13.1721 1.25758 12.7508 1.12866C12.5407 1.06439 2.09624 1.06465 1.88757 1.12898C1.48914 1.25171 1.20196 1.56113 1.12049 1.95544C1.0782 2.1601 1.07806 12.8401 1.12034 13.0422C1.20122 13.429 1.4771 13.7352 1.86107 13.8643C2.06835 13.934 12.5239 13.9407 12.7508 13.8713C13.0655 13.775 13.3302 13.5418 13.4573 13.2488C13.5475 13.0409 13.5456 13.1061 13.5463 10.2792C13.547 7.64829 13.547 7.64829 14.0593 7.0987C14.341 6.79643 14.5873 6.53346 14.6065 6.51432C14.6576 6.46364 14.6509 13.0603 14.5998 13.2663C14.3794 14.1534 13.7736 14.7485 12.8744 14.9611C12.7269 14.996 2.18273 15.0167 1.91645 14.9826L1.91645 14.9825ZM8.326 11.4846C8.25726 11.4677 8.18392 11.4358 8.12133 11.3956C8.08649 11.3732 6.97765 10.279 5.65724 8.96398C3.00485 6.32245 3.14169 6.47035 3.14169 6.24533C3.14169 6.00845 3.12729 6.02749 3.84622 5.31414C4.56393 4.602 4.5671 4.59956 4.78769 4.58911C5.04623 4.57686 4.91627 4.46422 6.78341 6.31884C8.43796 7.96229 8.43796 7.96229 11.8971 4.54903C15.715 0.781646 15.4045 1.07032 15.6388 1.07097C15.8555 1.07161 15.8553 1.07129 16.5697 1.77385C17.295 2.48707 17.2969 2.48948 17.2984 2.71071C17.3001 2.96309 17.7047 2.54135 12.9916 7.19953C9.59501 10.5565 8.73233 11.4003 8.66161 11.4347C8.57501 11.4768 8.39993 11.5028 8.326 11.4846V11.4846Z", fill: "black" })
                        ),
                        React.createElement(
                            "defs",
                            null,
                            React.createElement(
                                "clipPath",
                                { id: "clip0_211_10" },
                                React.createElement("rect", { width: "17.3077", height: "15", fill: "white" })
                            )
                        )
                    ),
                    React.createElement(
                        "svg",
                        { className: "button-margin hover-pointer", onClick: this.editState, width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("path", { d: "M7.10115 14.9876C2.61583 14.7257 -0.635392 10.6614 0.105423 6.24241C0.628677 3.12115 3.12176 0.628919 6.24377 0.106147C11.3337 -0.746153 15.7464 3.66178 14.8939 8.74712C14.2682 12.4801 10.8627 15.2073 7.10115 14.9876ZM8.23412 13.6898C10.8891 13.3433 13.0015 11.4388 13.5832 8.86726C13.6921 8.38575 13.7229 8.08367 13.7229 7.49744C13.7229 4.02927 10.9688 1.27649 7.49922 1.27663C2.97355 1.27679 -0.029988 5.90971 1.81174 10.0494C2.73054 12.1146 4.75055 13.5337 7.03225 13.7168C7.22542 13.7323 8.05019 13.7137 8.23412 13.6898ZM4.34528 10.7498C3.92438 10.3288 3.92438 10.3288 5.37111 8.88253C6.81785 7.43622 6.81785 7.43622 5.37111 5.98991C3.92438 4.5436 3.92438 4.5436 4.34528 4.12263C4.76618 3.70166 4.76618 3.70166 6.21311 5.14805C7.66004 6.59443 7.66004 6.59443 9.10681 5.14809C10.5536 3.70175 10.5536 3.70175 10.9746 4.12264C11.3957 4.54354 11.3957 4.54354 9.94888 5.98988C8.50211 7.43623 8.50211 7.43622 9.94888 8.88257C11.3957 10.3289 11.3957 10.3289 10.9746 10.7498C10.5536 11.1707 10.5536 11.1707 9.10681 9.72436C7.66004 8.27801 7.66004 8.27801 6.21311 9.72441C4.76618 11.1708 4.76618 11.1708 4.34528 10.7498V10.7498Z", fill: "black" })
                    )
                )
            ) : React.createElement(
                "div",
                { className: "name-container" },
                React.createElement(
                    "div",
                    { className: "flex-row" },
                    React.createElement("input", { type: "text", className: "username editable input-box", value: this.state.data.newName, onChange: this.changeName })
                ),
                React.createElement("input", { type: "text", className: "title editable input-box", value: this.state.data.newTitle, onChange: this.changeTitle }),
                React.createElement(
                    "div",
                    { className: "flex-row" },
                    React.createElement(
                        "svg",
                        { className: "button-margin hover-pointer", onClick: this.confirmEdit, width: "18", height: "15", viewBox: "0 0 18 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement(
                            "g",
                            { "clip-path": "url(#clip0_211_10)" },
                            React.createElement("path", { d: "M1.91645 14.9825C0.987611 14.8637 0.244887 14.1799 0.0386213 13.2539C-0.0166617 13.0057 -0.0108009 1.94431 0.0447354 1.7146C0.252141 0.856709 0.888449 0.232968 1.74626 0.04668C2.00004 -0.00843446 12.6031 -0.0182959 12.91 0.0362978C13.7428 0.184491 14.2421 0.58688 14.3232 1.17536C14.3579 1.42762 14.3651 1.41587 13.9342 1.80964C13.5545 2.1567 13.5545 2.1567 13.5318 2.02593C13.4549 1.58244 13.1721 1.25758 12.7508 1.12866C12.5407 1.06439 2.09624 1.06465 1.88757 1.12898C1.48914 1.25171 1.20196 1.56113 1.12049 1.95544C1.0782 2.1601 1.07806 12.8401 1.12034 13.0422C1.20122 13.429 1.4771 13.7352 1.86107 13.8643C2.06835 13.934 12.5239 13.9407 12.7508 13.8713C13.0655 13.775 13.3302 13.5418 13.4573 13.2488C13.5475 13.0409 13.5456 13.1061 13.5463 10.2792C13.547 7.64829 13.547 7.64829 14.0593 7.0987C14.341 6.79643 14.5873 6.53346 14.6065 6.51432C14.6576 6.46364 14.6509 13.0603 14.5998 13.2663C14.3794 14.1534 13.7736 14.7485 12.8744 14.9611C12.7269 14.996 2.18273 15.0167 1.91645 14.9826L1.91645 14.9825ZM8.326 11.4846C8.25726 11.4677 8.18392 11.4358 8.12133 11.3956C8.08649 11.3732 6.97765 10.279 5.65724 8.96398C3.00485 6.32245 3.14169 6.47035 3.14169 6.24533C3.14169 6.00845 3.12729 6.02749 3.84622 5.31414C4.56393 4.602 4.5671 4.59956 4.78769 4.58911C5.04623 4.57686 4.91627 4.46422 6.78341 6.31884C8.43796 7.96229 8.43796 7.96229 11.8971 4.54903C15.715 0.781646 15.4045 1.07032 15.6388 1.07097C15.8555 1.07161 15.8553 1.07129 16.5697 1.77385C17.295 2.48707 17.2969 2.48948 17.2984 2.71071C17.3001 2.96309 17.7047 2.54135 12.9916 7.19953C9.59501 10.5565 8.73233 11.4003 8.66161 11.4347C8.57501 11.4768 8.39993 11.5028 8.326 11.4846V11.4846Z", fill: "black" })
                        ),
                        React.createElement(
                            "defs",
                            null,
                            React.createElement(
                                "clipPath",
                                { id: "clip0_211_10" },
                                React.createElement("rect", { width: "17.3077", height: "15", fill: "white" })
                            )
                        )
                    ),
                    React.createElement(
                        "svg",
                        { className: "button-margin hover-pointer", onClick: this.editState, width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("path", { d: "M7.10115 14.9876C2.61583 14.7257 -0.635392 10.6614 0.105423 6.24241C0.628677 3.12115 3.12176 0.628919 6.24377 0.106147C11.3337 -0.746153 15.7464 3.66178 14.8939 8.74712C14.2682 12.4801 10.8627 15.2073 7.10115 14.9876ZM8.23412 13.6898C10.8891 13.3433 13.0015 11.4388 13.5832 8.86726C13.6921 8.38575 13.7229 8.08367 13.7229 7.49744C13.7229 4.02927 10.9688 1.27649 7.49922 1.27663C2.97355 1.27679 -0.029988 5.90971 1.81174 10.0494C2.73054 12.1146 4.75055 13.5337 7.03225 13.7168C7.22542 13.7323 8.05019 13.7137 8.23412 13.6898ZM4.34528 10.7498C3.92438 10.3288 3.92438 10.3288 5.37111 8.88253C6.81785 7.43622 6.81785 7.43622 5.37111 5.98991C3.92438 4.5436 3.92438 4.5436 4.34528 4.12263C4.76618 3.70166 4.76618 3.70166 6.21311 5.14805C7.66004 6.59443 7.66004 6.59443 9.10681 5.14809C10.5536 3.70175 10.5536 3.70175 10.9746 4.12264C11.3957 4.54354 11.3957 4.54354 9.94888 5.98988C8.50211 7.43623 8.50211 7.43622 9.94888 8.88257C11.3957 10.3289 11.3957 10.3289 10.9746 10.7498C10.5536 11.1707 10.5536 11.1707 9.10681 9.72436C7.66004 8.27801 7.66004 8.27801 6.21311 9.72441C4.76618 11.1708 4.76618 11.1708 4.34528 10.7498V10.7498Z", fill: "black" })
                    )
                )
            ) : React.createElement(
                "div",
                { className: "flex-row add-margin" },
                React.createElement(
                    "div",
                    { className: "name-container" },
                    React.createElement(
                        "div",
                        { className: "username" },
                        this.state.data.name
                    ),
                    React.createElement(
                        "div",
                        { className: "title" },
                        title
                    )
                ),
                React.createElement(
                    "svg",
                    { className: "hover-pointer align-middle margin-left", onClick: this.editState, width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement(
                        "g",
                        { "clip-path": "url(#clip0_205_4)" },
                        React.createElement("path", { d: "M1.69591 14.9537C0.950798 14.7882 0.405171 14.3098 0.12365 13.5752C-0.0317901 13.1696 -0.045212 2.28646 0.10923 1.88409C0.408273 1.10501 0.972255 0.612888 1.73376 0.466557C2.20563 0.375883 7.37482 0.400052 7.55125 0.493757C7.86065 0.658077 7.89995 1.04417 7.6328 1.29492C7.5465 1.37593 7.5465 1.37593 4.71799 1.39213C1.50057 1.41056 1.70551 1.39151 1.35969 1.70381C0.95661 2.06778 0.986117 1.59336 0.986117 7.70998C0.986117 13.8472 0.956959 13.3402 1.33009 13.6907C1.70473 14.0427 1.14143 14.0117 7.37421 14.0226C13.7355 14.0337 13.2838 14.0583 13.6726 13.6799C14.0025 13.3589 13.9861 13.5168 14.0043 10.4973C14.0201 7.88205 14.0218 7.82163 14.0861 7.71181C14.268 7.40082 14.7229 7.3953 14.9126 7.70178C15.0174 7.87104 15.0335 12.9606 14.9305 13.3649C14.7459 14.09 14.1906 14.6775 13.4558 14.9252C13.2216 15.0042 2.04498 15.0313 1.69591 14.9537V14.9537ZM3.2752 11.9098C3.22109 11.8862 3.13818 11.8207 3.09097 11.7643C2.91467 11.5539 2.91282 11.5633 3.45134 9.93942C3.94259 8.45807 3.94259 8.45807 8.0935 4.28515C10.3765 1.99004 12.281 0.0867969 12.3258 0.055727C12.426 -0.0137902 12.6828 -0.0193992 12.8041 0.0452805C12.909 0.101246 14.7889 1.99396 14.8397 2.09476C14.8897 2.19394 14.8841 2.41572 14.8291 2.51973C14.7748 2.62229 6.50165 10.9288 6.40632 10.9765C6.27397 11.0427 3.50572 11.9554 3.44098 11.9541C3.40392 11.9534 3.32932 11.9335 3.2752 11.9098L3.2752 11.9098ZM8.90184 7.13201C11.8813 4.13681 11.8813 4.13681 11.3135 3.5665C10.7456 2.9962 10.7456 2.9962 7.77607 5.97859C4.80653 8.96099 4.80653 8.96099 4.58168 9.62383C4.17451 10.8241 4.1112 10.7249 5.07987 10.4052C5.92237 10.1272 5.92237 10.1272 8.90184 7.13201V7.13201ZM13.1272 2.88112C13.4322 2.57731 13.6817 2.31833 13.6817 2.30562C13.6817 2.29291 13.4311 2.03113 13.1248 1.7239C12.5679 1.1653 12.5679 1.1653 12.004 1.73235C11.4401 2.2994 11.4401 2.2994 12.004 2.86645C12.3141 3.17833 12.569 3.4335 12.5703 3.4335C12.5717 3.4335 12.8223 3.18493 13.1272 2.88112V2.88112Z", fill: "black" })
                    ),
                    React.createElement(
                        "defs",
                        null,
                        React.createElement(
                            "clipPath",
                            { id: "clip0_205_4" },
                            React.createElement("rect", { width: "15", height: "15", fill: "white" })
                        )
                    )
                )
            );

            return UserGreeting;
        }
    }]);

    return UserGreeting;
}(GoalContainer);

var NavigationLinks = function (_React$Component) {
    _inherits(NavigationLinks, _React$Component);

    function NavigationLinks(props) {
        _classCallCheck(this, NavigationLinks);

        var _this4 = _possibleConstructorReturn(this, (NavigationLinks.__proto__ || Object.getPrototypeOf(NavigationLinks)).call(this, props));

        _this4.state = {
            navigation: 0
        };
        _this4.changeNavigation = _this4.changeNavigation.bind(_this4);
        _this4.signOut = _this4.signOut.bind(_this4);
        return _this4;
    }

    _createClass(NavigationLinks, [{
        key: "changeNavigation",
        value: function changeNavigation(e) {
            this.props.navigation(e.target.parentElement.value);
        }
    }, {
        key: "signOut",
        value: function signOut() {
            fetch(siteRoot + "/api/User/SignOut", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function () {
                return window.location.assign(siteRoot);
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "banner-container" },
                React.createElement(
                    "div",
                    { className: "nav-container" },
                    React.createElement(
                        "ul",
                        null,
                        React.createElement(
                            "li",
                            { value: 0 },
                            React.createElement("div", { onClick: this.changeNavigation, className: "hidden-box" }),
                            React.createElement(
                                "svg",
                                { width: "36", height: "36", viewBox: "0 0 36 36", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                React.createElement("path", { d: "M6.59102 35.6981C6.38787 35.4998 6.31184 35.3987 6.2941 35.303C6.24476 35.0369 6.19551 28.2166 6.20572 23.0635L6.21632 17.7156L6.29856 17.5487C6.71936 16.6949 8.11259 16.7111 8.33535 17.5724C8.38369 17.7593 8.43356 23.4943 8.4372 29.2843L8.44 33.7593H10.6764H12.9128L12.9367 33.2906C12.9498 33.0329 12.9616 30.9943 12.9629 28.7605C12.966 23.0979 12.9622 23.1626 13.3105 22.8226C13.5882 22.5515 13.2945 22.5673 18.0515 22.5673C22.8819 22.5673 22.4326 22.5376 22.7511 22.8781C23.0239 23.1697 23.0555 24.0388 23.0656 31.5448L23.0686 33.7593H25.3046H27.5406L27.565 30.4452C27.5785 28.6225 27.5902 25.3848 27.5911 23.2504C27.593 18.5946 27.6172 17.6146 27.7345 17.4248C28.2652 16.5661 29.6209 16.8165 29.7216 17.7918C29.7716 18.2771 29.8042 28.6144 29.7669 32.1604C29.7298 35.6817 29.7635 35.3731 29.3763 35.7349L29.1305 35.9646H17.9973H6.86409L6.59102 35.6981ZM20.8265 29.2567V24.7542H18.0148H15.203V29.2567V33.7593H18.0148H20.8265V29.2567ZM0.827341 19.0799C0.231729 18.8671 -0.157204 18.1947 0.061712 17.7564C0.411675 17.0557 17.2285 0.182659 17.7056 0.0535801C18.3282 -0.11485 18.4032 -0.0564713 21.3093 2.85717L23.0234 4.57569L23.0462 3.37189C23.0991 0.576365 23.1266 0.432866 23.6651 0.1387C23.7949 0.067816 28.7857 0.0344246 29.1057 0.102299C29.2639 0.135831 29.6208 0.45915 29.6882 0.629919C29.7644 0.823087 29.7907 2.39649 29.7928 6.88886L29.7948 11.3523L32.6005 14.1664C35.9556 17.5314 36.0453 17.6354 35.9911 18.0983C35.9042 18.841 35.0572 19.3649 34.52 19.0082C33.9379 18.6218 34.0009 18.6836 21.6451 6.35906L17.998 2.72115L10.6185 10.0915C0.901781 19.7964 1.44272 19.2998 0.827341 19.0799ZM27.5527 5.67823V2.25999H26.4317H25.3107V4.56616V6.87233L26.4223 7.9844C27.0337 8.59604 27.5382 9.09647 27.5433 9.09647C27.5485 9.09647 27.5527 7.55826 27.5527 5.67823Z", fill: "#F9DBBD" })
                            ),
                            React.createElement(
                                "div",
                                null,
                                "Home"
                            )
                        ),
                        React.createElement(
                            "li",
                            { value: 1 },
                            React.createElement("div", { onClick: this.changeNavigation, className: "hidden-box" }),
                            React.createElement(
                                "svg",
                                { width: "36", height: "36", viewBox: "0 0 36 36", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                React.createElement("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M20.4 15.6V0H15.6L15.6 15.6H0V20.4H15.6L15.6 36H20.4V20.4H36V15.6H20.4Z", fill: "#F9DBBD" })
                            ),
                            React.createElement(
                                "div",
                                null,
                                "Add Goal"
                            )
                        ),
                        React.createElement(
                            "li",
                            { value: 2 },
                            React.createElement("div", { onClick: this.changeNavigation, className: "hidden-box" }),
                            React.createElement(
                                "svg",
                                { width: "36", height: "36", viewBox: "0 0 36 36", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                React.createElement("path", { d: "M7.01996 35.9637C6.24908 35.8635 5.49007 35.4953 4.90047 34.9354C4.28969 34.3555 3.90894 33.668 3.7377 32.8359L3.65987 32.4577L3.68641 21.2894C3.70101 15.1469 3.70059 9.54719 3.68548 8.84567L3.65799 7.57018L2.12495 7.55985L0.591908 7.54952L0.412065 7.43833C-0.0655379 7.14307 -0.14138 6.49692 0.255051 6.10063C0.532258 5.82352 0.113587 5.84121 6.3927 5.84121H12.0089V4.4111C12.0089 3.60969 12.026 2.85465 12.0478 2.69361C12.0967 2.33289 12.29 1.75741 12.4536 1.48562C12.9734 0.622112 13.8817 0.133324 15.1459 0.0369198C15.4115 0.0166632 16.8298 4.98028e-05 18.2976 6.44011e-07C21.0935 -9.28357e-05 21.297 0.00977856 21.7739 0.168618C22.8461 0.525726 23.5912 1.43713 23.8585 2.7185C23.944 3.1284 24.0075 4.31592 23.9544 4.51289C23.8626 4.85364 23.5 5.11895 23.126 5.11895C22.8547 5.11895 22.6543 5.02427 22.47 4.80904C22.3078 4.61959 22.2732 4.46317 22.2269 3.71042C22.2077 3.39723 22.1656 3.0418 22.1335 2.92056C21.9912 2.38345 21.7296 2.0335 21.3338 1.85074L21.1047 1.74495H18.0911C14.9311 1.74495 14.9413 1.74448 14.4948 1.91147C14.2135 2.01667 13.9579 2.26889 13.8429 2.55457C13.7555 2.77174 13.7547 2.7867 13.7436 4.30741L13.7324 5.84121H24.4772C36.4779 5.84121 35.4585 5.81723 35.7448 6.10629C35.9838 6.34761 36.0605 6.67275 35.9513 6.98212C35.8687 7.21596 35.7386 7.36491 35.5232 7.47224L35.3312 7.56789H20.3415H5.35179L5.3717 7.90771C5.41247 8.60343 5.43257 19.7388 5.40401 25.8082C5.38775 29.2634 5.38682 32.197 5.40198 32.3273C5.46246 32.8486 5.74643 33.3973 6.13193 33.7376C6.37357 33.9509 6.84024 34.183 7.13945 34.2386C7.29927 34.2682 10.3283 34.2765 18.1463 34.2687L28.9326 34.2579L29.1577 34.1734C29.7956 33.934 30.2795 33.435 30.5247 32.7639L30.6232 32.4944L30.6416 21.6172L30.6599 10.7399L30.7712 10.5601C30.8401 10.4486 30.9508 10.338 31.0623 10.2691C31.2186 10.1724 31.2766 10.1579 31.5052 10.1579C31.7338 10.1579 31.7917 10.1724 31.9481 10.2691C32.0596 10.338 32.1703 10.4486 32.2392 10.5601L32.3505 10.7399L32.3615 21.4519C32.3696 29.369 32.3614 32.2548 32.3301 32.5126C32.1473 34.0188 31.1595 35.2732 29.7635 35.772C29.0779 36.017 29.8105 36.0029 17.9809 35.998C12.0787 35.9956 7.1463 35.9801 7.01996 35.9637ZM13.4973 29.0632C13.2412 28.9977 13.038 28.8328 12.9043 28.5819C12.8382 28.4577 12.8358 28.2163 12.8358 21.5988V14.7444L12.947 14.5645C13.3107 13.9765 14.1689 14.0184 14.4577 14.6384L14.544 14.8236L14.5441 21.5833C14.5442 26.2366 14.5321 28.3868 14.5053 28.4834C14.4582 28.6529 14.2492 28.893 14.0686 28.9852C13.9097 29.0662 13.6484 29.1019 13.4973 29.0632ZM22.0423 29.0242C21.9105 28.9787 21.7936 28.9042 21.7045 28.8087C21.4343 28.5192 21.4517 29.0429 21.4625 21.5263C21.4719 14.9927 21.4743 14.7826 21.5419 14.6465C21.8692 13.9878 22.788 13.98 23.1044 14.6332L23.1811 14.7917V21.6061V28.4205L23.0874 28.6084C22.9744 28.8352 22.7898 28.9839 22.5414 29.0483C22.3067 29.1091 22.2854 29.1081 22.0423 29.0242Z", fill: "#F9DBBD" })
                            ),
                            React.createElement(
                                "div",
                                null,
                                "Delete Goal"
                            )
                        )
                    ),
                    React.createElement(
                        "ul",
                        null,
                        React.createElement(
                            "li",
                            { onClick: this.signOut },
                            React.createElement(
                                "svg",
                                { width: "35", height: "38", viewBox: "0 0 35 38", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                React.createElement("rect", { x: "15.8308", width: "3.23077", height: "20.7846", rx: "1.61538", fill: "#F9DBBD" }),
                                React.createElement("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M25.5939 5.67428C25.2226 6.31728 25.4462 7.13463 26.052 7.56392C29.8372 10.2463 32.3077 14.6616 32.3077 19.6538C32.3077 27.8319 25.678 34.4615 17.5 34.4615C9.32191 34.4615 2.69228 27.8319 2.69228 19.6538C2.69228 14.6309 5.19323 10.1921 9.01782 7.5147C9.62849 7.08721 9.85574 6.26646 9.48302 5.6209C9.11223 4.97868 8.28827 4.75324 7.67494 5.1701C3.04275 8.31848 0 13.6308 0 19.6538C0 29.3188 7.83502 37.1538 17.5 37.1538C27.165 37.1538 35 29.3188 35 19.6538C35 13.6671 31.9938 8.38244 27.4085 5.22718C26.795 4.80499 25.9662 5.02931 25.5939 5.67428Z", fill: "#F9DBBD" })
                            ),
                            React.createElement(
                                "div",
                                null,
                                "Sign Out"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return NavigationLinks;
}(React.Component);

var DashboardRoot = function (_React$Component2) {
    _inherits(DashboardRoot, _React$Component2);

    function DashboardRoot(props) {
        _classCallCheck(this, DashboardRoot);

        var _this5 = _possibleConstructorReturn(this, (DashboardRoot.__proto__ || Object.getPrototypeOf(DashboardRoot)).call(this, props));

        _this5.state = {
            navigation: 0
        };
        _this5.changeNavigation = _this5.changeNavigation.bind(_this5);
        return _this5;
    }

    _createClass(DashboardRoot, [{
        key: "componentDidMount",
        value: function componentDidMount() {}
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {}
    }, {
        key: "changeNavigation",
        value: function changeNavigation(e) {
            this.setState({ navigation: e });
        }
    }, {
        key: "render",
        value: function render() {
            var navigation = this.state.navigation;

            switch (navigation) {
                case 0:
                    return React.createElement(
                        "div",
                        null,
                        React.createElement(NavigationLinks, { navigation: this.changeNavigation }),
                        React.createElement(UserGreeting, null),
                        React.createElement(GoalContainer, null)
                    );
                    break;
                case 1:
                    return React.createElement(
                        "div",
                        null,
                        React.createElement(NavigationLinks, { navigation: this.changeNavigation }),
                        React.createElement(UserGreeting, null),
                        React.createElement(AddGoalContainer, null)
                    );
                    break;
                case 2:
                    return React.createElement(
                        "div",
                        null,
                        React.createElement(NavigationLinks, { navigation: this.changeNavigation }),
                        React.createElement(UserGreeting, null),
                        React.createElement(DeleteGoalContainer, null)
                    );
                    break;
                default:
                    return React.createElement(
                        "div",
                        null,
                        React.createElement(NavigationLinks, { navigation: this.changeNavigation }),
                        React.createElement(UserGreeting, null),
                        React.createElement(AddGoalContainer, null)
                    );
                    break;
            }
        }
    }]);

    return DashboardRoot;
}(React.Component);

ReactDOM.render(React.createElement(DashboardRoot, null), document.getElementById("root"));