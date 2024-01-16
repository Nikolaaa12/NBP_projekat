using backend.Models;


namespace backend.Repository.IRepository
{
    public interface IUserTypeRepository : IRepository<UserType>
    {
        Task<UserType> GetUserTypeById(int id);
        Task<UserType> Create(string name);
        Task<UserType> GetUserTypeByName(string Name);
    }
}
