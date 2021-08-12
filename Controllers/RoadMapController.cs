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
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using SDRM.Models;
using SDRM.Data;

namespace SDRM.Controllers{
    [ApiController]
    [Route("[controller]")]
    public class RoadMapController  :   ControllerBase{
        private readonly ILogger<RoadMapViewController> _logger;
        private readonly RoadMapItemContext _context;

        public RoadMapController (RoadMapItemContext context,
                                  ILogger<RoadMapViewController> logger){
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<RoadMapItem>>> GetRoadMap(){
            var items = await _context.RoadMapItems.Select(i => i).ToListAsync();
            
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