using Microsoft.AspNetCore.Mvc;

namespace SDRM.Controllers{
    public class RoadMapViewController  :   Controller{
        public RoadMapViewController(){

        }

        public IActionResult Index(){
            return View();
        }
    }
}