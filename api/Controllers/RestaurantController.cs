using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Restaurant;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/restaurant")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {   private readonly ApplicationDBContext _context;
        private readonly IRestaurantRepository _restRepo;
        public RestaurantController(ApplicationDBContext context, IRestaurantRepository restaurantRepo)
        {
            _restRepo = restaurantRepo;
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var restaurants = await _restRepo.GetAllAsync(query);

            var restDto = restaurants.Select(s => s.ToRestaurantDto()).ToList();

            return Ok(restDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var rest = await _restRepo.GetByIdAsync(id);

            if (rest == null)
            {
                return NotFound();
            }

            return Ok(rest.ToRestaurantDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRestaurantRequestDto restDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var restModel = restDto.ToRestaurantFromCreateDTO();

            await _restRepo.CreateAsync(restModel);

            return CreatedAtAction(nameof(GetById), new { id = restModel.Id }, restModel.ToRestaurantDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateRestaurantRequestDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var restModel = await _restRepo.UpdateAsync(id, updateDto);

            if (restModel == null)
            {
                return NotFound();
            }

            return Ok(restModel.ToRestaurantDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var restModel = await _restRepo.DeleteAsync(id);

            if (restModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }


    }

}