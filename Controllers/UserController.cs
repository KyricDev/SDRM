using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using SDRM.Models;
using SDRM.Data;

namespace SDRM.Controllers{
    [ApiController]
    [Route("/api/[controller]")]
    public class UserController : ControllerBase{
        private readonly ILogger<UserController> _logger;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly UserContext _userContext;
        public UserController(ILogger<UserController> logger,
                              SignInManager<ApplicationUser> signInManager, 
                              UserManager<ApplicationUser> userManager,
                              UserContext userContext
                              ){
            _logger = logger;
            _signInManager = signInManager;
            _userManager = userManager;
            _userContext = userContext;
        }

        public class Form{
            public string username { get; set; }
            public string password { get; set; }
            public string confirmpassword { get; set; }
        }

        public class ResponseInfo{
            public string id { get; set; }
            public string username { get; set; }
            public int status { get; set; }
            public ResponseInfo(ApplicationUser user){
                this.id = user.Id;
                this.username = user.UserName;
                this.status = 200;
            }
        }

        [HttpGet]
        public ActionResult GetUser(){
            var user = new ApplicationUser();

            return Ok(new ResponseInfo(user));
        }

        [HttpGet("FindUser")]
        public async Task<ActionResult> FindUser(){
            _logger.LogInformation($"Get: FindUser");
            
            var claims = HttpContext.User.Claims.ToList();

            ApplicationUser user = null;

            foreach (var claim in claims){
                if (claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"){
                    _logger.LogInformation($"ID Found: {claim.Value}");

                    user = await _userManager.Users.FirstOrDefaultAsync(u => u.Id == claim.Value);

                    return Ok(new ResponseInfo(user));
                }
            }

            _logger.LogInformation("user not found");
            return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost("LoginUser")]
        public async Task<ActionResult> LoginUser(Form form){
            string username = form.username;
            string password = form.password;

            _logger.LogInformation($"{username} {password}");

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
            
                return Ok(new ResponseInfo(user));
            }

            _logger.LogInformation("sign in failed");
            return BadRequest();
        }

        [AllowAnonymous]
        [HttpPost("RegisterUser")]
        public async Task<ActionResult> RegisterUser(Form form){
            string username = form.username;
            string password = form.password;
            string confirmpassword = form.confirmpassword;

            _logger.LogInformation(username + " " + password + " " + confirmpassword);

            if (username == null || password == null || confirmpassword == null){
                _logger.LogInformation("Missing Field");

                return BadRequest();
            }   

            if (password != confirmpassword){
                _logger.LogInformation("Passwords do not Match");

                return BadRequest();
            }    

            var user = new ApplicationUser(username);
            var result = await _userManager.CreateAsync(user, password);

            if (result.Succeeded){    
                var newuser = new User(user);
                await _userContext.AddAsync(newuser);
                var newresult = await _userContext.SaveChangesAsync();

                if (newresult == 0){
                    _logger.LogInformation("Error in Creating User");
                    await _userManager.DeleteAsync(user);

                    return BadRequest();
                }

                _logger.LogInformation($"User {newuser.Username} created.");

                return Ok(new ResponseInfo(user));
            }

            _logger.LogInformation($"{result}");
            
            return BadRequest();
        }
        [HttpPost("SignOut")]
        public async Task<ActionResult> PostSignOut(){
            await _signInManager.SignOutAsync();
            
            return Ok();
        }
    }
}