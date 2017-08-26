// Copyright © 2014-present Kriasoft, LLC. All rights reserved.
// This source code is licensed under the MIT license found in the
// LICENSE.txt file in the root directory of this source tree.

using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models;
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
        private static IList<PropertyLine> _netValues;
        
        private readonly IHostingEnvironment _env;
        private readonly IAntiforgery _antiforgery;
        private readonly IConfiguration _configuration;
        private dynamic _assets;

        public HomeController(IHostingEnvironment env, IAntiforgery antiforgery, IConfiguration configuration)
        {
            _env = env;
            _antiforgery = antiforgery;
            _configuration = configuration;
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
        
        private IList<PropertyLine> _ConvertInitialData(IConfigurationSection arrayOfLines){
          var lines = new List<PropertyLine>();
          foreach (IConfigurationSection section in arrayOfLines.GetChildren())
          {
              var id = section.GetSection("Id").Value;
              var header = section.GetSection("Header").Value;
              var footer = section.GetSection("Footer").Value;
              var amount = decimal.Parse(section.GetSection("Amount").Value);
              var isAmountCalculated = bool.Parse(section.GetSection("IsAmountCalculated").Value);
              var amountPos = (PropertyLine.AmountLocation) Int32.Parse(section.GetSection("AmountPos").Value);
              var subLines = _ConvertInitialData(section.GetSection("Sublines"));
              var aLine = new PropertyLine(){
                Id = id, Header = header, Footer = footer, Amount = amount, IsAmountCalculated = isAmountCalculated, AmountPos = amountPos, Sublines = subLines
              };
              lines.Add(aLine);
          }
          return lines;
        }
        
        [HttpGet("api/networth")]
        public IActionResult GetNetWorth()
        {
            if (_netValues is null){
              lock (_lock){
                _netValues = _ConvertInitialData(_configuration.GetSection("InitialData"));
              }
            }
              
          return Content(JsonConvert.SerializeObject(_netValues), "application/json");
        }
    }
}
