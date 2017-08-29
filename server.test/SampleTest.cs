// Copyright © 2014-present Kriasoft, LLC. All rights reserved.
// This source code is licensed under the MIT license found in the
// LICENSE.txt file in the root directory of this source tree.

using Xunit;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;
using Server.ApplicationServices;

namespace server.test
{
    // see example explanation on xUnit.net website:
    // https://xunit.github.io/docs/getting-started-dotnet-core.html
    public class SampleTest
    {
        [Fact]
        public void NetWorthTrackingTest()
        {
          var config = GetConfigBuilder();
          var netWorthTrackingServ = new NetWorthTracking();
          var lines = netWorthTrackingServ.GetInitialData(config.GetSection("InitialData"));
          var newLines = netWorthTrackingServ.GetInitialData(config.GetSection("InitialData"));
          netWorthTrackingServ.ProcessNewLines(newLines);
          Assert.True(lines.Count == newLines.Count);
          var result = true;
          for(var i = 0; i < lines.Count; i++){
              result = result && lines[i].Equals(newLines[i]);
          }
          Assert.True(result);
        }
      
        private IConfiguration GetConfigBuilder(){
          var curDir = Directory.GetParent(Directory.GetParent(Directory.GetParent(Directory.GetCurrentDirectory()).FullName).FullName).FullName;
          var config = new ConfigurationBuilder()
            .SetBasePath(curDir)
            .AddJsonFile($"appsettings.json", optional: true)
            .Build();
          return config;
        }
    }
}
