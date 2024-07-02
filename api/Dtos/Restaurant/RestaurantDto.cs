using System;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Routing;
using api.Dtos.Comment;
using api.Dtos.Location;

namespace api.Dtos.Restaurant
{

    public class RestaurantDto{
        public int Id { get; set; }
        public string Symbol { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;

        public LocationDto? location {get; set; }

        public string Phone {get; set;} = string.Empty;

        public int Price_Rating {get; set;} //range = 1-5

         public List<CommentDto>? Comments { get; set; } 

         
    }
}