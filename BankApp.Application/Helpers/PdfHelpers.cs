using BankApp.Application.Features.BankAccounts.Queries.GetClientBankAccounts;
using PdfSharp.Drawing;
using PdfSharp.Pdf;
using System.IO;

namespace BankApp.Application.Helpers
{
    public class PdfHelpers
    {
        private readonly XPen linePen;
        private readonly XFont fontBold;
        private readonly XFont fontNormal;
        private readonly XFont fontLabel;

        public PdfHelpers()
        {
            linePen = new(XColor.FromName("gray"));
            fontBold = new("Arial", 20, XFontStyle.Bold);
            fontNormal = new("Arial", 14, XFontStyle.Regular);
            fontLabel = new("Arial", 12, XFontStyle.Regular);
        }

        public Stream GetTransactionConfirmation(Transaction transaction)
        {
            PdfDocument document = new();
            PdfPage page = document.AddPage();
            XGraphics gfx = XGraphics.FromPdfPage(page);

            gfx.DrawString("Bank App", fontBold, XBrushes.Black, new XRect(20, 0, page.Width-20, 50), XStringFormats.CenterLeft);
            gfx.DrawLine(linePen, new XPoint(0, 55), new XPoint(page.Width, 55));
            gfx.DrawString("Potwierdzenie transakcji", fontBold, XBrushes.Black, new XRect(20, 55, page.Width-20, 40), XStringFormats.Center);

            gfx.DrawString("Nadawca", fontLabel, XBrushes.Black, new XRect(20, 95, (page.Width - 20)/2, 40), XStringFormats.CenterLeft);
            gfx.DrawString(transaction.AccountNumberFrom, fontNormal, XBrushes.Black, new XRect((page.Width - 20)/2, 95, page.Width-20, 40), XStringFormats.CenterLeft);

            gfx.DrawString("Odbiorca", fontLabel, XBrushes.Black, new XRect(20, 135, (page.Width - 20) / 2, 40), XStringFormats.CenterLeft);
            gfx.DrawString(transaction.AccountNumberTo, fontNormal, XBrushes.Black, new XRect((page.Width - 20) / 2, 135, page.Width - 20, 40), XStringFormats.CenterLeft);

            gfx.DrawString("Tytuł", fontLabel, XBrushes.Black, new XRect(20, 175, (page.Width - 20) / 2, 40), XStringFormats.CenterLeft);
            gfx.DrawString(transaction.Title, fontNormal, XBrushes.Black, new XRect((page.Width - 20) / 2, 175, page.Width - 20, 40), XStringFormats.CenterLeft);

            gfx.DrawString("Opis", fontLabel, XBrushes.Black, new XRect(20, 225, (page.Width - 20) / 2, 40), XStringFormats.CenterLeft);
            gfx.DrawString(transaction.Description, fontNormal, XBrushes.Black, new XRect((page.Width - 20) / 2, 225, page.Width - 20, 40), XStringFormats.CenterLeft);

            gfx.DrawString("Data transakcji", fontLabel, XBrushes.Black, new XRect(20, 265, (page.Width - 20) / 2, 40), XStringFormats.CenterLeft);
            gfx.DrawString(transaction.Date.ToString("dd.MM.yyyy HH:mm:ss"), fontNormal, XBrushes.Black, new XRect((page.Width - 20) / 2, 265, page.Width - 20, 40), XStringFormats.CenterLeft);

            gfx.DrawString("Kwota", fontLabel, XBrushes.Black, new XRect(20, 305, (page.Width - 20) / 2, 40), XStringFormats.CenterLeft);
            gfx.DrawString($"{transaction.Amount} zł", fontNormal, XBrushes.Black, new XRect((page.Width - 20) / 2, 305, page.Width - 20, 40), XStringFormats.CenterLeft);

            Stream stream = new MemoryStream();
            document.Save(stream);
            return stream;
        }
    }
}
