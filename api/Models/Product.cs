using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackednApi.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public int Quantity { get; set; }
        public bool HasStock { get; set; } = false;

    }
}
