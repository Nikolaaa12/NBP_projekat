using backend.Models;

namespace backend.Repository.IRepository
{
    public interface IUserRepository:IRepository<User>
    {
        Task<backend.Models.User> GetUserByEmail(string email);
        Task<User> GetUserByUsername(string username);
        Task<User> GetUserById(int id);
        Task<IQueryable<User>> GetUsersByCity(string city);
        Task<IQueryable<User>> GetUsersByType(int id);
        void UpVote(User a);
        void DownVote(User a);
        User UpdateUser(User user);
        Task<User> Create(User user);
        Task<int?> GetMaxId();
    }
}
