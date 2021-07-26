using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using SDRM.Models;
using SDRM.Data;

namespace SDRM.Controllers{
    [Route("")]
    [Route("user")]
    [AllowAnonymous]
    public class UserViewController   :   Controller{
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ILogger<UserViewController> _logger;
        private readonly ApplicationUserContext _context;

        public UserViewController(UserManager<ApplicationUser>   userManager, 
                                  SignInManager<ApplicationUser> signInManager,
                                  ILogger<UserViewController> logger,
                                  ApplicationUserContext context){
            _userManager = userManager;
            _signInManager = signInManager;
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("login")]
        [Route("/")]
        [Route("/user")]
        public IActionResult Login(){
            _logger.LogInformation($"Get: Login Page");

            return View();
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> PostLogin(string username, 
                                                   string password){
            var result = await _signInManager.PasswordSignInAsync(username, password, true, false);

            _logger.LogInformation($"{result}");

            return View("Views/RoadMapView/Index.cshtml");
        }

        [HttpGet]
        [Route("register")]
        public IActionResult Register(){
            _logger.LogInformation($"Get: Register Page");

            return View();
        }       

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> PostRegister(string username, 
                                                      string password){
            var user = new ApplicationUser(){
                UserName = username
            };

            _logger.LogInformation($"{user}");
           
            var result = await _userManager.CreateAsync(user, password);
            
            _logger.LogInformation($"Logger is Working");
            _logger.LogInformation($"{result}");

            return View("Login");
        }
    }
}