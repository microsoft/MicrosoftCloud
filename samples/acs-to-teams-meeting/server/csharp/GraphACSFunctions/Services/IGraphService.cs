using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraphACSFunctions.Services;
public interface IGraphService
{
    Task<string> CreateMeetingAsync();
}
