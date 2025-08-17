# Octagon Deep Research MCP
[![Trust Score](https://archestra.ai/mcp-catalog/api/badge/quality/OctagonAI/octagon-deep-research-mcp)](https://archestra.ai/mcp-catalog/octagonai__octagon-deep-research-mcp)

![Favicon](https://docs.octagonagents.com/logo.svg) The Octagon Deep Research MCP server provides specialized AI-powered comprehensive research and analysis capabilities by integrating with advanced deep research agents. No rate limits, faster than ChatGPT Deep Research, more thorough than Grok DeepSearch or Perplexity Deep Research. Add unlimited deep research functionality to any MCP client including Claude Desktop, Cursor, and other popular MCP-enabled applications.

**Powered by [Octagon AI](https://docs.octagonagents.com)** - Learn more about the Deep Research Agent at [docs.octagonagents.com](https://docs.octagonagents.com/guide/agents/deep-research-agent.html)

[![Demo](https://img.youtube.com/vi/yh1cyrm9aus/0.jpg)](https://youtu.be/yh1cyrm9aus)

## 🏆 Why Teams Choose Octagon's Enterprise-Grade Deep Research API

👉 **8–10x faster** than the leading incumbent—complex analyses complete in seconds, not minutes  
👉 **Greater depth & accuracy** —pulls data from 3x more high-quality sources and cross-checks every figure  
👉 **Unlimited parallel runs**—no rate caps, so your analysts can launch as many deep-dive tasks as they need (unlike ChatGPT Pro's 125-task monthly limit)  

## 🚀 Core Differentiators

✅ **No Rate Limits** - Execute unlimited deep research queries without restrictions (vs ChatGPT Pro's 125-task monthly limit)  
✅ **Superior Performance** - Faster than ChatGPT Deep Research, more thorough than Grok DeepSearch or Perplexity Deep Research  
✅ **Enterprise-Grade Speed** - 8-10x faster than leading incumbents, with 3x more source coverage  
✅ **Universal MCP Integration** - Add deep research functionality to any MCP client  
✅ **Multi-Domain Expertise** - Comprehensive research across any topic or industry  
✅ **Advanced Data Synthesis** - Multi-source aggregation with cross-verification of every figure  

## Features

✅ **Comprehensive Research Capabilities**
   - Multi-source data aggregation and synthesis
   - Academic research and literature review
   - Competitive landscape analysis
   - Market intelligence and trend analysis
   - Technical and scientific research
   - Policy and regulatory research
   - Real-time web scraping and data extraction
     
✅ **Universal Domain Coverage**
   - Technology and AI research
   - Healthcare and medical research
   - Environmental and sustainability studies
   - Economic and business analysis
   - Scientific and engineering research
   - Social and cultural studies
   - Political and policy analysis
     
✅ **Advanced Analysis Tools**
   - Comprehensive report generation
   - Cross-source verification
   - Trend identification and forecasting
   - Comparative analysis frameworks

## Get Your Octagon API Key

To use Octagon Deep Research MCP, you need to:

1. Sign up for a free account at [Octagon](https://app.octagonai.co/signup/?redirectToAfterSignup=https://app.octagonai.co/api-keys)
2. After logging in, from left menu, navigate to **API Keys** 
3. Generate a new API key
4. Use this API key in your configuration as the `OCTAGON_API_KEY` value

## Prerequisites

Before installing or running Octagon Deep Research MCP, you need to have `npx` (which comes with Node.js and npm) installed on your system.

### Mac (macOS)

1. **Install Homebrew** (if you don't have it):
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. **Install Node.js (includes npm and npx):**
   ```bash
   brew install node
   ```
   This will install the latest version of Node.js, npm, and npx.

3. **Verify installation:**
   ```bash
   node -v
   npm -v
   npx -v
   ```

### Windows

1. **Download the Node.js installer:**
   - Go to [https://nodejs.org/](https://nodejs.org/) and download the LTS version for Windows.
2. **Run the installer** and follow the prompts. This will install Node.js, npm, and npx.
3. **Verify installation:**
   Open Command Prompt and run:
   ```cmd
   node -v
   npm -v
   npx -v
   ```

If you see version numbers for all three, you are ready to proceed with the installation steps below.

## Installation

### Running on Claude Desktop

To configure Octagon Deep Research MCP for Claude Desktop:

1. Open Claude Desktop
2. Go to Settings > Developer > Edit Config
3. Add the following to your `claude_desktop_config.json` (Replace `your-octagon-api-key` with your Octagon API key):
```json
{
  "mcpServers": {
    "octagon-deep-research-mcp": {
      "command": "npx",
      "args": ["-y", "octagon-deep-research-mcp@latest"],
      "env": {
        "OCTAGON_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```
4. Restart Claude for the changes to take effect

### Running on Cursor

Configuring Cursor Desktop 🖥️
Note: Requires Cursor version 0.45.6+

To configure Octagon Deep Research MCP in Cursor:

1. Open Cursor Settings
2. Go to Features > MCP Servers 
3. Click "+ Add New MCP Server"
4. Enter the following:
   - Name: "octagon-deep-research-mcp" (or your preferred name)
   - Type: "command"
   - Command: `env OCTAGON_API_KEY=your-octagon-api-key npx -y octagon-deep-research-mcp`

> If you are using Windows and are running into issues, try `cmd /c "set OCTAGON_API_KEY=your-octagon-api-key && npx -y octagon-deep-research-mcp"`

Replace `your-octagon-api-key` with your Octagon API key.

After adding, refresh the MCP server list to see the new tools. The Composer Agent will automatically use Octagon Deep Research MCP when appropriate, but you can explicitly request it by describing your research needs. Access the Composer via Command+L (Mac), select "Agent" next to the submit button, and enter your query.

### Running on Windsurf

Add this to your `./codeium/windsurf/model_config.json`:

```json
{
  "mcpServers": {
    "octagon-deep-research-mcp": {
      "command": "npx",
      "args": ["-y", "octagon-deep-research-mcp@latest"],
      "env": {
        "OCTAGON_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

### Running with npx

```bash
env OCTAGON_API_KEY=your_octagon_api_key npx -y octagon-deep-research-mcp
```

### Manual Installation

```bash
npm install -g octagon-deep-research-mcp
```

## Documentation

For comprehensive documentation on using Deep Research capabilities, please visit our official documentation at:
[https://docs.octagonagents.com](https://docs.octagonagents.com)

Specifically for the Deep Research Agent: [Deep Research Agent Guide](https://docs.octagonagents.com/guide/agents/deep-research-agent.html)

The documentation includes:
- Detailed API references
- Research methodology guidelines
- Examples and use cases
- Best practices for comprehensive research
- Advanced features and capabilities

## Available Tool

### octagon-deep-research-agent
Comprehensive deep research and analysis across any topic or domain.

The tool uses a single `prompt` parameter that accepts a natural language query. Include all relevant details in your prompt for optimal results.

## 📚 Example Research Queries

### Technology & AI Research
- "Research the current state of quantum computing development and commercial applications across major tech companies"
- "Analyze the competitive landscape in large language models, comparing capabilities, limitations, and market positioning"
- "Investigate recent developments in autonomous vehicle technology and regulatory challenges"
- "Study the evolution of edge computing architectures and their impact on IoT deployment"

### Healthcare & Medical Research
- "Research breakthrough medical treatments for Alzheimer's disease developed in the last 3 years"
- "Analyze the effectiveness of different COVID-19 vaccine technologies and their global distribution"
- "Investigate the current state of gene therapy research for rare diseases"
- "Study mental health treatment innovations and their accessibility across different demographics"

### Environmental & Sustainability
- "Research sustainable agriculture practices and their adoption rates globally"
- "Analyze renewable energy adoption trends and policy drivers across different countries"
- "Investigate the environmental impact of cryptocurrency mining and proposed solutions"
- "Study carbon capture technologies and their commercial viability"

### Business & Economics
- "Analyze the gig economy's impact on traditional employment models and worker protections"
- "Research the evolution of remote work policies post-pandemic and their effectiveness on productivity"
- "Investigate supply chain resilience strategies adopted after global disruptions"
- "Study the impact of digital transformation on traditional retail businesses"

### Social & Cultural Studies
- "Research the impact of social media algorithms on information consumption patterns and political polarization"
- "Analyze changing demographics in urban areas and their impact on city planning"
- "Investigate the effectiveness of different approaches to digital literacy education"
- "Study the cultural impact of streaming services on traditional media consumption"

### Science & Engineering
- "Research advances in materials science for semiconductor manufacturing"
- "Analyze the development of fusion energy technologies and timeline to commercialization"
- "Investigate innovations in water purification technologies for developing regions"
- "Study the engineering challenges and solutions for space exploration missions"

### Policy & Governance
- "Investigate recent developments in AI regulation across different countries and their potential impact"
- "Research privacy legislation trends and their effects on technology companies"
- "Analyze different approaches to cryptocurrency regulation globally"
- "Study the effectiveness of various climate policy mechanisms"

### Cybersecurity & Privacy
- "Investigate cybersecurity threats in IoT devices and enterprise mitigation strategies"
- "Research the evolution of ransomware attacks and defensive technologies"
- "Analyze privacy-preserving technologies and their adoption in consumer applications"
- "Study the security implications of quantum computing on current encryption methods"

### Education & Learning
- "Research the effectiveness of different online learning platforms and methodologies"
- "Analyze the impact of AI tools on academic research and education"
- "Investigate innovative approaches to STEM education in underserved communities"
- "Study the future of skills-based learning and certification programs"

## 🔍 Research Capabilities

- **Multi-Source Analysis**: Aggregates information from academic papers, industry reports, news sources, and expert opinions
- **Real-Time Data**: Accesses current information and recent developments
- **Cross-Verification**: Validates findings across multiple reliable sources
- **Trend Analysis**: Identifies patterns and forecasts future developments
- **Competitive Intelligence**: Comprehensive competitive landscape analysis
- **Technical Deep-Dives**: Detailed analysis of complex technical topics
- **Policy Impact Assessment**: Analysis of regulatory and policy implications
- **Market Dynamics**: Understanding of market forces and business implications

## Troubleshooting

1. **API Key Issues**: Ensure your Octagon API key is correctly set in the environment or config file.
2. **Connection Issues**: Make sure the connectivity to the Octagon API is working properly.
3. **Rate Limiting**: No rate limits apply to Deep Research MCP - execute unlimited queries.

## License

MIT 

---

⭐ Star this repo if you find it helpful for your research needs!
