using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoreTest.Controllers.APIController
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApiTestController : ControllerBase
    {
        /// <summary>
        /// 取得會員
        /// </summary>
        /// <param name="request"></param>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Todo
        ///     {
        ///        "id": 1,
        ///        "name": "Item #1",
        ///        "isComplete": true
        ///     }
        /// </remarks>
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            return this.Ok();
        }
    }
}
