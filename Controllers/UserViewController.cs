using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Linq;
using SDRM.Models;
using SDRM.Data;

namespace SDRM.Controllers{
    [Route("")]
    [Route("[controller]")]
    public class UserViewController   :   Controller{
        private readonly ILogger<UserViewController> _logger;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager; 
        public UserViewController(ILogger<UserViewController> logger,
                                  UserManager<ApplicationUser> userManager,
                                  SignInManager<ApplicationUser> signInManager){
            _logger = logger;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [AllowAnonymous]
        [HttpGet]
        public IActionResult Index(){
            _logger.LogInformation($"Get: Login Page");

            return View("Form");
        }
        
        [HttpGet]
        [Route("[controller]/[action]")]
        public IActionResult Dashboard(){
            _logger.LogInformation($"Get: Dashboard");
            
            return View("Dashboard");
        }

        [AllowAnonymous]
        [HttpPost("LoginUser")]
        public async Task<ActionResult> Login(string username, 
                                              string password){
            _logger.LogInformation($"Username:{username}  | Password{password}");
            
            if (username == null || password == null){
                _logger.LogInformation("Empty Field");
                return BadRequest();
            }

            var user = await _userManager.Users.Where(u => u.UserName == username).FirstOrDefaultAsync();

            if (user == null){
                _logger.LogInformation("user not found");
                return BadRequest();
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
        
            if (result.Succeeded){
                _logger.LogInformation($"{user} signed in");
                await _signInManager.SignInAsync(user, true, null);
            
                return View("Form");
            }

            _logger.LogInformation("sign in failed");

            return BadRequest();
        }
    }
}