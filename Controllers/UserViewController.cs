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
    [AllowAnonymous]
    public class UserViewController   :   Controller{
        private readonly ILogger<UserViewController> _logger;
        public UserViewController(ILogger<UserViewController> logger){
            _logger = logger;
        }
        [HttpGet]
        [Route("/")]
        public IActionResult Index(){
            _logger.LogInformation($"Get: Login Page");

            return View("Form");
        }
    }
}