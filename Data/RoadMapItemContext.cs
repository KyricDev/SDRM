using Microsoft.EntityFrameworkCore;
using SDRM.Models;

namespace SDRM.Data{
    public class RoadMapItemContext    :   DbContext{
        public RoadMapItemContext(DbContextOptions<RoadMapItemContext> options)   :   base(options){

        }

        public DbSet<RoadMapItem> RoadMapItems { get; set;}
    }
}