using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using SDRM.Models;
using SDRM.Data;

namespace SDRM.Controllers{
    [ApiController]
    [Route("User")]
    public class UserController : ControllerBase{
        private readonly ILogger<UserController> _logger;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        public UserController(ILogger<UserController> logger,
                              SignInManager<ApplicationUser> signInManager, 
                              UserManager<ApplicationUser> userManager
                              ){
            _logger = logger;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public class Form{
            public string username { get; set; }
            public string password { get; set; }
            public string confirmpassword { get; set; }
        }

        [HttpGet]
        public ActionResult GetUser(){
            var user = new ApplicationUser();

            return Ok(user);
        }

        [HttpGet("request={id}")]
        public async Task<ActionResult> GetUser(string id){
            var user = await _userManager
                                .Users
                                .Where(u => u.Id == id)
                                .FirstOrDefaultAsync();

            if (user != null){
                _logger.LogInformation(user + " " + "found");
                return Ok(user);
            }

            _logger.LogInformation("user not found");
            return BadRequest();
        }

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

            if (!result.Succeeded){
                _logger.LogInformation("$result");
                return BadRequest();
            }

            _logger.LogInformation("User $username created");
            return Ok(user);
        }
    }
}