using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Restaurant;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class RestaurantRepository : IRestaurantRepository
    {
        private readonly ApplicationDBContext _context;
        public RestaurantRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Restaurant> CreateAsync(Restaurant restaurantModel)
        {
            await _context.Restaurants.AddAsync(restaurantModel);
            await _context.SaveChangesAsync();
            return restaurantModel;
        }

        public async Task<Restaurant?> DeleteAsync(int id)
        {
            var restaurantModel = await _context.Restaurants.FirstOrDefaultAsync(x => x.Id == id);

            if (restaurantModel == null)
            {
                return null;
            }

            _context.Restaurants.Remove(restaurantModel);
            await _context.SaveChangesAsync();
            return restaurantModel;
        }

        public async Task<List<Restaurant>> GetAllAsync(QueryObject query)
        {
            var restaurants = _context.Restaurants.Include(c => c.Comments).ThenInclude(a => a.AppUser).AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                restaurants = restaurants.Where(s => s.Name.Contains(query.Name));
            }


             if (!string.IsNullOrWhiteSpace(query.Type))
            {
                restaurants = restaurants.Where(s => s.Type.Contains(query.Type));
            }

            if (query.PriceRating.HasValue)
            {
                restaurants = restaurants.Where(s => s.Price_Rating == query.PriceRating.Value);
            }


            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                {
                    restaurants = query.IsDecsending ? restaurants.OrderByDescending(s => s.Id) : restaurants.OrderBy(s => s.Id);
                }
            }
             
            var skipNumber = (query.PageNumber - 1) * query.PageSize;


            return await restaurants.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Restaurant?> GetByIdAsync(int id)
        {
            return await _context.Restaurants.Include(c => c.Comments).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Restaurant?> GetByNameAsync(string name)
        {
            return await _context.Restaurants.FirstOrDefaultAsync(s => s.Name == name);
        }

        public Task<bool> RestaurantExists(int id)
        {
            return _context.Restaurants.AnyAsync(s => s.Id == id);
        }

        public async Task<Restaurant?> UpdateAsync(int id, UpdateRestaurantRequestDto restDto)
        {
            var existingRestaurant = await _context.Restaurants.FirstOrDefaultAsync(x => x.Id == id);

            if (existingRestaurant == null)
            {
                return null;
            }

            existingRestaurant.Name = restDto.Name;
            existingRestaurant.Phone = restDto.Phone;
            existingRestaurant.Type = restDto.Type;
            existingRestaurant.Price_Rating = restDto.Price_Rating;
            existingRestaurant.Address=restDto.Address;
            existingRestaurant.City=restDto.City;
            existingRestaurant.Country=restDto.Country;
            

            await _context.SaveChangesAsync();

            return existingRestaurant;
        }
    }
}