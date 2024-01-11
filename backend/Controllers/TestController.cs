using Microsoft.AspNetCore.Mvc;
using Neo4jClient;


[Route("api/test")]
[ApiController]
public class TestController : ControllerBase
{
    private readonly IGraphClient _graphClient;

    public TestController(IGraphClient graphClient)
        {
            _graphClient = graphClient;
        }
    [HttpPost]
    public async Task<IActionResult> Post()
    {
        try
    {
        var person = new Person { Name = "Nikola Nikolic" };

        await _graphClient.Cypher
            .Create("(p:Person {name: $name})")
            .WithParam("name", person.Name)
            .ExecuteWithoutResultsAsync();

        return Ok("Node created successfully");
    }
    catch (Exception ex)
    {
        // Handle exceptions appropriately, log the error, etc.
        return StatusCode(500, $"Error creating node: {ex.Message}");
    }
    }

}