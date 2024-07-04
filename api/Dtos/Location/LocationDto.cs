using System;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Restaurant;

namespace api.Dtos.Location{

    public class LocationDto{

        public int Id { get; set; }

        public string Country { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;

        
    }

}