using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Location;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ILocationRepository
    {
        Task<List<Location>> GetAllAsync(QueryObject query);
        Task<Location?> GetByIdAsync(int id);
        Task<Location> CreateAsync(Location locationModel);
        Task<Location?> UpdateAsync(int id, UpdateLocationRequestDto locationDto);
        Task<Location?> DeleteAsync(int id);
        Task<bool> LocationExists(int id);
    }
}