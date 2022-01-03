using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication4.Data;
using WebApplication4.DbModels;

namespace WebApplication4.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly LibContext _context;

        public UsersController(LibContext context)
        {
            _context = context;
        }

        //Get users
        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            try
            {
                return await _context.User.ToListAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        //get users by id
        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            try
            {
                var user = await _context.User.FindAsync(id);

                if (user == null)
                {
                    return NotFound();
                }

                return user;
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //upate user
        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserID)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        //Get/create  user
        [HttpPost("login/{type}")]
        public async Task<ActionResult<int>> PostUser(string type, Models.UserPassword userPassword)
        {
            switch (type)
            {
                case ("valid"):
                    return ValidateUsr(userPassword);
                case ("create"):
                    return await CreateUser(userPassword);
                default: return NotFound();
            }
        }

        private int ValidateUsr(Models.UserPassword userPassword)
        {
            try
            {
                User user = _context.User.FirstOrDefault(u => u.Login == userPassword.Login && u.Password == userPassword.Password);
                if (user != null)
                {
                    return user.UserID;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        //  return CreatedAtAction("GetUser", new { id = user.UserID }, user);
        private async Task<int> CreateUser(Models.UserPassword userPassword)
        {
            try
            {
                if (_context.User.Where(el => el.Login != userPassword.Login).FirstOrDefault() == null)
                {
                    User user = new User
                    {
                        Login = userPassword.Login,
                        Password = userPassword.Password,
                        Name = "no name",
                        Surname = "no surname"
                    };

                    _context.User.Add(user);
                    await _context.SaveChangesAsync();

                    return user.UserID;
                }

                return 0;
            }
            catch(Exception ex)
            {
                return 0;
            }
        }

        //Delete user
        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var user = await _context.User.FindAsync(id);
                if (user == null)
                {
                    return NotFound();
                }

                _context.User.Remove(user);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.UserID == id);
        }
    }
}
