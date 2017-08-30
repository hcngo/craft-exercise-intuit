using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Models
{
    public class LineValueAttribute : ValidationAttribute
    {
        private int _Lowbound;
        private int _Highbound;

        public LineValueAttribute(int lowbound, int highbound)
        {
            _Lowbound = lowbound;
            _Highbound = highbound;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var line = (PropertyLine)validationContext.ObjectInstance;

            if (!line.IsAmountCalculated && line.Amount is null){
                return new ValidationResult("The amount is not valid");
            }

            if (!line.IsAmountCalculated && line.Amount != null && (line.Amount < _Lowbound || line.Amount > _Highbound))
            {
                return new ValidationResult($"Amount must be within {_Lowbound} and {_Highbound}");
            }

            return ValidationResult.Success;
        }
    }
    public class PropertyLine
    {
      public enum AmountLocation { None, InHeader, InFooter};
      public enum AmountOperation { None, Plus, Subtract };

      public string Id {get; set;}
      public AmountOperation AmountOperand {get; set;}
      public string Header {get; set;}
      public string Footer {get; set;}
      [LineValue(0, 100000000)]
      public decimal? Amount {get; set;}
      public bool IsAmountCalculated {get; set;}
      public AmountLocation AmountPos {get; set;}
      public IList<PropertyLine> Sublines {get; set;}
      public string Message {get;set;} = "";

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
