
using backend.Models;
using backend.Repository.IRepository;
using Neo4jClient;
using Neo4jClient.Cypher;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace backend.Repository
{
    public class ReservationRepository : Repository<Reservation>, IReservationRepository
    {
        //public UserRepository(DbContext context) : base(context)
        //{
        //}

        //public EnaContext? _db
        //{
        //    get { return context as EnaContext;}
        //}


        public ReservationRepository(IGraphClient graphClient) : base(graphClient) { }



        public Task<Reservation> GetReservationById(int id)
        {
             var user = this.GetOne(n => n.Id == id);
            return user;
        }

        public Task<IQueryable<Reservation>> GetReservationsByCustomerId(int id)
        {
            return  this.GetAllWhere(n => n.IdCustomer == id);
        }

        public Task<IQueryable<Reservation>> GetReservationsByHandymanId(int id)
        {
            return  this.GetAllWhere(n => n.IdHandyMan == id);
        }

        public async Task<Reservation> Create(int IdCustomer,int idhandyman,DateOnly date )
        {
        
            try
            {
                Reservation res = new Reservation();
                res.IdCustomer=IdCustomer;
                res.IdHandyMan=idhandyman;
                res.Date=date;
                int? maxId = await this.GetMaxId();

                if (maxId == null)
                    res.Id = 1;
                else
                    res.Id = maxId.Value + 1;
                await this.Add(res);

                return res;
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
                .Match("(n:Reservation)")
                .Return(() => Return.As<int?>("MAX(n.Id)"))
                .ResultsAsync;

            return result.SingleOrDefault();
        }
    }
}
