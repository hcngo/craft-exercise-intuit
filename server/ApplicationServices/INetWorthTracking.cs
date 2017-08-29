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

namespace Server.ApplicationServices
{
    public interface INetWorthTracking
    {
      IList<PropertyLine> GetInitialData(IConfigurationSection arrayOfLines);

      void ProcessNewLines(NetWorthDto dto);
    }
}
