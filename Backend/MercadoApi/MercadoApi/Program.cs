var builder = WebApplication.CreateBuilder(args);

// Adicione a configuração CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", builder =>
    {
        builder.WithOrigins("http://127.0.0.1:5500", "http://localhost:5500") // ou "http://localhost:5500" dependendo da sua configuração local
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials(); // Permitir credenciais
    });
});

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Configure CORS antes de outros middlewares
app.UseCors("AllowLocalhost");

app.UseAuthorization();

app.MapControllers();

app.Run();
