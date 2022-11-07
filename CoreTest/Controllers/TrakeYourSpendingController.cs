using Microsoft.AspNetCore.Mvc;

namespace CoreTest.Controllers
{
    public class TrakeYourSpendingController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
