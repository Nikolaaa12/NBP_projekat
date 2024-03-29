using backend.Services.IServices;
using backend.Repository;
using Neo4jClient;

namespace backend.Services
{
    public class UserTypeService : IUserTypeService
    {
        public UserTypeRepository userTypeRepository { get; set; }



        public UserTypeService(IGraphClient graphClient)
        {
            this.userTypeRepository= new UserTypeRepository(graphClient);
        }

    }
}