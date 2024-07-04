using System;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;


namespace api.Models
{
    
    public class Comment{

        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        
        public int Rating {get; set;} //Range e 1-5
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? RestaurantId { get; set; }
        public  Restaurant? Restaurant { get; set; }
        public  string AppUserId { get; set; }
        public  AppUser AppUser { get; set; }
    }
}