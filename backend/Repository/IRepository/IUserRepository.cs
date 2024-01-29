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
        User UpVote(User a);
        User DownVote(User a);
        User UpdateUser(User user);
        User GiveAdmin(User a);
        Task<User> Create(User user);
        Task<int?> GetMaxId();
        void Assign(int Userid,int UserTypeid);
        void DeleteUserAndReservations(int? userId);
        Task<long> UserHasReservations(int userId);
    }
}
