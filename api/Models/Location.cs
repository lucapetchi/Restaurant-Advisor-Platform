using System;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;


namespace api.Models{

    public class Location{

        public int Id {get; set;}

        public string Country { get; set; } = string.Empty;

        public string City { get; set; } = string.Empty;

        public string Address { get; set; } = string.Empty;
    }

}