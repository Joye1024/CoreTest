using Microsoft.AspNetCore.Mvc;

namespace CoreTest.Controllers
{
    public class GameController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
