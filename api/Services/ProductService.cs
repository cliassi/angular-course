using BackednApi.Data;
using BackednApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackednApi.Services
{
    public interface IProductService
    {
        public ICollection<Product> GetAll();
        public Product Get(int id);
        public Task<Product> Create(Product product);
        public Task<Product> Update(Product product);
        public Task<object> DeleteAsync(int id);
    }
    public class ProductService : IProductService
    {
        private readonly DataContext _context;
        public ProductService(DataContext context)
        {
            _context = context;
        }
        public async Task<Product> Create(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<object> DeleteAsync(int id)
        {
            try
            {
                var product = _context.Products.Where(p => p.Id == id).FirstOrDefault();
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();

                return new
                {
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new
                {
                    Error = "Somethign went wrong",
                    Message = ex.Message
                };
            }
        }

        public Product Get(int id)
        {
            return _context.Products.Where(p => p.Id == id).FirstOrDefault();
        }

        public ICollection<Product> GetAll()
        {
            return _context.Products.ToList();
        }

        public async Task<Product> Update(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
            return product;
        }
    }
}
