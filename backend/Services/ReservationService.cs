using backend.Services.IServices;
using backend.Repository;
using Neo4jClient;

namespace backend.Services
{
    public class ReservationService : IReservationService
    {
        public ReservationRepository reservationRepository { get; set; }



        public ReservationService(IGraphClient graphClient)
        {
            this.reservationRepository= new ReservationRepository(graphClient);
        }

    }
}