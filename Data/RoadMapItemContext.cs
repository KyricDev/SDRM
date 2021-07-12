using Microsoft.EntityFrameworkCore;
using SDRM.Models;

namespace SDRM.Data{
    public class RoadMapItemContext    :   DbContext{
        public RoadMapItemContext(DbContextOptions options)   :   base(options){

        }

        public DbSet<RoadMapItem> RoadMapItems { get; set;}
    }
}