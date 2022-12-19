using System.IO;

namespace BankApp.Application.Wrappers
{
    public record FileResponse(Stream Content, string FileName, string ContentType);
}
