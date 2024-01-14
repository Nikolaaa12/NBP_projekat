using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using Neo4jClient.Cypher;


[Route("api/UserType")]
[ApiController]
public class UserTypeController : ControllerBase
{
    public UserTypeService service { get; set; }

    public UserTypeController(GraphClient graphClient)
    {
        service = new UserTypeService(graphClient);
    }

    [HttpGet]
    [Route("Get")]

    public async Task<IActionResult> Get()
    {
        try
        {
            var userTypes = await service.userTypeRepository.GetAll();

            if (userTypes.Any())
            {
                return Ok(userTypes);
            }
            else
            {
                return NotFound("No user types found");
            }
        }
        catch (Exception ex)
        {
            // Log the exception or return an appropriate error response
            Console.WriteLine($"Error fetching user types: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }

}