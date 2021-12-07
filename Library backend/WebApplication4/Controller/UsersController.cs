using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Library.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using WebApplication4.Data;
using WebApplication4.Models;

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
            return await _context.User.ToListAsync();
        }

        //get users by id
        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
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
        public async Task<ActionResult<int>> PostUser(string type, UserPassword userPassword)
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

        private int ValidateUsr(UserPassword userPassword)
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
        private async Task<int> CreateUser(UserPassword userPassword)
        {
            try
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
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.UserID == id);
        }
    }
}
