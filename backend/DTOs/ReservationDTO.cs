using System.Data.Common;

namespace backend.DTOs;

public class AddReservationDTO
{
    public int IdCustomer { get; set; }
    public int IdHandyMan { get; set; }
    public DateOnly Date { get; set; }
    public AddReservationDTO()
    {
        
    }
    public AddReservationDTO(int idc,int idh,DateOnly date)
    {
        IdCustomer=idc;
        IdHandyMan=idh;
        Date=date;
    }

}