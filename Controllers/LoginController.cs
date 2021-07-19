using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;


namespace SDRM.Controllers{
    public class LoginController   :   Controller{
        public LoginController(){
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login(){
            
            return View();
        }
    }
}