using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System.Threading.Tasks;
using SDRM.Models;
using SDRM.Data;

namespace SDRM.Controllers{
    [AllowAnonymous]
    public class UserViewController   :   Controller{
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public UserViewController(UserManager<ApplicationUser>   userManager, 
                                  SignInManager<ApplicationUser> signInManager){
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpGet]
        [ActionName("Login")]
        public IActionResult Login(){
            return View();
        }

        [HttpPost]
        [ActionName("Login")]
        public IActionResult PostLogin(string username, 
                                       string password){
            _signInManager.PasswordSignInAsync(username, password, true, false);

            return View();
        }

        [HttpGet]
        [ActionName("Register")]
        public IActionResult Register(){
            return View();
        }       

        [HttpPost]
        [ActionName("Register")]
        public async Task<IActionResult> PostRegister(string username, 
                                                      string password, 
                                                      string confirmpassword){
            var user = new ApplicationUser(username);
           
            await _userManager.CreateAsync(user);
            
            return View();
        }
    }
}