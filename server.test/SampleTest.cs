// Copyright © 2014-present Kriasoft, LLC. All rights reserved.
// This source code is licensed under the MIT license found in the
// LICENSE.txt file in the root directory of this source tree.

using Xunit;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;

namespace server.test
{
    // see example explanation on xUnit.net website:
    // https://xunit.github.io/docs/getting-started-dotnet-core.html
    public class SampleTest
    {
        [Fact]
        public void PassingTest()
        {
          var config = GetConfigBuilder();
          var section = config.GetSection("InitialData").GetChildren().ToList()[0].GetSection("Id").Value;
          Assert.NotNull(section);
        }
      
        private IConfiguration GetConfigBuilder(){
          var curDir = Directory.GetParent(Directory.GetParent(Directory.GetParent(Directory.GetCurrentDirectory()).FullName).FullName).FullName;
          var config = new ConfigurationBuilder()
            .SetBasePath(curDir)
            .AddJsonFile($"appsettings.json", optional: true)
            .Build();
          return config;
        }

        [Fact]
        public void GetInitialData()
        {
            Assert.Equal(5, Add(2, 2));
        }

        int Add(int x, int y)
        {
            return x + y;
        }
    }
}
