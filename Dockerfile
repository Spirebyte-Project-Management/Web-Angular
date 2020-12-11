FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build

RUN apt-get update && \
apt-get install -y wget && \
apt-get install -y gnupg2 && \
wget -qO- https://deb.nodesource.com/setup_12.x | bash - && \
apt-get install -y build-essential nodejs

WORKDIR /app
COPY . .
RUN dotnet publish Spirebyte.Web.Angular -c release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build /app/out .
ENV ASPNETCORE_URLS http://*:80
ENV ASPNETCORE_ENVIRONMENT Docker
ENTRYPOINT dotnet Spirebyte.Web.Angular.dll