using Microsoft.EntityFrameworkCore;
using SDRM.Models;

namespace SDRM.Data{
    public class UserContext : DbContext{
        public UserContext(DbContextOptions<UserContext> options) : base(options) { 

        }
        public DbSet<User> Users { get; set; } 
        public DbSet<RoadMapItem> RoadMapItems { get; set; }
    }
}