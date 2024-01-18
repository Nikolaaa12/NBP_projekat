using System.Xml;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Neo4jClient;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var client= new GraphClient(new Uri("http://localhost:7474"), "neo4j", "GraphDBMS");
await client.ConnectAsync();
builder.Services.AddSingleton<IGraphClient>(client);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowReactApp",
            builder =>
            {
                builder.WithOrigins("http://localhost:3000") // Add your frontend origin
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
    });

builder.Services.AddScoped<UserTypeService>();

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowReactApp");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
