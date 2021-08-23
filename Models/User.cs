using System.Collections.Generic;
using SDRM.Models;

namespace SDRM.Models{
    public class User{
        public string ID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public ICollection<RoadMapItem> RoadMapItems { get; set; }
        public User(ApplicationUser user){
            this.ID = user.Id;
            this.Username = user.UserName;
            this.Email = user.Email;
            this.RoadMapItems = new List<RoadMapItem>();
        }
        public User(){
            this.RoadMapItems = new List<RoadMapItem>();
        }
    }
}