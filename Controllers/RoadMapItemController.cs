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

//"Host=127.0.0.1 ; Database=RoadMapItemContext; Username=Ricky; Password=Madrid0424!;"
/*
"RoadMapItemContext": "host=sdrmdb.postgres.database.azure.com; port=5432; database=RoadMapItemContext; username=KyricDev; password=Madrid0424!; Trust Server Certificate=true; SSL Mode=Require;",
"ApplicationUserContext": "host=sdrmdb.postgres.database.azure.com; port=5432; database=ApplicationUser; username=KyricDev; password=Madrid0424!; Trust Server Certificate=true; SSL Mode=Require;",
"UserContext":"host=sdrmdb.postgres.database.azure.com; port=5432; database=RoadMapItemContext; username=KyricDev; password=Madrid0424!; Trust Server Certificate=true; SSL Mode=Require;"
*/
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

        public class Item{
            public int id { get; set; }
            public string title { get; set; }
            public string description { get; set; }
            public bool isComplete { get; set; }
        }

        public class Comparer : IComparer<RoadMapItem>{
            public int Compare(RoadMapItem item1, RoadMapItem item2){
                return item1.ID.CompareTo(item2.ID);
            }
        }
        public class ItemIDs{
            public int [] itemIDs { get; set; }
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

            var roadMapItems = _userContext.RoadMapItems.Where(u => u.UserID == id).OrderBy(u => u.ID).ToList();
            /*
            _logger.LogInformation($"roadMapItems:");
            foreach(RoadMapItem i in roadMapItems){
                _logger.LogInformation($"{i.Title}: {i.Content}");
            }
            */
            return Ok(roadMapItems);
        }

        [HttpPost("AddRoadMapItem")]
        public async Task<ActionResult> AddRoadMapItem(Item item){
            _logger.LogInformation($"Post: AddRoadMapItem");
            _logger.LogInformation($"{item.title}: {item.description}");

            var claim = HttpContext.User.Claims.Where(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").SingleOrDefault();
            var userID = claim.Value;

            _logger.LogInformation($"ID Found: {userID}");
            var user = await _userContext.Users.Where(u => u.ID == userID).SingleOrDefaultAsync();

            RoadMapItem roadMapItem = new RoadMapItem(){
                Title = item.title,
                Content = item.description,
                IsComplete = false
            };

            user.RoadMapItems.Add(roadMapItem);
            var newItem = user.RoadMapItems.Last();
            _logger.LogInformation($"Item ID: {newItem.ID}");
            _userContext.RoadMapItems.Add(newItem);

            var result = await _userContext.SaveChangesAsync();

            if (result > 0){
                _logger.LogInformation($"Item Added");
                return Ok(200);
            }

            _logger.LogInformation("unable to add item");
            return BadRequest();
        }
        [HttpPost("DeleteRoadMapItem")]
        public async Task<ActionResult> DeleteRoadMapItem(Item item){
            _logger.LogInformation($"Post: DeleteRoadMapItem");
            _logger.LogInformation($"{item.id}");

            var claim = HttpContext.User.Claims.Where(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").SingleOrDefault();

            var user = await _userContext.Users.Where(u => u.ID == claim.Value).SingleOrDefaultAsync();
            var targetItem = await _userContext.RoadMapItems.Where(i => i.ID == item.id).SingleOrDefaultAsync(); 

            user.RoadMapItems.Remove(targetItem);
            _userContext.RoadMapItems.Remove(targetItem);
            var result = await _userContext.SaveChangesAsync();

            var _Items = _userContext.RoadMapItems.Where(u => u.UserID == claim.Value).ToList();

            _logger.LogInformation("_Items: ");
            foreach (RoadMapItem i in _Items){
                _logger.LogInformation($"{i.Title}: {i.Content}");
            }

            if (result > 0){
                _logger.LogInformation($"{item.id}: {item.title} - Successfully Deleted");
                return Ok(200);
            }
            
            _logger.LogInformation($"Failed to Delete Item");
            return BadRequest();
        }

        [HttpPost("DeleteMultipleRoadMapItems")]
        public async Task<IActionResult> DeleteMultipleRoadMapItems(ItemIDs itemIDs){
            _logger.LogInformation($"{itemIDs}");

            foreach (int ID in itemIDs.itemIDs){
                var item = await _userContext.RoadMapItems.Where(item => item.ID == ID).FirstAsync();
                _userContext.RoadMapItems.Remove(item);
            }

            var results = await _userContext.SaveChangesAsync();

            if (results > 0){
                _logger.LogInformation("Successfully Deleted Items");
                return Ok(200);
            }

            _logger.LogInformation("Failed to Delete Items");
            return BadRequest();
        }
        
        [HttpPost("UpdateRoadMapItem")]
        public async Task<IActionResult> UpdateRoadMapItem(Item item){
            _logger.LogInformation($"Item to Update: {item.id}");

            var itemEdit = await _userContext.RoadMapItems.FindAsync(item.id);

            itemEdit.Title = item.title;
            itemEdit.Content = item.description;

            _userContext.RoadMapItems.Update(itemEdit);
            var results = await _userContext.SaveChangesAsync();

            if (results > 0){
                _logger.LogInformation($"Item Successfully Updated!");
                return Ok(200);
            }
            
            _logger.LogInformation($"Failed to Update Item");
            return BadRequest();
        }
        [HttpPost("ChangeRoadMapItemCompletedStatus")]
        public async Task<IActionResult> ChangeRoadMapItemCompletedStatus(Item item){
            _logger.LogInformation($"Item ID: {item.id}");

            var itemModify = await _userContext.RoadMapItems.Where(i => i.ID == item.id).FirstOrDefaultAsync();

            itemModify.IsComplete = !itemModify.IsComplete;
            _userContext.RoadMapItems.Update(itemModify);
            var results = await _userContext.SaveChangesAsync();

            if (results > 0){
                _logger.LogInformation($"Successfully Modified Item State");
                return Ok(200);
            }

            _logger.LogInformation($"Failed to Change Item Status");
            return BadRequest();
        }
    }
}