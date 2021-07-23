using Microsoft.AspNetCore.Identity;

namespace SDRM.Models{
    public class ApplicationUser : IdentityUser{
        public ApplicationUser(string username) : base(username){ 
            this.UserName = username;
        }
    }
}