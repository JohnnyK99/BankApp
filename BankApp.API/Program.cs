using BankApp.Application.Extensions;
using BankApp.DAL.Extensions;
using BankApp.API.Dto.Auth.Register;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using BankApp.API.Extensions;
using BankApp.DAL.Db;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthSettings(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddFluentValidation();
builder.Services.AddValidatorsFromAssemblyContaining<RegisterUserDtoValidator>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddInfrastructureLayer();
builder.Services.AddDalLayer(builder.Configuration);
builder.Services.AddCorsSettings(builder.Configuration);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseCors();

app.MapControllers();

var service = (IServiceScopeFactory)app.Services.GetService(typeof(IServiceScopeFactory));

using (var db = service.CreateScope().ServiceProvider.GetService<AppDbContext>())
{
    db.Database.Migrate();
}

app.Run();
