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

            if (!string.IsNullOrWhiteSpace(query.Symbol))
            {
                restaurants = restaurants.Where(s => s.Symbol.Contains(query.Symbol));
            }

             if (!string.IsNullOrWhiteSpace(query.Type))
            {
                restaurants = restaurants.Where(s => s.Type.Contains(query.Type));
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                {
                    restaurants = query.IsDecsending ? restaurants.OrderByDescending(s => s.Symbol) : restaurants.OrderBy(s => s.Symbol);
                }
            }
             
            var skipNumber = (query.PageNumber - 1) * query.PageSize;


            return await restaurants.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Restaurant?> GetByIdAsync(int id)
        {
            return await _context.Restaurants.Include(c => c.Comments).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Restaurant?> GetBySymbolAsync(string symbol)
        {
            return await _context.Restaurants.FirstOrDefaultAsync(s => s.Symbol == symbol);
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

            existingRestaurant.Symbol = restDto.Symbol;
            existingRestaurant.Name = restDto.Name;
            existingRestaurant.Phone = restDto.Phone;
            existingRestaurant.Type = restDto.Type;
            existingRestaurant.Price_Rating = restDto.Price_Rating;
            

            await _context.SaveChangesAsync();

            return existingRestaurant;
        }
    }
}