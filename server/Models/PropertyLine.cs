using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models
{
    public class PropertyLine
    {
      public enum AmountLocation { None, InHeader, InFooter};
      public enum AmountOperation { None, Plus, Subtract };

      public string Id {get; set;}
      public AmountOperation AmountOperand {get; set;}
      public string Header {get; set;}
      public string Footer {get; set;}
      [Required]
      [Range(0, 100000000.00)]
      public decimal? Amount {get; set;}
      public bool IsAmountCalculated {get; set;}
      public AmountLocation AmountPos {get; set;}
      public IList<PropertyLine> Sublines {get; set;}
      public string Message {get;set;}

      public override bool Equals(object obj){
        if (obj == null || GetType() != obj.GetType())
          return false;
        var o = (PropertyLine) obj;
        var result = Id == o.Id && AmountOperand == o.AmountOperand && Header == o.Header
        && Footer == o.Footer && IsAmountCalculated == o.IsAmountCalculated && AmountPos == o.AmountPos && Amount == o.Amount &&
        Sublines.Count == o.Sublines.Count;
        for(var i = 0; i < Sublines.Count; i++){
          result = result && Sublines[i].Equals(o.Sublines[i]);
        }
        return result;
      }

      public override int GetHashCode(){
        return Id.GetHashCode() + AmountOperand.GetHashCode() + Header.GetHashCode() + Footer.GetHashCode()
        + Amount.GetHashCode() + IsAmountCalculated.GetHashCode() + AmountPos.GetHashCode() + Sublines.Sum(l => l.GetHashCode());
      }
    }
}
