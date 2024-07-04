using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Location;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class LocationRepository : ILocationRepository
    {
        private readonly ApplicationDBContext _context;
        public LocationRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Location>> GetAllAsync(QueryObject queryObject){
            var locations = _context.Locations.AsQueryable();

            if (queryObject.IsDecsending == true)
            {
                locations = locations.OrderByDescending(c => c.City);
            }
            return await locations.ToListAsync();
        }
        public async Task<Location?> GetByIdAsync(int id){
            return await _context.Locations.FirstOrDefaultAsync(c => c.Id == id);
        }
        public async Task<Location> CreateAsync(Location locationModel){
            await _context.Locations.AddAsync(locationModel);
            await _context.SaveChangesAsync();
            return locationModel;
        }
        public async Task<Location?> UpdateAsync(int id, UpdateLocationRequestDto locationDto){
            var existingLocation = await _context.Locations.FirstOrDefaultAsync(x => x.Id == id);

            if (existingLocation == null)
            {
                return null;
            }

            existingLocation.City = locationDto.City;
            existingLocation.Country = locationDto.Country;
            existingLocation.Address = locationDto.Address;

            await _context.SaveChangesAsync();

            return existingLocation;
        }
        public async Task<Location?> DeleteAsync(int id)
        {
            var locationModel = await _context.Locations.FirstOrDefaultAsync(x => x.Id == id);

            if (locationModel == null)
            {
                return null;
            }

            _context.Locations.Remove(locationModel);
            await _context.SaveChangesAsync();
            return locationModel;
        }
        public Task<bool> LocationExists(int id)
        {
            return _context.Locations.AnyAsync(s => s.Id == id);
        }
    }

        
}