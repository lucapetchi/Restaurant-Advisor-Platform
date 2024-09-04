using System;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Routing;


namespace api.Models
{

    public class Restaurant{
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        
    
        public string Country { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;
        public string Phone {get; set;} = string.Empty;

         public int Price_Rating {get; set;} //range = 1-5

         public List<Comment> Comments { get; set; } = new List<Comment>();

        //public List<Portfolio> Portfolios { get; set; } = new List<Portfolio>();
    }
}