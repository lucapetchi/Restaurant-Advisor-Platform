using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Restaurant;
using api.Models;

namespace api.Mappers
{
    public static class RestaurantMappers
    {
        public static RestaurantDto ToRestaurantDto(this Restaurant restaurantModel)
        {
            return new RestaurantDto
            {
                Id = restaurantModel.Id,
                Name = restaurantModel.Name,
                Type = restaurantModel.Type,
                Location_id = restaurantModel.Location_id,
                Location = restaurantModel.Location.ToLocationDto(),
                Phone = restaurantModel.Phone,
                Price_Rating = restaurantModel.Price_Rating,
                Comments = restaurantModel.Comments.Select(c => c.ToCommentDto()).ToList()
            };
        }
        public static Restaurant ToRestaurantFromCreateDTO(this CreateRestaurantRequestDto restDto)
        {
            return new Restaurant
            {
                Name = restDto.Name,
                Type = restDto.Type,
                Phone = restDto.Phone,
                Price_Rating = restDto.Price_Rating,
                Location = restDto.Location.ToLocationFromDTO(),
                
            };
        }


        

        
    }
}