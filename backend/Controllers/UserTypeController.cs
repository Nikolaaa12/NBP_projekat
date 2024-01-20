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

    public UserTypeController(IGraphClient graphClient)
    {
        service = new UserTypeService(graphClient);
    }

    [HttpGet]
    [Route("Get")]

    public async Task<IActionResult> GetAll()
{
    try
    {
        var userTypes = await service.userTypeRepository.GetAll();//_userTypeRepository.GetAll();

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
        Console.WriteLine($"Error fetching user types: {ex.Message}");
        return StatusCode(500, "Internal Server Error");
    }
}
    [HttpGet]
    [Route("GetOne")]
    public async Task<IActionResult> Get(int id)
    {
        try
        {
            var userType = await service.userTypeRepository.GetUserTypeById(id);

            if (userType != null)
            {
                return Ok(userType);
            }
            else
            {
                return NotFound($"User type with ID {id} not found");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching user type: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpPost]
    [Route("Add")]
    public async Task<IActionResult> AddUserType([FromBody] string name)
    {
        try
        {
            var newUserType = await service.userTypeRepository.Create(name);

            return Ok(newUserType);
        }
        catch (Exception ex)
        {
            // Log the exception or return an appropriate error response
            Console.WriteLine($"Error adding user type: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }

    [HttpDelete]
    [Route("Delete/{id}")]
    public IActionResult DeleteUserType(int id)
    {
        try
        {
            service.userTypeRepository.Delete(id);
            return Ok($"UserType with ID {id} deleted successfully");
        }
        catch (Exception ex)
        {
            // Log the exception or return an appropriate error response
            Console.WriteLine($"Error deleting user type: {ex.Message}");
            return StatusCode(500, "Internal Server Error");
        }
    }



}