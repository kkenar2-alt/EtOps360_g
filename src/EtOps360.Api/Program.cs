using EtOps360.Api.Endpoints;
using EtOps360.Infrastructure.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddEtOpsInfrastructure();
builder.Services.AddCors(options =>
{
    options.AddPolicy("EtOpsWeb", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173", "https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("EtOpsWeb");

app.MapGet("/", () => Results.Ok(new
{
    name = "EtOps 360 API",
    message = "Karkastan kasaya operasyon, fire, siparis ve POS mutabakat omurgasi hazir.",
    docs = "/openapi/v1.json"
}));

app.MapAuthEndpoints();
app.MapEtOpsEndpoints();

app.Run();
