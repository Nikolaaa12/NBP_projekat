using backend.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Repository.IRepository
{
    public interface IUserRepository:IRepository<User>
    {
        Task<backend.Models.User> GetUserByEmail(string email);
        Task<User> GetUserByUsername(string username);
        Task<User> GetUserById(int id);
        Task<User> UpdateUser(User user);
        Task<User> Create(User user);
        Task<IQueryable<User>> GetUsersByUsername(string username, string ownerUsername);
    }
}
