using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TraveLinux.Web.Startup))]
namespace TraveLinux.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
