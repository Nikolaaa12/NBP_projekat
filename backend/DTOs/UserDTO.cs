
using backend.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.DTOs
{
    public class UserDTO
    {
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Username { get; set; }
        public string? City {get; set;}
        public int PricePerHour { get; set; }
        public string? Description { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? ProfilePicture { get; set; }
    }

    public class UserRegisterDTO
    {
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? City {get; set;}
        public int PricePerHour { get; set; }
        public string? Description { get; set; }
        public string? Password { get; set; }
        public string? RepeatedPassword { get; set; }
        public string? ProfilePicture { get; set; }
        public int UserTypeId { get; set; }
    }

    public class UserUpdateDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public string? City {get; set;}
        public int PricePerHour { get; set; }
        public string? Description { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? ProfilePicture { get; set; }
    }

    public class UserLoginDTO
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
