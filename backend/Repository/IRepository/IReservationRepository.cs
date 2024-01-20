using backend.Models;


namespace backend.Repository.IRepository
{
    public interface IReservationRepository : IRepository<Reservation>
    {
        Task<Reservation> GetReservationById(int id);
        Task<IQueryable<Reservation>> GetReservationsByCustomerId(int id);
        Task<IQueryable<Reservation>> GetReservationsByHandymanId(int id);
        Task<Reservation> Create(int IdCustomer,int idhandyman,DateOnly date );
    }
}
