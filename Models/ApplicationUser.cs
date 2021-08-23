using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace SDRM.Models{
    public class ApplicationUser : IdentityUser{
        public ApplicationUser(string username) : base(username){ 
            this.UserName = username;
        }
        public ApplicationUser(){
        }
    }
}