using backend.Controllers;
using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using Neo4jClient.Cypher;


[Route("api/UserType")]
[ApiController]
public class UserTypeController : ControllerBase
{
    private readonly IGraphClient _graphClient;

    public UserTypeController(IGraphClient graphClient)
        {
            _graphClient = graphClient;
        }

    [HttpGet]
    

    public async Task<IActionResult> Get()
    {
        var UserTypes = await _graphClient.Cypher.Match("(n:UserType)")
                                .Return(n=>n.As<UserType>()).ResultsAsync;

        return Ok(UserTypes);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var Type = await _graphClient.Cypher.Match("(n:UserType)")
                                            .Where((UserType ut)=> ut.Id == id)
                                            .Return(n=>n.As<UserType>()).ResultsAsync;
        return Ok(Type);
    }

    [HttpPost]

    public async Task<IActionResult> Create([FromBody]UserType userType)
    {

        await _graphClient.Cypher.Create("(d:UserType $userType)")
                                    .WithParam("userType",userType)
                                    .ExecuteWithoutResultsAsync();

        return Ok();
    }

   [HttpPut("{id}")]
public async Task<IActionResult> Edit(int id, [FromBody]UserType userType)
{
    await _graphClient.Cypher
        .Match("(ut:UserType)")
        .Where((UserType ut) => ut.Id == id)
        .Set("ut= $userType")
        .WithParam("userType", userType)
        .ExecuteWithoutResultsAsync();

    return Ok();
}


    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
        {
            await _graphClient.Cypher.Match("(n:UserType)")
                                            .Where((UserType n) => n.Id == id)
                                            .Delete("n")
                                            .ExecuteWithoutResultsAsync();
            return Ok();
    }
}