using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using Neo4jClient.Cypher;


[Route("api/Reservation")]
[ApiController]
public class ReservationController : ControllerBase
{
    public ReservationService service { get; set; }

    public ReservationController(IGraphClient graphClient)
    {
        service = new ReservationService(graphClient);
    }

    [HttpGet]
    [Route("Get")]

    public async Task<IActionResult> GetAll()
{
    try
    {
        var reservation = await service.reservationRepository.GetAll();//_userTypeRepository.GetAll();

        if (reservation.Any())
        {
            return Ok(reservation);
        }
        else
        {
            return NotFound("No reservations found");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error fetching reservation: {ex.Message}");
        return StatusCode(500, "Internal Server Error");
    }
}
    [HttpGet]
    [Route("GetById")]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var reservation = await service.reservationRepository.GetReservationById(id);

            if (reservation != null)
            {
                return Ok(reservation);
            }
            else
            {
                return NotFound($"reservation with ID {id} not found");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching reservation: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpGet]
    [Route("GetByHandyman")]
    public async Task<IActionResult> GetByHandyman(int id)
    {
        try
        {
            var reservation = await service.reservationRepository.GetReservationsByHandymanId(id);

           if (reservation.Any())
        {
            return Ok(reservation);
        }
        else
        {
            return NotFound("No reservations found");
        }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching reservation: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }
    [HttpPost]
    [Route("Add")]
    public async Task<IActionResult> AddUserType(int idhandyman,int idcustomer,DateOnly date)
    {
        try
        {
            var newUserType = await service.reservationRepository.Create(idcustomer,idhandyman,date);

            return Ok(newUserType);
        }
        catch (Exception ex)
        {
            // Log the exception or return an appropriate error response
            Console.WriteLine($"Error adding reservation: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpDelete]
    [Route("Delete/{id}")]
    public IActionResult DeleteUserType(int id)
    {
        try
        {
            service.reservationRepository.Delete(id);
            return Ok($"reservation with ID {id} deleted successfully");
        }
        catch (Exception ex)
        {
            // Log the exception or return an appropriate error response
            Console.WriteLine($"Error deleting reservation: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }



}