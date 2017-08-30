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
    public class NetWorthTracking : INetWorthTracking
    {
      public IList<PropertyLine> GetInitialData(IConfigurationSection arrayOfLines) {
        var lines = new List<PropertyLine>();
        foreach (IConfigurationSection section in arrayOfLines.GetChildren())
        {
            var id = section.GetSection("Id").Value;
            var header = section.GetSection("Header").Value;
            var footer = section.GetSection("Footer").Value;
            var amount = decimal.Parse(section.GetSection("Amount").Value);
            var isAmountCalculated = bool.Parse(section.GetSection("IsAmountCalculated").Value);
            var amountPos = (PropertyLine.AmountLocation) Int32.Parse(section.GetSection("AmountPos").Value);
            var amountOperSection = section.GetSection("AmountOperand").Value;
            var amountOperand = amountOperSection != null ? (PropertyLine.AmountOperation) Int32.Parse(amountOperSection) : PropertyLine.AmountOperation.Plus;
            var subLines = GetInitialData(section.GetSection("Sublines"));
            var aLine = new PropertyLine(){
              Id = id, Header = header, Footer = footer, Amount = amount, IsAmountCalculated = isAmountCalculated, AmountPos = amountPos, Sublines = subLines, AmountOperand = amountOperand
            };
            lines.Add(aLine);
        }
        return lines;
      }

      public void ProcessNewLines(NetWorthDto dto) {
        foreach (var line in dto.Items) {
          processLine(line);
        }
        dto.Version += 1;
      }

      private void processLine(PropertyLine line){
        if (line.IsAmountCalculated){
          line.Amount = 0.00M;
          foreach( var subLine in line.Sublines){
            processLine(subLine);
            switch (subLine.AmountOperand){
              case PropertyLine.AmountOperation.Plus:
                line.Amount += subLine.Amount;
                break;
              case PropertyLine.AmountOperation.Subtract:
                line.Amount -= subLine.Amount;
                break;
              case PropertyLine.AmountOperation.None:
                break;
              default:
                break;
            }
          }
        } else {

        }
        line.Message = "";
      }
    }
}
