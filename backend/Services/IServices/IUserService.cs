using backend.Models;
using backend.DTOs;

namespace backend.Services.IServices
{
    public interface IUserService
    {
        Task<User> Register(UserRegisterDTO user);
        Task<string> Login(string email, string password);
        Task UpdateProfile(UserUpdateDTO user);
        Task<User> GetUser(string jwt);
    }
}
