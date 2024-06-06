using GraphQL;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;

namespace dotnet_graphql;

class Program
{
    const string url = "https://swapi-graphql.netlify.app/.netlify/functions/index";

    static void Main(string[] args)
    {
        var client = new GraphQLHttpClient(url, new NewtonsoftJsonSerializer());
        var request = new GraphQLRequest
        {
            Query = @"
                query AllFilms {
                allFilms {
                    films {
                    id
                    director
                    created
                    title
                    }
                }
                }
            "
        };
        var response = client.SendQueryAsync<dynamic>(request).Result;
        Console.WriteLine(response.Data);
    }
}