using Microsoft.AspNetCore.Mvc;
using Neo4j.Driver;

[Route("api/test")]
[ApiController]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { message = "Hello from .NET backend!" });
    }
}