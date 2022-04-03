using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using SDRM.Data;

namespace SDRM
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            using (var scope = host.Services.CreateScope()){
                var dbAppUser = scope.ServiceProvider.GetRequiredService<ApplicationUserContext>();
                dbAppUser.Database.Migrate();
                var dbUser = scope.ServiceProvider.GetRequiredService<UserContext>();
                dbUser.Database.Migrate();
                var dbRoadMap = scope.ServiceProvider.GetRequiredService<RoadMapItemContext>();
                dbRoadMap.Database.Migrate();
            }
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
