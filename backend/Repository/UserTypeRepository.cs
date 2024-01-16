//using DAL.DataContext;
using backend.Models;
using backend.Repository.IRepository;
using Neo4jClient;
using Neo4jClient.Cypher;

namespace backend.Repository
{
    public class UserTypeRepository : Repository<UserType>, IUserTypeRepository
    {

        public UserTypeRepository(IGraphClient graphClient) : base(graphClient) { }



        public async Task<UserType> GetUserTypeById(int id)
        {
            return await this.GetOne(n => n.Id == id);
        }



        public async Task<UserType> GetUserTypeByName(string Name)
        {
            UserType user = await this.GetOne(n => n.Name == Name);
            return user;
        }

        public async Task<UserType> Create(string name)
        {
            try
            {
                UserType ut = new UserType(name);

                int? maxId = await this.GetMaxId();

                if (maxId == null)
                    ut.Id = 1;
                else
                    ut.Id = maxId.Value + 1;

                await this.Add(ut);

                return ut;
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error creating UserType: {ex.Message}");
                throw; // Re-throw the exception to propagate it further
            }
        }


        public async Task<int?> GetMaxId()
        {
            var result = await _graphClient.Cypher
                .Match("(n:UserType)")
                .Return(() => Return.As<int?>("MAX(n.Id)"))
                .ResultsAsync;

            return result.SingleOrDefault();
        }
    }
}
