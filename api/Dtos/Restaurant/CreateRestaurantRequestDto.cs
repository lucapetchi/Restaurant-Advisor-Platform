using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Restaurant
{
    public class CreateRestaurantRequestDto
    {
        [Required]
        [MaxLength(10, ErrorMessage = "Symbol cannot be over 10 over characters")]
        public string Symbol { get; set; } = string.Empty;
        [Required]
        [MaxLength(10, ErrorMessage = " Name cannot be over 10 over characters")]
        public string Name { get; set; } = string.Empty;
        [Required]
        [MaxLength(10, ErrorMessage = " Type cannot be over 10 over characters")]
        public string Type { get; set; } = string.Empty;
        [Required]
        [MaxLength(10, ErrorMessage = " Phone cannot be over 10 over characters")]
        public string Phone {get; set;} = string.Empty;

        [Required]
        [Range(1, 5)]
        public int Price_Rating {get; set;}
       
    }
}