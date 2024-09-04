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
                City = restaurantModel.City,
                Country = restaurantModel.Country,
                Address =restaurantModel.Address,
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
                City = restDto.City,
                Country = restDto.Country,
                Address =restDto.Address,
                Phone = restDto.Phone,
                Price_Rating = restDto.Price_Rating,
                
            };
        }


        

        
    }
}