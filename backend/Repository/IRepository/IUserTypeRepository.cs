using backend.Models;


namespace backend.Repository.IRepository
{
    public interface IUserTypeRepository:IRepository<UserType>
    {
        Task<UserType> GetUserTypeById(int id);
        Task<UserType> Create(UserType user);
    }
}
