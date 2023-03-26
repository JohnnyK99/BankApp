using System.IO;

namespace BankApp.Application.Wrappers
{
    public record FileResponse(byte[] Content, string FileName, string ContentType);
}
