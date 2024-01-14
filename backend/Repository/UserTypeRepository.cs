//using DAL.DataContext;
using backend.Models;
using backend.Repository.IRepository;
using Neo4jClient;

namespace backend.Repository
{
    public class UserTypeRepository : Repository<UserType>, IUserTypeRepository
    {

        public UserTypeRepository(GraphClient graphClient) : base(graphClient){}
  

        public async Task<UserType> GetUserTypeById(int id)
        {
            UserType user = await this.GetOne(n => n.Id == id);
            return user;
        }

        public async Task<UserType> Create(UserType UserType)
        {
            await this.Add(UserType);

            return UserType;
        }
    }
}
