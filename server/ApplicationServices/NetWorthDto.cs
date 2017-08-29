using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Server.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Server.ApplicationServices
{
    public class NetWorthDto
    {
      public IList<PropertyLine> Items {get; set;}
      public int Version {get;set;}
      public Tuple<bool,string> Result {get; set;}
    }
}
