using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using SDRM.Models;
using SDRM.Data;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace SDRM.Controllers{
    [Route("RoadMapView")]
    public class RoadMapViewController  :   Controller{
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ApplicationUserContext _context;
        private readonly ILogger<RoadMapViewController> _logger;
        public RoadMapViewController(ILogger<RoadMapViewController> logger,
                                     UserManager<ApplicationUser> userManager, 
                                     SignInManager<ApplicationUser> signInManager,
                                     ApplicationUserContext context){
            this._logger = logger;
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._context = context;
        }

        [HttpGet]
        [Route("Index")]
        public async Task<IActionResult> Index(){
            var user = await _userManager.Users.Where(i => i.UserName == "Janneane").FirstOrDefaultAsync();
            ViewBag.Username = user.UserName;
            ViewBag.Password = user.PasswordHash;

            return View();
        }

        [HttpPost]
        [Route("Index")]
        public IActionResult Index(string Username, string Password){
            ViewBag.Username = Username;
            ViewBag.Password = Password;

            return View();
        }
    }
}