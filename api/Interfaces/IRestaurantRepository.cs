using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Restaurant;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IRestaurantRepository
    {
        Task<List<Restaurant>> GetAllAsync(QueryObject query);
        Task<Restaurant?> GetByIdAsync(int id);
        Task<Restaurant?> GetByNameAsync(string name);
        Task<Restaurant> CreateAsync(Restaurant restaurantModel);
        Task<Restaurant?> UpdateAsync(int id, UpdateRestaurantRequestDto restaurantDto);
        Task<Restaurant?> DeleteAsync(int id);
        Task<bool> RestaurantExists(int id);
    }
}