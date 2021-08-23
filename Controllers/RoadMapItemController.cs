using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SDRM.Models;
using SDRM.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Claims;

namespace SDRM.Controllers{
    [ApiController]
    [Route("/api/[controller]")]
    public class RoadMapItemController : ControllerBase{
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly UserContext _userContext;
        private readonly ILogger<RoadMapItemController> _logger;
        public RoadMapItemController(UserManager<ApplicationUser> userManager, 
                                     UserContext userContext,
                                     ILogger<RoadMapItemController> logger
        ){
            _userManager = userManager;
            _userContext = userContext;
            _logger = logger;
        }
        [HttpGet]
        [Route("[action]")]
        public IActionResult GetRoadMapItems(){
            _logger.LogInformation("Get: RoadMapItems");

            if (HttpContext.User == null){
                throw new ArgumentNullException("HttpContextUser.User", "User Does Not Exist");
            }
            
            string id = null;
            var claims = HttpContext.User.Claims.ToList();
            
            foreach(Claim claim in claims){
                if (claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"){
                    _logger.LogInformation($"ID: {claim.Value} Found");

                    id = claim.Value;
                    
                    break;
                }
            }

            var roadMapItems = _userContext.RoadMapItems.Where(u => u.UserID == id).ToList();

            return Ok(roadMapItems);
        }
    }
}