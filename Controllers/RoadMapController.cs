using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using SDRM.Models;
using SDRM.Data;

namespace SDRM.Controllers{
    [ApiController]
    [Route("[controller]")]
    public class RoadMapController  :   ControllerBase{
        private readonly RoadMapItemContext _context;

        public RoadMapController (RoadMapItemContext context){
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<RoadMapItem>>> GetRoadMap(){
            var items = await _context.RoadMapItems.Select(i => i).ToListAsync();
            var claim = new Claim("name", "Ricky");
            var claims = new List<Claim>();
            claims.Add(claim);
            var claimsID = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var claimsPrincipal = new ClaimsPrincipal(claimsID);

            await HttpContext.SignInAsync(claimsPrincipal);

            var claimsList = HttpContext.User.Claims;
            
            foreach(Claim c in claimsList){
                Console.WriteLine("Console");
                Console.WriteLine(c.Type + " " + c.Value);
            }

            return items;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoadMapItem>> GetRoadMapItem(int id){
            var item = await _context.RoadMapItems.FirstAsync(i => i.ID == id);

            return item;
        }

        [HttpPost]
        public async Task<ActionResult<RoadMapItem>> PostRoadMapItem(RoadMapItem item){
            _context.RoadMapItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRoadMapItem), new{id = item.ID}, item);
        }

        [HttpDelete]
        public async Task<ActionResult<RoadMapItem>> DeleteRoadMapItem(int id){
            var item = await _context.RoadMapItems.Where(i => i.ID == id).FirstAsync();

            _context.RoadMapItems.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(item);
        }

        [HttpPut]
        public async Task<ActionResult<RoadMapItem>> PutRoadMapItem(RoadMapItem item){
            _context.RoadMapItems.Update(item);
            await _context.SaveChangesAsync();

            return Ok(item);
        }
    }
}