using BankApp.Application.Extensions;
using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using iText.Forms;
using iText.Forms.Fields;
using iText.IO.Font;
using iText.IO.Font.Constants;
using iText.Kernel.Font;
using iText.Kernel.Pdf;
using System;
using System.IO;

namespace BankApp.Application.Helpers
{
    public class PdfHelpers : IPdfHelpers
    {
        private PdfFont _font;

        public PdfHelpers()
        {
            _font = PdfFontFactory.CreateFont(StandardFonts.HELVETICA, PdfEncodings.CP1250);
        }

        public byte[] GetTransactionConfirmation(Transaction transaction, string language)
        {
            MemoryStream stream = new();
            using PdfReader reader = new(GetAbsolutePath($"Templates\\GetTransactionConfirmation\\template_{language}.pdf"));
            using PdfWriter writer = new(stream);

            using PdfDocument document = new(reader, writer);

            var form = PdfAcroForm.GetAcroForm(document, false);
            var fields = form.GetFormFields();
            SetFieldValue(fields["AccountNumberFrom"], transaction.AccountNumberFrom.ToAccountNumberFormat());
            SetFieldValue(fields["AccountNumberTo"], transaction.AccountNumberTo.ToAccountNumberFormat());
            SetFieldValue(fields["Title"], transaction.Title);
            SetFieldValue(fields["Date"], transaction.Date.ToString("dd.MM.yyyy"));
            SetFieldValue(fields["Amount"], $"${transaction.Amount}", 20);
            SetFieldValue(fields["Description"], string.IsNullOrEmpty(transaction.Description) ? "-" : transaction.Description);

            form.FlattenFields();
            document.Close();
            return stream.ToArray();
        }

        private void SetFieldValue(PdfFormField field, string value, int fontSize = 15)
        {
            field.SetValue(value, _font, fontSize);
        }

        private static string GetAbsolutePath(string relativePath)
        {
            string currentDirectory = AppDomain.CurrentDomain.BaseDirectory;
            string file = Path.Combine(currentDirectory, relativePath);
            return Path.GetFullPath(file);
        }
    }
}
