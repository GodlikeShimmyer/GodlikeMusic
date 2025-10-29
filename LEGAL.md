# ⚖️ Legal Notice and Compliance

## Important Legal Information

This document outlines the legal considerations and compliance requirements for using GodlikeMusic.

## Original Implementation

**GodlikeMusic is an original implementation** created from scratch. It does NOT:
- Use any Spotify source code or proprietary assets
- Copy Spotify's internal APIs or methods
- Infringe on Spotify's intellectual property rights
- Redistribute any Spotify copyrighted materials

## Third-Party Services

### YouTube Data API v3

This application uses the **YouTube Data API v3** and is subject to:

1. **YouTube Terms of Service**
   - https://www.youtube.com/t/terms
   - You must comply with all YouTube ToS requirements
   - Respect copyright and intellectual property rights
   - Do not attempt to download or redistribute copyrighted content

2. **Google API Services User Data Policy**
   - https://developers.google.com/terms/api-services-user-data-policy
   - Handle user data responsibly and transparently
   - Only request necessary permissions
   - Protect user privacy

3. **YouTube API Services Terms of Service**
   - https://developers.google.com/youtube/terms/api-services-terms-of-service
   - Comply with quota limits and usage restrictions
   - Do not circumvent technical limitations
   - Properly attribute content to YouTube

## Usage Restrictions

### Prohibited Activities

You **MUST NOT**:
- Use this application to violate any laws or regulations
- Bypass, circumvent, or attempt to bypass YouTube's rate limits or quotas
- Download, copy, or redistribute copyrighted content without permission
- Use the application for commercial purposes without proper licensing
- Remove or obscure copyright notices or attributions
- Attempt to reverse engineer YouTube's APIs or services
- Use the application in ways that violate YouTube's Community Guidelines

### Allowed Activities

You **MAY**:
- Use this application for personal, non-commercial purposes
- Stream music through YouTube's embedded player
- Create and manage personal playlists
- Search for publicly available content on YouTube
- Share links to YouTube content
- Fork and modify the code for personal or educational use

## API Quotas and Limits

### YouTube Data API Quotas

- Default quota: **10,000 units per day**
- Each search operation costs approximately **100 units**
- Video details requests cost approximately **1 unit** per video
- You are responsible for monitoring your quota usage
- Request quota increases through Google Cloud Console if needed

### Rate Limiting

- The application implements caching to reduce API calls
- Respect all rate limits imposed by YouTube
- Do not attempt to circumvent rate limiting mechanisms

## Content Rights

### User-Generated Content

- All content accessed through this application originates from YouTube
- Users are subject to YouTube's copyright policies
- Content creators retain all rights to their work
- This application does not host, store, or redistribute content

### Intellectual Property

- YouTube and the YouTube logo are trademarks of Google LLC
- This application is not affiliated with, endorsed by, or sponsored by YouTube or Google
- All trademarks belong to their respective owners

## Privacy and Data Protection

### User Data

This application:
- Stores user preferences locally in the browser (localStorage)
- Does not collect or transmit personal information to external servers
- Does not track users across websites
- Does not share data with third parties
- Uses YouTube's embedded player, which is subject to YouTube's privacy policy

### GDPR Compliance

If deploying in the EU:
- Inform users about data collection and processing
- Obtain consent where required
- Provide mechanisms for data access, correction, and deletion
- Implement appropriate security measures

## Disclaimer of Warranties

THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.

### No Liability

IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Responsible Use

### User Responsibilities

As a user or operator of this application, you are responsible for:
- Obtaining necessary API keys legally
- Monitoring and managing API quota usage
- Complying with all applicable laws and regulations
- Respecting copyright and intellectual property rights
- Following YouTube's Terms of Service
- Handling any user data in compliance with privacy laws

### Developer Responsibilities

As a developer modifying this application, you must:
- Never hardcode API keys in source code
- Use environment variables for sensitive configuration
- Implement proper error handling
- Respect API rate limits
- Add appropriate logging and monitoring
- Document any changes that affect legal compliance

## Copyright Attribution

When displaying content from YouTube:
- Always attribute content to the original creator
- Display the creator's name (channel title)
- Provide links back to YouTube where appropriate
- Do not remove or obscure YouTube's branding from embedded players

## Geographic Restrictions

- Some content may be restricted based on geographic location
- Respect geo-blocking and regional restrictions
- Do not attempt to circumvent geographic limitations
- Be aware that API availability may vary by region

## Changes to Terms

- YouTube's Terms of Service may change at any time
- Google's API Terms may be updated periodically
- You are responsible for staying informed of changes
- Review terms regularly to ensure continued compliance

## Reporting Violations

If you discover:
- Copyright infringement
- Terms of Service violations
- Security vulnerabilities
- Privacy concerns

Please report them through:
- YouTube's reporting mechanisms for content issues
- GitHub issues for code/security concerns
- Appropriate legal channels for serious violations

## Educational Use

This project is suitable for:
- Learning web development with Next.js
- Understanding API integration patterns
- Educational demonstrations
- Personal skill development

This project is NOT intended for:
- Commercial music streaming services
- Competing with legitimate music platforms
- Copyright infringement
- Terms of Service violations

## License and Attribution

### Code License

The source code of GodlikeMusic is provided for educational and personal use.

### Third-Party Licenses

This project uses open-source libraries with their own licenses:
- Next.js - MIT License
- React - MIT License
- Tailwind CSS - MIT License
- Zustand - MIT License
- And other dependencies (see package.json)

Always review and comply with third-party licenses.

## Contact and Support

For legal questions or concerns:
- Review YouTube's official documentation
- Consult with legal counsel for commercial use
- Contact appropriate authorities for serious issues

## Acknowledgments

- **YouTube** for providing the YouTube Data API
- **Google** for cloud services and APIs
- **Vercel** for hosting and deployment platform
- All open-source contributors whose libraries make this project possible

## Final Notice

**BY USING THIS APPLICATION, YOU AGREE TO:**
1. Comply with YouTube's Terms of Service
2. Respect copyright and intellectual property rights
3. Use the application responsibly and legally
4. Not engage in any prohibited activities listed above
5. Monitor and manage your API usage within quotas
6. Take responsibility for your use of the application

**IF YOU DO NOT AGREE TO THESE TERMS, DO NOT USE THIS APPLICATION.**

---

Last Updated: October 29, 2024

This document should be reviewed regularly and updated as terms of service and legal requirements change.

**Remember: With great power comes great responsibility. Use this application ethically and legally!** 🛡️
