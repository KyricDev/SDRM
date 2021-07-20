using Microsoft.AspNetCore.Mvc;

namespace SDRM.Controllers{
    public class RoadMapViewController  :   Controller{
        public RoadMapViewController(){

        }

        [HttpPost]
        public IActionResult Index(string Username, string Password){
            ViewBag.Username = Username;
            ViewBag.Password = Password;

            return View();
        }
    }
}