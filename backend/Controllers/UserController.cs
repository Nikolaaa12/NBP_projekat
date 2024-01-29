using backend.Helpers;
using backend.Services;
using backend.Services.IServices;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Neo4jClient;

namespace backend.Controllers
{
    [Route("api/User")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public UserTypeService service { get; set; }
        public IUserService _userService { get; set; }

        public UserController(IGraphClient _graphClient)
        {
            _userService = new UserService(_graphClient);
        }

        [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserRegisterDTO user)
        {
            try
            {
                var result = await this._userService.Register(user);
                if(result.Customer==false)
                    this._userService.userRepository.Assign(result.Id, result.TypeOfUser);
                return Created("success", result);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLoginDTO user)
        {
            try
            {
                var result = await this._userService.Login(user.Email, user.Password);

                Response.Cookies.Append("jwt", result, new CookieOptions { HttpOnly = true, Secure = true, SameSite = SameSiteMode.None });

                return Ok(new { message = "success" });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetUser")]
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];

                var user = await this._userService.GetUser(jwt);

                return Ok(user);
            }
            catch (Exception e)
            {
                return Unauthorized();
            }
        }

        [Route("Logout")]
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            Response.Cookies.Delete("jwt", new CookieOptions { SameSite = SameSiteMode.None, Secure = true });

            return Ok(new { message = "success" });
        }

        [Route("GetUsersbyTypeId")]
        [HttpGet]
        public async Task<IActionResult> GetUsersbyTypeId(int id)
        {
            var result = await this._userService.GetUsersbytypeId(id);

            if (result.Any())
            {
                return Ok(result);
            }
            else
            {
                return NotFound("No users found");
            }

        }
        [Route("GetUserbyId")]
        [HttpGet]
        public async Task<IActionResult> GetUserbyId(int id)
        {
            var result = await this._userService.userRepository.GetUserById(id);

            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return NotFound("No users found");
            }

        }

        [HttpDelete]
        [Route("Delete")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            try
            {
                var hasReservations = await _userService.userRepository.UserHasReservations(id);

                if (hasReservations > 0)
                {
                    _userService.userRepository.DeleteUserAndReservations(id);
                }
                else
                {
                    _userService.userRepository.Delete(id);
                }

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


}
