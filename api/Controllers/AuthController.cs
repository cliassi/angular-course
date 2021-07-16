using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using BackednApi.Services;
using BackednApi.Data.Dtos;
using BackednApi.Data;

namespace BackednApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public AuthController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginDto loginDto)
        {
            var user = _userService.Authenticate(loginDto.Email, loginDto.Password);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration.GetValue<string>("Secret"));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info and authentication token
            return Ok(new
            {
                Id = user.Id,
                Username = user.Username,
                Name = user.Name,
                Photo = user.Photo,
                Token = tokenString
            });
        }


        [HttpPost]
        public ActionResult Register([FromBody] RegisterDto registerRequest)
        {
            var user = new User
            {
                Name = registerRequest.Name,
                Username = registerRequest.Email,
                Photo = registerRequest.Photo
            };
            var newlyCreatedUser = _userService.Create(user, registerRequest.Password);

            return Ok(
                  new
                  {
                      Id = newlyCreatedUser.Id,
                      Name = newlyCreatedUser.Name,
                      Username = newlyCreatedUser.Username,
                      Photo = newlyCreatedUser.Photo
                  }
                );
        }
    }
}
