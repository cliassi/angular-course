using BackednApi.Data;
using BackednApi.Models;
using BackednApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackednApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        public async Task<ActionResult> CreateProductAsync([FromBody] Product product)
        {
            return Ok(await _productService.Create(product));
        }

        [HttpGet]
        public ActionResult GetProducts()
        {
            var products = _productService.GetAll();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public ActionResult GetProduct(int id)
        {
            var product = _productService.Get(id);
            if(product == null)
            {
               return BadRequest("Product with id " + id + " does not exist");
            }
            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProductAsync([FromBody] Product product, int id)
        {
            if(product.Id != id)
            {
                return BadRequest("Id didn't match");
            }
            var p = await _productService.Update(product);
            return Ok(product);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            return Ok(await _productService.DeleteAsync(id));
        }
    }
}
