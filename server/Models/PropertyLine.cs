using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models
{
    public class PropertyLine
    {
      public enum AmountLocation { None, InHeader, InFooter};
      
      public string Id;
      public string Header;
      public string Footer;
      public decimal Amount;
      public bool IsAmountCalculated;
      public AmountLocation AmountPos;
      public IList<PropertyLine> Sublines;
    }
}