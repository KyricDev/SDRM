using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SDRM.Models;

namespace SDRM.Data{
    public class ApplicationUserContext : IdentityDbContext{
        public ApplicationUserContext(DbContextOptions options) : base(options){

        }
    }
}