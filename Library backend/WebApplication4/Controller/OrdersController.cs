using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication4.Data;
using WebApplication4.Models;

namespace WebApplication4.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly LibContext _context;

        public OrdersController(LibContext context)
        {
            _context = context;
        }

        // GET: api/Orders/name
        [HttpGet("userId/{userId}")]
        public async Task<ActionResult<List<Book>>> GetOrder(int userId)
        {
            if(userId > 0)
            {
                var ret = _context.Book.Where(el => el.UserID == userId);
                List<Book> books = new();

                foreach(Book b in ret)
                {
                    books.Add(b);
                }
                return books;
            }
            else
            {
                return NotFound();
            }
        }

        
        // POST: api/Orders
        [HttpPost("userId/{userId}")]
        public async Task<ActionResult<Book>> PostOrder(int userId, Book book)
        {
            try
            {
                if (userId > 0)
                {
                    book.UserID = userId;
                    book.Status = "peeding";
                    _context.Book.Update(book);
                    await _context.SaveChangesAsync();

                    return book;
                }
                else
                {
                    return NotFound();
                }  
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return NotFound();
            }
        }

        // POST: api/Orders
        [HttpPost("set/{userId}")]
        public async Task<ActionResult<Book>> PostOrder(int userId)
        {
            try
            {
                if (userId > 0)
                {
                    var books = _context.Book.Where(b => b.UserID == userId);   

                    foreach(Book b in books)
                    {
                        b.Status = "toGet";
                        b.From = DateTime.Now;
                        b.To = DateTime.Now.AddDays(14);
                    }
                    
                    _context.Book.UpdateRange(books);
                    await _context.SaveChangesAsync();

                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return NotFound();
            }
        }

        // POST: api/Orders/
        [HttpPost("get/{userId}")]
        public async Task<ActionResult<Book>> PostOrderIssue(int userId)
        {
            try
            {
                if (userId > 0)
                {
                    var books = _context.Book.Where(b => b.UserID == userId);

                    foreach (Book b in books)
                    {
                        b.Status = "issued";
                    }

                    _context.Book.UpdateRange(books);
                    await _context.SaveChangesAsync();

                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return NotFound();
            }
        }

        [HttpPost("received/{userId}")]
        public async Task<ActionResult<Book>> PostOrderReceived(int userId)
        {
            try
            {
                if (userId > 0)
                {
                    var books = _context.Book.Where(b => b.UserID == userId);

                    foreach (Book b in books)
                    {
                        b.Status = "free";
                        b.UserID = 0;
                    }

                    _context.Book.UpdateRange(books);
                    await _context.SaveChangesAsync();

                    return NoContent();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return NotFound();
            }
        }


        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var orderedBook = _context.Book.Find(id);
            orderedBook.UserID = 0;
            orderedBook.Status = "free";
            _context.Book.Update(orderedBook);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
