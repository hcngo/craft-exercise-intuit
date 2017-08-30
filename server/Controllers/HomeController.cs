// Copyright © 2014-present Kriasoft, LLC. All rights reserved.
// This source code is licensed under the MIT license found in the
// LICENSE.txt file in the root directory of this source tree.

using System;
using System.Reflection;
using System.IO;
using System.Collections;
using System.Linq;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Server.Models;
using Server.ApplicationServices;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Server.Controllers
{
    public class HomeController : Controller
    {
        private static Object _lock = new Object();
        private static NetWorthDto _netValues;

        private readonly INetWorthTracking _netWorthTracking;
        private readonly IHostingEnvironment _env;
        private readonly IAntiforgery _antiforgery;
        private readonly IConfiguration _configuration;
        private dynamic _assets;

        public HomeController(IHostingEnvironment env, IAntiforgery antiforgery, IConfiguration configuration, INetWorthTracking netWorthTracking)
        {
            _env = env;
            _antiforgery = antiforgery;
            _configuration = configuration;
            _netWorthTracking = netWorthTracking;
        }

        public async Task<IActionResult> Index()
        {
            // Get the filename of the JavaScript bundle generated by Webpack
            if (_env.IsDevelopment() || _assets == null)
            {
                var assetsFileName = Path.Combine(_env.WebRootPath, "./dist/assets.json");

                using (var stream = System.IO.File.OpenRead(assetsFileName))
                using (var reader = new StreamReader(stream))
                {
                    var json = await reader.ReadToEndAsync();
                    _assets = JsonConvert.DeserializeObject(json);
                }
            }

            ViewData["assets:main:js"] = (string)_assets.main.js;

            // Send the request token as a JavaScript-readable cookie
            var tokens = _antiforgery.GetAndStoreTokens(Request.HttpContext);
            Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions { HttpOnly = false });

            return View();
        }


        [HttpGet("api/networth")]
        public IActionResult GetNetWorth()
        {
            if (_netValues is null)
            {
                lock (_lock)
                {
                    _netValues = new NetWorthDto(){
                        Items = _netWorthTracking.GetInitialData(_configuration.GetSection("InitialData")),
                        Version = 1,
                        Result = new Tuple<bool, string>(true, "")
                    };
                }
            }
            _netValues.Result = new Tuple<bool,string>(true, "");
            return Content(JsonConvert.SerializeObject(_netValues), "application/json");
        }

        [HttpPost("api/networth")]
        public IActionResult PostNetWorth([FromBody] NetWorthDto dto)
        {
            var result = dto;
            lock (_lock)
            {
                if (_netValues is null)
                {
                    dto.Result = new Tuple<bool, string>(false, "Net Worth Tracker was not initiated. Please load it first.");
                }
                else if (_netValues.Version > dto.Version)
                {
                    dto.Result = new Tuple<bool, string>(false, "The Net Worth Tracker had been updated earlier. Please reload and make your changes again.");
                } else if (!ModelState.IsValid){
                    PopulateErrors(dto);
                    dto.Result = new Tuple<bool, string>(false, "There are errors below.");
                }
                else
                {
                    _netWorthTracking.ProcessNewLines(dto);
                    dto.Result = new Tuple<bool,string>(true, "The Net Worth Tracker has been successfully updated.");
                    _netValues = dto;
                    result = dto;
                }
            }

            return Content(JsonConvert.SerializeObject(result), "application/json");
        }

        private void PopulateErrors(NetWorthDto dto){
            var messagePropName = "Message";
            foreach(var k in ModelState){
                var errorMessage = String.Join(" - ", k.Value.Errors.ToList().Select(t => t.ErrorMessage));
                object curObj = dto;
                var propPathList = k.Key.Split('.').ToList();
                propPathList = propPathList.Take(propPathList.Count - 1).ToList();
                foreach(var propertyNameCombo in propPathList){
                    var openBracketIndex = propertyNameCombo.IndexOf('[');
                    var closeBracketIndex = propertyNameCombo.IndexOf(']');
                    if (openBracketIndex >= 0){
                        var propertyName = propertyNameCombo.Substring(0, openBracketIndex);
                        var index = Int32.Parse(propertyNameCombo.Substring(openBracketIndex + 1, closeBracketIndex - openBracketIndex - 1));
                        curObj = ((IList)curObj.GetType().GetProperty(propertyName).GetValue(curObj, null))[index];
                    }else{
                        var propertyName = propertyNameCombo;
                        curObj = curObj.GetType().GetProperty(propertyName).GetValue(curObj, null);
                    }

                }
                curObj.GetType().GetProperty(messagePropName).SetValue(curObj, errorMessage);
            }
        }
    }
}
